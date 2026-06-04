/* eslint-env node */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, "..");

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf-8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadDotEnv(resolve(root, ".env.local"));
loadDotEnv(resolve(root, ".env"));

const REGION = process.env.VITE_AWS_REGION || "us-east-1";
const ACCESS_KEY = process.env.VITE_AWS_ACCESS_KEY_ID || "";
const SECRET_KEY = process.env.VITE_AWS_SECRET_ACCESS_KEY || "";
const SESSION_TOKEN = process.env.VITE_AWS_SESSION_TOKEN || undefined;
const BUCKET = process.env.VITE_S3_BUCKET || "pagina-mama";

const NAME = "house-of-wellness-brickell";
const PREFIX = `assets2/desarrollos/${NAME}`;
const GALLERY_PREFIX = `${PREFIX}/image-gallery`;
const PDF_PREFIX = `${PREFIX}/pdfs`;

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("Missing VITE_AWS_ACCESS_KEY_ID/VITE_AWS_SECRET_ACCESS_KEY.");
  process.exit(1);
}

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    ...(SESSION_TOKEN ? { sessionToken: SESSION_TOKEN } : {}),
  },
});

const WEBSITE_BASE = "https://houseofwellnessbrickell.com";

const BANNER_FILE = "HoW_Exterior_PoolView_Sunset.jpg";

const GALLERY_FILES = [
  "img-1.jpg",
  "s1.jpg",
  "s2.jpg",
  "s3.jpg",
  "s4.jpg",
  "s5.jpg",
  "sl1.jpg",
  "sl2.jpg",
  "sl3.jpg",
  "sl4.jpg",
  "sl5.jpg",
  "sl6.jpg",
  "sl7.jpg",
  "sl21.jpg",
  "sl22.jpg",
  "sl23.jpg",
  "sl24.jpg",
  "loc-1.jpg",
];

const PDF_CANDIDATES = {
  brochure: [
    `${WEBSITE_BASE}/pdf/brochure.pdf`,
    `${WEBSITE_BASE}/brochure.pdf`,
  ],
  hoja: [
    `${WEBSITE_BASE}/pdf/hoja.pdf`,
    `${WEBSITE_BASE}/hoja.pdf`,
    `${WEBSITE_BASE}/pdf/factsheet.pdf`,
  ],
  planos: [
    `${WEBSITE_BASE}/pdf/planos.pdf`,
    `${WEBSITE_BASE}/pdf/floorplans.pdf`,
    `${WEBSITE_BASE}/planos.pdf`,
  ],
};

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ScattoliniGroup/1.0 (media sync)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function upload(buffer, key, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
}

async function tryPdf(urls) {
  for (const url of urls) {
    try {
      const buf = await fetchBuffer(url);
      return { url, buf };
    } catch {
      // continue
    }
  }
  return null;
}

async function main() {
  const uploaded = [];
  const skipped = [];

  console.log(`Uploading ${NAME} media to s3://${BUCKET}/${PREFIX}`);

  // Banner
  const bannerUrl = `${WEBSITE_BASE}/img/${BANNER_FILE}`;
  const bannerBuf = await fetchBuffer(bannerUrl);
  await upload(bannerBuf, `${PREFIX}/banner.jpg`, "image/jpeg");
  uploaded.push(`${PREFIX}/banner.jpg`);

  // Gallery
  let index = 1;
  for (const file of GALLERY_FILES) {
    const url = `${WEBSITE_BASE}/img/${file}`;
    try {
      const buf = await fetchBuffer(url);
      const key = `${GALLERY_PREFIX}/image (${index}).jpg`;
      await upload(buf, key, "image/jpeg");
      uploaded.push(key);
      index += 1;
    } catch {
      skipped.push(`Missing image: ${url}`);
    }
  }

  // PDFs
  for (const [name, urls] of Object.entries(PDF_CANDIDATES)) {
    const found = await tryPdf(urls);
    if (!found) {
      skipped.push(`Missing PDF (${name}): ${urls.join(" | ")}`);
      continue;
    }
    const key = `${PDF_PREFIX}/${name}.pdf`;
    await upload(found.buf, key, "application/pdf");
    uploaded.push(key);
  }

  // Blackline source placeholder: pass BLACKLINE_BASE_URL to discover downloadable media when a usable URL is provided.

  console.log("\nUploaded keys:");
  for (const key of uploaded) console.log(` - ${key}`);

  if (skipped.length) {
    console.log("\nSkipped:");
    for (const s of skipped) console.log(` - ${s}`);
  }

  console.log(`\nGallery images uploaded: ${uploaded.filter((k) => k.includes("/image-gallery/")).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


