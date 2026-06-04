/**
 * fetch-alba-gallery-clean.mjs
 * Fetches only the real gallery photos from albapalmbeach.com (jpg/jpeg only,
 * min 50 KB) and uploads them cleanly to S3, replacing all placeholders.
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadDotEnv(p) {
    if (!existsSync(p)) return;
    for (const line of readFileSync(p, "utf-8").split("\n")) {
        const t = line.trim();
        if (!t || t.startsWith("#")) continue;
        const eq = t.indexOf("=");
        if (eq === -1) continue;
        const key = t.slice(0, eq).trim();
        const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
    }
}
loadDotEnv(resolve(root, ".env.local"));
loadDotEnv(resolve(root, ".env"));

const BUCKET = process.env.VITE_S3_BUCKET || "pagina-mama";
const s3 = new S3Client({
    region: process.env.VITE_AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FETCH_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Referer": "https://www.albapalmbeach.com/",
};

async function fetchGalleryImages() {
    console.log("🌐  Fetching https://www.albapalmbeach.com/gallery …");
    const res = await fetch("https://www.albapalmbeach.com/gallery", { headers: FETCH_HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const found = new Set();

    // Match all WordPress upload URLs — jpg/jpeg only (these are real photos, not logos)
    for (const m of html.matchAll(/https?:\/\/www\.albapalmbeach\.com\/wp-content\/uploads\/[^\s"'<>]+\.jpe?g/gi)) {
        const url = m[0];
        // Exclude thumbnails (URLs with dimension suffixes like -300x200.jpg)
        if (!url.match(/-\d+x\d+\.jpe?g$/i)) {
            found.add(url);
        }
    }

    return [...found];
}

async function downloadImage(url) {
    const res = await fetch(url, {
        headers: { ...FETCH_HEADERS, "Accept": "image/jpeg,image/*,*/*" },
        redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // Gallery photos should be at least 50 KB
    if (buf.length < 50000) throw new Error(`Too small (${buf.length} bytes)`);
    return buf;
}

async function uploadToS3(buf, key, contentType = "image/jpeg") {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: contentType }));
}

async function deleteOldGallery() {
    console.log("🗑️   Clearing old gallery images from S3…");
    const PREFIX = "assets2/desarrollos/alba-palm-beach/image-gallery/";
    const listed = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PREFIX }));
    for (const obj of listed.Contents || []) {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: obj.Key }));
        console.log(`    Deleted: ${obj.Key.replace(PREFIX, "")}`);
    }
}

async function main() {
    console.log(`\n🖼️   Alba Palm Beach — Gallery Photo Replacement`);
    console.log(`    Bucket: ${BUCKET}\n`);

    // 1. Fetch gallery page and extract only real JPEG photos
    const imageUrls = await fetchGalleryImages();
    console.log(`\n📋  Found ${imageUrls.length} gallery photo(s):`);
    imageUrls.forEach((u, i) => console.log(`    ${i + 1}. ${u.split("/").pop()}`));

    if (imageUrls.length === 0) {
        console.log("\n❌  No gallery images found on the website.");
        process.exit(1);
    }

    // 2. Clear old placeholder gallery images
    await deleteOldGallery();

    // 3. Download and upload each real photo
    console.log("\n⬆️   Uploading real Alba Palm Beach photos to S3…\n");
    const succeeded = [];

    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const filename = url.split("/").pop();
        const galleryKey = `assets2/desarrollos/alba-palm-beach/image-gallery/image (${i + 1}).jpg`;

        process.stdout.write(`    [${String(i + 1).padStart(2)}] ${filename.padEnd(48)} `);
        try {
            await sleep(200);
            const buf = await downloadImage(url);
            await uploadToS3(buf, galleryKey);
            console.log(`✅  ${Math.round(buf.length / 1024)} KB`);
            succeeded.push({ i, url, buf, key: galleryKey });
        } catch (e) {
            console.log(`❌  ${e.message}`);
        }
    }

    // 4. Set banner to the best aerial/exterior shot
    // Prefer files with "aerial", "CAM", "FINAL" in name; fall back to first
    const bannerPick =
        succeeded.find(s => /aerial|exterior|arrival|facade/i.test(s.url)) ||
        succeeded.find(s => /CAM_08|CAM_16|Mask-Group-7/i.test(s.url)) ||
        succeeded[0];

    if (bannerPick) {
        await uploadToS3(bannerPick.buf, "assets2/desarrollos/alba-palm-beach/banner.jpg");
        console.log(`\n    Banner: ${bannerPick.url.split("/").pop()} → banner.jpg ✅`);

        // Also update the area thumbnail
        await uploadToS3(bannerPick.buf, "assets2/areas/west-palm-beach/alba-palm-beach.webp", "image/webp");
        console.log(`    Thumbnail: → areas/west-palm-beach/alba-palm-beach.webp ✅`);
    }

    // 5. Update AlbaPalmBeach.tsx numberOfImages
    const count = succeeded.length;
    const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
    let src = readFileSync(tsPath, "utf-8");
    src = src.replace(/project\.numberOfImages\s*=\s*\d+;/, `project.numberOfImages = ${count};`);
    writeFileSync(tsPath, src, "utf-8");
    console.log(`\n📝  AlbaPalmBeach.tsx numberOfImages → ${count}`);

    console.log(`\n🎉  Done! ${count}/${imageUrls.length} real photos uploaded.`);
    console.log(`    🌐  http://localhost:5173/desarrollos/alba-palm-beach\n`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });

