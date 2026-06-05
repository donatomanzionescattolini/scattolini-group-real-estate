/**
 * upscale-s3-images.mjs
 *
 * AI super-resolution for the property / area / agent photos that live in the
 * `pagina-mama` S3 bucket. It lists existing images, sends each one to an AI
 * upscaler (Replicate – Real-ESRGAN), and (optionally) writes the higher-res
 * result back to S3. Originals are backed up before anything is overwritten.
 *
 * Why this exists: the photos are flat files on S3, so they can't be "upscaled"
 * by changing a URL the way a CDN-resized image (e.g. Unsplash) can. They have
 * to be re-rendered through a model and re-uploaded — which is what this does.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * SETUP — create `.env.local` in the project root with:
 *     VITE_AWS_REGION=us-east-1
 *     VITE_AWS_ACCESS_KEY_ID=AKIA...
 *     VITE_AWS_SECRET_ACCESS_KEY=...
 *     VITE_S3_BUCKET=pagina-mama
 *     REPLICATE_API_TOKEN=r8_...        # https://replicate.com/account/api-tokens
 *
 * USAGE
 *   # 1) Preview what would be processed (no writes) — safe default:
 *   node scripts/upscale-s3-images.mjs --prefix assets2/areas/ --limit 5
 *
 *   # 2) Actually upscale 4x and overwrite in place (originals backed up to
 *   #    assets2/_originals/<key>):
 *   node scripts/upscale-s3-images.mjs --prefix assets2/areas/ --apply --overwrite --scale 4
 *
 *   # 3) Write results to NEW keys (…-up.<ext>) instead of overwriting:
 *   node scripts/upscale-s3-images.mjs --prefix assets2/desarrollos/ --apply --suffix -up
 *
 * FLAGS
 *   --prefix <p>     S3 key prefix to process (repeatable). Defaults below.
 *   --scale <2|4>    Upscale factor (default 4).
 *   --limit <n>      Process at most n images (handy for a trial run).
 *   --apply          Perform writes. Without it, the script only previews.
 *   --overwrite      Overwrite the original key (original copied to _originals/).
 *   --suffix <s>     Write to a new key with this suffix before the extension.
 *   --face           Enable face-enhancement (good for the agent portraits).
 *
 * Node.js 18+ required (native fetch). Needs @aws-sdk/client-s3 (already used by
 * the other scripts in this folder).
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';

// ─── Load .env.local / .env ───────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadDotEnv(resolve(root, '.env.local'));
loadDotEnv(resolve(root, '.env'));

// ─── Args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function flag(name) {
  return argv.includes(`--${name}`);
}
function opts(name) {
  const out = [];
  argv.forEach((a, i) => {
    if (a === `--${name}` && argv[i + 1] && !argv[i + 1].startsWith('--')) out.push(argv[i + 1]);
  });
  return out;
}
function opt(name, fallback) {
  const v = opts(name);
  return v.length ? v[v.length - 1] : fallback;
}

const PREFIXES = opts('prefix').length
  ? opts('prefix')
  : ['assets2/desarrollos/', 'assets2/areas/', 'assets2/asociados/', 'assets2/elda/'];
const SCALE = Number(opt('scale', '4')) === 2 ? 2 : 4;
const LIMIT = Number(opt('limit', '0')) || Infinity;
const APPLY = flag('apply');
const OVERWRITE = flag('overwrite');
const SUFFIX = opt('suffix', '');
const FACE = flag('face');

// ─── Config ───────────────────────────────────────────────────────────────────
const REGION = process.env.VITE_AWS_REGION || 'us-east-1';
const ACCESS_KEY = process.env.VITE_AWS_ACCESS_KEY_ID || '';
const SECRET_KEY = process.env.VITE_AWS_SECRET_ACCESS_KEY || '';
const SESSION_TOKEN = process.env.VITE_AWS_SESSION_TOKEN || undefined;
const BUCKET = process.env.VITE_S3_BUCKET || 'pagina-mama';
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN || '';

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const CONTENT_TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

if (APPLY && (!ACCESS_KEY || !SECRET_KEY)) {
  console.error('❌  Missing AWS credentials. Set VITE_AWS_ACCESS_KEY_ID / VITE_AWS_SECRET_ACCESS_KEY in .env.local');
  process.exit(1);
}
if (APPLY && !REPLICATE_TOKEN) {
  console.error('❌  Missing REPLICATE_API_TOKEN. Get one at https://replicate.com/account/api-tokens');
  process.exit(1);
}
if (APPLY && !OVERWRITE && !SUFFIX) {
  console.error('❌  In --apply mode you must choose --overwrite or --suffix <s> to define where results go.');
  process.exit(1);
}

const s3 = new S3Client({
  region: REGION,
  credentials: ACCESS_KEY
    ? { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY, ...(SESSION_TOKEN ? { sessionToken: SESSION_TOKEN } : {}) }
    : undefined,
});

const publicUrl = (key) => `https://${BUCKET}.s3.amazonaws.com/${key.split('/').map(encodeURIComponent).join('/')}`;

// ─── S3 listing ───────────────────────────────────────────────────────────────
async function listKeys(prefix) {
  const keys = [];
  let token;
  do {
    const res = await s3.send(
      new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token }),
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key && IMAGE_RE.test(obj.Key) && !obj.Key.startsWith('assets2/_originals/')) keys.push(obj.Key);
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);
  return keys;
}

// ─── Replicate Real-ESRGAN ────────────────────────────────────────────────────
async function getModelVersion() {
  const res = await fetch('https://api.replicate.com/v1/models/nightmareai/real-esrgan', {
    headers: { Authorization: `Bearer ${REPLICATE_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Replicate model lookup failed: ${res.status}`);
  const data = await res.json();
  return data.latest_version.id;
}

async function upscale(version, imageUrl) {
  const create = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${REPLICATE_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ version, input: { image: imageUrl, scale: SCALE, face_enhance: FACE } }),
  });
  if (!create.ok) throw new Error(`Replicate create failed: ${create.status} ${await create.text()}`);
  let pred = await create.json();

  while (pred.status !== 'succeeded' && pred.status !== 'failed' && pred.status !== 'canceled') {
    await new Promise((r) => setTimeout(r, 2500));
    const poll = await fetch(`https://api.replicate.com/v1/predictions/${pred.id}`, {
      headers: { Authorization: `Bearer ${REPLICATE_TOKEN}` },
    });
    pred = await poll.json();
  }
  if (pred.status !== 'succeeded') throw new Error(`Upscale ${pred.status}: ${JSON.stringify(pred.error)}`);

  const outUrl = Array.isArray(pred.output) ? pred.output[0] : pred.output;
  const img = await fetch(outUrl);
  const buf = Buffer.from(await img.arrayBuffer());
  return { buf, contentType: img.headers.get('content-type') || 'image/png' };
}

function targetKey(key) {
  if (OVERWRITE) return key;
  return key.replace(/(\.[^.]+)$/, `${SUFFIX}$1`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Bucket: ${BUCKET}  |  scale: ${SCALE}x  |  mode: ${APPLY ? 'APPLY' : 'DRY-RUN (preview only)'}`);
  console.log(`Prefixes: ${PREFIXES.join(', ')}\n`);

  let all = [];
  for (const p of PREFIXES) all = all.concat(await listKeys(p));
  all = [...new Set(all)].slice(0, LIMIT);
  console.log(`Found ${all.length} image(s).\n`);

  if (!APPLY) {
    all.forEach((k) => console.log(`  would upscale ${SCALE}x → ${targetKey(k)}`));
    console.log('\nDry run complete. Re-run with --apply --overwrite (or --suffix -up) to write results.');
    return;
  }

  const version = await getModelVersion();
  let done = 0;
  for (const key of all) {
    try {
      process.stdout.write(`↑ ${key} … `);
      const { buf, contentType } = await upscale(version, publicUrl(key));

      if (OVERWRITE) {
        // Back up the original first.
        await s3.send(
          new CopyObjectCommand({
            Bucket: BUCKET,
            CopySource: `/${BUCKET}/${key}`,
            Key: `assets2/_originals/${key}`,
          }),
        );
      }
      const ext = key.split('.').pop().toLowerCase();
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: targetKey(key),
          Body: buf,
          ContentType: CONTENT_TYPES[ext] || contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      done += 1;
      console.log(`done (${(buf.length / 1024).toFixed(0) } KB)`);
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
    }
  }
  console.log(`\n✅  Upscaled ${done}/${all.length}. Originals saved under assets2/_originals/.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

