/**
 * fetch-alba-assets.mjs
 * Downloads from albapalmbeach.com:
 *   - A proper thumbnail → areas/west-palm-beach/alba-palm-beach.webp
 *   - PDFs              → desarrollos/alba-palm-beach/pdfs/brochure.pdf (etc.)
 *   - Video             → desarrollos/alba-palm-beach/video.mp4
 */
import { readFileSync, existsSync } from "fs";
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
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Referer": "https://www.albapalmbeach.com/",
};

async function fetchHtml(url) {
    const res = await fetch(url, { headers: { ...HEADERS, Accept: "text/html,*/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
}

async function downloadBinary(url) {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { buf: Buffer.from(await res.arrayBuffer()), contentType: res.headers.get("content-type") || "application/octet-stream" };
}

async function upload(buf, key, contentType) {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: contentType }));
    console.log(`    ✅  s3://${BUCKET}/${key}  (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
    console.log(`\n🏗️   Alba Palm Beach — thumbnail, PDFs & video upload`);
    console.log(`    Bucket: ${BUCKET}\n`);

    // ── Fetch multiple pages to find all assets ──────────────────────────────
    const pages = [
        "https://www.albapalmbeach.com/gallery",
        "https://www.albapalmbeach.com/",
        "https://www.albapalmbeach.com/downloads",
        "https://www.albapalmbeach.com/residences",
        "https://www.albapalmbeach.com/amenities",
    ];

    const allHtml = [];
    for (const url of pages) {
        try {
            console.log(`🌐  Fetching ${url} …`);
            allHtml.push(await fetchHtml(url));
            await sleep(500);
        } catch (e) {
            console.log(`    ⚠️  ${e.message}`);
        }
    }
    const combinedHtml = allHtml.join("\n");

    // ── 1. Thumbnail ─────────────────────────────────────────────────────────
    // Best candidates: high-quality exterior/aerial JPEG from the gallery
    const THUMBNAIL_CANDIDATES = [
        "https://www.albapalmbeach.com/wp-content/uploads/CAM_08_aerial_sunset_FINAL_02.jpeg",
        "https://www.albapalmbeach.com/wp-content/uploads/ALBA_19TH_Terrace_FINAL.jpg",
        "https://www.albapalmbeach.com/wp-content/uploads/CAM_16_East_Pool_Deck_FINAL_03.jpg",
        "https://www.albapalmbeach.com/wp-content/uploads/Alba_Arrival_FINAL.jpeg",
    ];

    console.log("\n🖼️   Uploading thumbnail (areas/west-palm-beach/alba-palm-beach.webp)…");
    for (const url of THUMBNAIL_CANDIDATES) {
        try {
            const { buf } = await downloadBinary(url);
            if (buf.length < 50000) continue;
            await upload(buf, "assets2/areas/west-palm-beach/alba-palm-beach.webp", "image/webp");
            console.log(`    Source: ${url.split("/").pop()}`);
            break;
        } catch (e) {
            console.log(`    ⚠️  ${url.split("/").pop()}: ${e.message}`);
        }
    }

    // ── 2. PDFs ──────────────────────────────────────────────────────────────
    console.log("\n📄  Searching for PDFs…");

    // Extract PDF URLs from all pages
    const pdfUrls = new Set();
    for (const m of combinedHtml.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)) {
        pdfUrls.add(m[0]);
    }
    // Also check /downloads specifically
    for (const m of combinedHtml.matchAll(/href=["'](\/[^"']*\.pdf)/gi)) {
        pdfUrls.add("https://www.albapalmbeach.com" + m[1]);
    }

    console.log(`    Found ${pdfUrls.size} PDF link(s):`);
    [...pdfUrls].forEach(u => console.log(`    → ${u}`));

    // Map PDFs to their S3 target names
    const PDF_KEY_MAP = [
        { pattern: /brochure|folleto|general/i,  s3Name: "brochure.pdf" },
        { pattern: /floor|plano|plan/i,           s3Name: "planos.pdf"   },
        { pattern: /fact.?sheet|hoja|specs?/i,    s3Name: "hoja.pdf"     },
    ];

    const uploadedPdfs = new Set();
    for (const url of pdfUrls) {
        const filename = url.split("/").pop().toLowerCase();
        let s3Name = null;
        for (const { pattern, s3Name: name } of PDF_KEY_MAP) {
            if (pattern.test(filename) && !uploadedPdfs.has(name)) {
                s3Name = name;
                break;
            }
        }
        // If no pattern matched, use first unmapped slot
        if (!s3Name) {
            for (const { s3Name: name } of PDF_KEY_MAP) {
                if (!uploadedPdfs.has(name)) { s3Name = name; break; }
            }
        }
        if (!s3Name) break;

        try {
            await sleep(300);
            const { buf } = await downloadBinary(url);
            await upload(buf, `assets2/desarrollos/alba-palm-beach/pdfs/${s3Name}`, "application/pdf");
            uploadedPdfs.add(s3Name);
        } catch (e) {
            console.log(`    ❌  ${url.split("/").pop()}: ${e.message}`);
        }
    }

    if (uploadedPdfs.size === 0) console.log("    ⚠️  No PDFs found on the pages checked.");

    // ── 3. Video ─────────────────────────────────────────────────────────────
    console.log("\n🎥  Searching for video…");

    const videoUrls = new Set();
    // Look for mp4/webm in HTML
    for (const m of combinedHtml.matchAll(/https?:\/\/[^\s"'<>]+\.mp4/gi)) videoUrls.add(m[0]);
    for (const m of combinedHtml.matchAll(/src=["'](\/[^"']*\.mp4)/gi)) videoUrls.add("https://www.albapalmbeach.com" + m[1]);
    // YouTube/Vimeo embeds
    const ytMatches = [...combinedHtml.matchAll(/(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/g)];
    const vimMatches = [...combinedHtml.matchAll(/vimeo\.com\/(?:video\/)?(\d{6,12})/g)];

    console.log(`    MP4 URLs found: ${videoUrls.size}`);
    [...videoUrls].forEach(u => console.log(`    → ${u}`));
    if (ytMatches.length) console.log(`    YouTube embeds: ${ytMatches.map(m => `https://youtu.be/${m[1]}`).join(", ")}`);
    if (vimMatches.length) console.log(`    Vimeo embeds: ${vimMatches.map(m => `https://vimeo.com/${m[1]}`).join(", ")}`);

    let videoUploaded = false;
    for (const url of videoUrls) {
        try {
            console.log(`    Downloading ${url.split("/").pop()} …`);
            await sleep(300);
            const { buf, contentType } = await downloadBinary(url);
            if (buf.length < 100000) { console.log(`    ⚠️  Too small, skipping`); continue; }
            await upload(buf, "assets2/desarrollos/alba-palm-beach/video.mp4", contentType.includes("video") ? contentType : "video/mp4");
            videoUploaded = true;
            break;
        } catch (e) {
            console.log(`    ❌  ${e.message}`);
        }
    }

    if (!videoUploaded) {
        if (ytMatches.length || vimMatches.length) {
            console.log("\n    ℹ️   Video is hosted on YouTube/Vimeo — cannot download directly.");
            console.log("    Add the embed URL to the project's `video` field in AlbaPalmBeach.tsx.");
            if (ytMatches.length) {
                const ytId = ytMatches[0][1];
                console.log(`\n    YouTube embed URL: https://www.youtube.com/embed/${ytId}`);
                console.log(`    → Add to AlbaPalmBeach.tsx: project.video = <iframe ...>`);
                // Auto-patch the tsx file with the YouTube iframe
                const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
                let src = readFileSync(tsPath, "utf-8");
                if (!src.includes("youtube") && !src.includes("iframe")) {
                    src = src.replace(
                        "export default project;",
                        `project.video = (\n    <iframe\n        width="100%"\n        height="100%"\n        src="https://www.youtube.com/embed/${ytId}?autoplay=0&controls=1&showinfo=0&rel=0"\n        title="Alba Palm Beach"\n        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n        allowFullScreen\n        style={{border: "none"}}\n    />\n);\nexport default project;`
                    );
                    const { writeFileSync } = await import("fs");
                    writeFileSync(tsPath, src, "utf-8");
                    console.log(`    ✅  YouTube iframe added to AlbaPalmBeach.tsx`);
                }
            }
            if (vimMatches.length) {
                const vimId = vimMatches[0][1];
                console.log(`\n    Vimeo embed URL: https://player.vimeo.com/video/${vimId}`);
            }
        } else {
            console.log("    ⚠️  No video found on the pages checked.");
        }
    }

    console.log("\n🎉  Done!\n");
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });

