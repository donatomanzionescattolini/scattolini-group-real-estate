/**
 * fetch-alba-gallery.mjs
 * Fetches https://www.albapalmbeach.com/gallery, extracts all gallery image
 * URLs, downloads them, and uploads to S3 replacing the placeholder images.
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Referer": "https://www.albapalmbeach.com/",
};

async function fetchGalleryImages() {
    console.log("🌐  Fetching https://www.albapalmbeach.com/gallery …");
    const res = await fetch("https://www.albapalmbeach.com/gallery", { headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching gallery page`);
    const html = await res.text();

    // Save raw HTML for debugging
    writeFileSync(resolve(root, "scripts", "_alba-gallery-debug.html"), html.slice(0, 50000));

    // Extract image URLs — look in src, data-src, data-lazy-src, srcset
    const patterns = [
        /data-src=["'](https?:\/\/[^"'\s,]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s,]*)?)/gi,
        /data-lazy-src=["'](https?:\/\/[^"'\s,]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s,]*)?)/gi,
        /src=["'](https?:\/\/[^"'\s,]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s,]*)?)/gi,
        /srcset=["']([^"']+)/gi,  // will extract first URL from srcset
        /"url":"(https?:\\\/\\\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
        /https?:\/\/[^\s"'<>]+albapalmbeach\.com[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi,
        /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)(?=[^\w])/gi,
    ];

    const found = new Set();
    for (const pat of patterns) {
        for (const m of html.matchAll(pat)) {
            // For srcset, grab only the first URL
            const raw = m[1] || m[0];
            const url = raw.split(/[\s,]/)[0].replace(/\\\/\\\//g, "//").replace(/\\\//g, "/");
            if (
                url.startsWith("http") &&
                /\.(jpg|jpeg|png|webp)/i.test(url) &&
                !url.includes("logo") &&
                !url.includes("icon") &&
                !url.includes("favicon") &&
                !url.includes("-e1") &&  // skip tiny edit variants
                !url.match(/\d+x\d+\./)  // skip thumbnails with dimension markers
            ) {
                found.add(url);
            }
        }
    }

    // Also look for WordPress attachment URLs (common pattern)
    const wpMatches = html.matchAll(/https?:\/\/www\.albapalmbeach\.com\/wp-content\/uploads\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi);
    for (const m of wpMatches) {
        found.add(m[0]);
    }

    return [...found];
}

async function downloadImage(url) {
    const res = await fetch(url, {
        headers: { ...HEADERS, "Accept": "image/webp,image/jpeg,image/*,*/*" },
        redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 10000) throw new Error(`Too small (${buf.length} bytes) — probably not a real image`);
    return buf;
}

async function uploadToS3(buf, key, contentType = "image/jpeg") {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: contentType }));
}

async function main() {
    console.log(`\n🖼️   Alba Palm Beach Gallery — S3 upload`);
    console.log(`    Bucket: ${BUCKET}\n`);

    // Step 1: fetch gallery page and extract URLs
    let imageUrls;
    try {
        imageUrls = await fetchGalleryImages();
    } catch (e) {
        console.error("❌  Failed to fetch gallery:", e.message);
        process.exit(1);
    }

    console.log(`\n📋  Found ${imageUrls.length} image URL(s):`);
    imageUrls.forEach((u, i) => console.log(`    ${i + 1}. ${u}`));

    if (imageUrls.length === 0) {
        console.log("\n⚠️   No images found. Check scripts/_alba-gallery-debug.html for the raw HTML.");
        process.exit(1);
    }

    // Step 2: download and upload each image
    console.log("\n⬆️   Downloading and uploading to S3…\n");

    const uploaded = [];
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const ext = url.match(/\.(jpg|jpeg|png|webp)/i)?.[1]?.toLowerCase() || "jpg";
        const isWebp = ext === "webp";
        const s3Key = `assets2/desarrollos/alba-palm-beach/image-gallery/image (${i + 1}).jpg`;
        const ct = "image/jpeg";

        process.stdout.write(`    [${i + 1}/${imageUrls.length}] image (${i + 1}).jpg  ← ${url.slice(0, 80)}…\n           `);
        try {
            await sleep(300);
            const buf = await downloadImage(url);
            await uploadToS3(buf, s3Key, ct);
            console.log(`✅  (${Math.round(buf.length / 1024)} KB)`);
            uploaded.push({ i, url, key: s3Key });

            // Use first image as banner too
            if (i === 0) {
                await uploadToS3(buf, "assets2/desarrollos/alba-palm-beach/banner.jpg", "image/jpeg");
                console.log(`           Also uploaded as banner.jpg ✅`);
            }
            // Use second image as area thumbnail (alba-palm-beach.webp)
            if (i === 1) {
                await uploadToS3(buf, "assets2/areas/west-palm-beach/alba-palm-beach.webp", "image/webp");
                console.log(`           Also uploaded as areas/west-palm-beach/alba-palm-beach.webp ✅`);
            }
        } catch (e) {
            console.log(`❌  ${e.message}`);
        }
    }

    // Update numberOfImages in AlbaPalmBeach.tsx to match actual gallery count
    const actualCount = uploaded.length;
    if (actualCount > 0) {
        const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
        let src = readFileSync(tsPath, "utf-8");
        src = src.replace(/project\.numberOfImages\s*=\s*\d+;/, `project.numberOfImages = ${actualCount};`);
        writeFileSync(tsPath, src, "utf-8");
        console.log(`\n📝  Updated AlbaPalmBeach.tsx: numberOfImages = ${actualCount}`);
    }

    console.log(`\n🎉  Done! Uploaded ${uploaded.length}/${imageUrls.length} images.`);
    console.log(`    https://${BUCKET}.s3.amazonaws.com/assets2/desarrollos/alba-palm-beach/banner.jpg`);
    console.log(`    https://${BUCKET}.s3.amazonaws.com/assets2/desarrollos/alba-palm-beach/image-gallery/image (1).jpg\n`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });

