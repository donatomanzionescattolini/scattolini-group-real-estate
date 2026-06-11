// Generates app icons + splash screens from the Scattolini Group logo.
// - assets/  -> source images consumed by @capacitor/assets (native icons)
// - public/  -> PWA web icons referenced by the manifest
// Run via: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Official transparent brand logo (warm-brown mark, from the brand package).
const LOGO_PATH = 'public/brand/logo.png';
const NAVY = { r: 27, g: 52, b: 51, alpha: 1 };
const GOLD = { r: 165, g: 125, b: 49 };
const CREAM = { r: 237, g: 227, b: 215 };

mkdirSync('assets', { recursive: true });
mkdirSync('public', { recursive: true });

const logoBuf = readFileSync(LOGO_PATH);
const logo = await sharp(logoBuf).trim().ensureAlpha().png().toBuffer();

/** Repaint the logo silhouette in a solid color using its alpha as a mask. */
async function recolor(src, color) {
  const meta = await sharp(src).metadata();
  const alpha = await sharp(src).extractChannel(3).toColourspace('b-w').png().toBuffer();
  return sharp({ create: { width: meta.width, height: meta.height, channels: 3, background: color } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

/** Compose a logo centered on a solid background, sized to `scale` of the canvas. */
async function compose({ size, bg, logo: art, scale }) {
  const box = Math.round(size * scale);
  const resized = await sharp(art)
    .resize({ width: box, height: box, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer();
}

async function write(path, buf) {
  writeFileSync(path, buf);
  console.log(`wrote ${path} (${(buf.length / 1024).toFixed(1)} KB)`);
}

const goldLogo = await recolor(logo, GOLD);
const creamLogo = await recolor(logo, CREAM);

// ── Capacitor native sources (@capacitor/assets reads these) ──
await write('assets/icon.png', await compose({ size: 1024, bg: NAVY, logo: goldLogo, scale: 0.66 }));
await write('assets/splash.png', await compose({ size: 2732, bg: NAVY, logo: goldLogo, scale: 0.36 }));
await write('assets/splash-dark.png', await compose({ size: 2732, bg: NAVY, logo: goldLogo, scale: 0.36 }));

// ── PWA web icons (referenced by the manifest) ──
await write('public/pwa-192x192.png', await compose({ size: 192, bg: NAVY, logo: goldLogo, scale: 0.66 }));
await write('public/pwa-512x512.png', await compose({ size: 512, bg: NAVY, logo: goldLogo, scale: 0.66 }));
// Maskable: full navy bleed, logo inside the ~80% safe zone.
await write('public/pwa-maskable-512x512.png', await compose({ size: 512, bg: NAVY, logo: goldLogo, scale: 0.52 }));
await write('public/apple-touch-icon.png', await compose({ size: 180, bg: NAVY, logo: goldLogo, scale: 0.66 }));
await write('public/favicon-32x32.png', await compose({ size: 32, bg: NAVY, logo: creamLogo, scale: 0.78 }));

console.log('\nDone.');
