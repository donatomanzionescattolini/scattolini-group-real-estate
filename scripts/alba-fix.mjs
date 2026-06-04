/**
 * alba-fix.mjs — Remove bad PDF uploads, find real YouTube video ID,
 * and check if digital brochure page has an embedded PDF viewer.
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function loadDotEnv(p) {
    if (!existsSync(p)) return;
    for (const line of readFileSync(p, "utf-8").split("\n")) {
        const t = line.trim(); if (!t || t.startsWith("#")) continue;
        const eq = t.indexOf("="); if (eq === -1) continue;
        const k = t.slice(0, eq).trim(), v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[k]) process.env[k] = v;
    }
}
loadDotEnv(resolve(root, ".env.local"));
const BUCKET = process.env.VITE_S3_BUCKET || "pagina-mama";
const s3 = new S3Client({ region: process.env.VITE_AWS_REGION || "us-east-1", credentials: { accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY } });
const H = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36" };
const get = async (url, timeout = 10000) => { try { const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(timeout) }); return r.ok ? { text: await r.text(), ct: r.headers.get("content-type") || "" } : null; } catch { return null; } };

async function main() {
    console.log("\n🔧  Alba Palm Beach — fix bad uploads & find real video\n");

    // ── 1. Delete incorrectly uploaded HTML-as-PDF files ───────────────────────
    console.log("🗑️   Removing bad PDF uploads (they were HTML pages, not PDFs)…");
    for (const name of ["brochure.pdf", "hoja.pdf"]) {
        try {
            await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: `assets2/desarrollos/alba-palm-beach/pdfs/${name}` }));
            console.log(`    ✅  Deleted: ${name}`);
        } catch { console.log(`    ⚠️  Could not delete ${name}`); }
    }

    // ── 2. Check view-digital-brochure page for embedded PDF URL ──────────────
    console.log("\n📄  Scanning /view-digital-brochure for embedded PDF…");
    const brochurePage = await get("https://www.albapalmbeach.com/view-digital-brochure");
    if (brochurePage) {
        const { text } = brochurePage;
        // Look for PDF iframes, embed src, or flipbook/issuu embed URLs
        const pdfLinks = [...text.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)].map(m => m[0]);
        const issuuLinks = [...text.matchAll(/issuu\.com\/[^\s"'<>]+/gi)].map(m => "https://" + m[0]);
        const flipLinks = [...text.matchAll(/(?:fliphtml5|heyzine|online\.fliphtml5)\.com\/[^\s"'<>]+/gi)].map(m => "https://" + m[0]);
        const iframeSrcs = [...text.matchAll(/iframe[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);

        console.log("    PDF links:", pdfLinks.length ? pdfLinks : "(none)");
        console.log("    Issuu:", issuuLinks.length ? issuuLinks : "(none)");
        console.log("    Flip:", flipLinks.length ? flipLinks : "(none)");
        console.log("    iframes:", iframeSrcs.slice(0, 5));

        // Upload any real PDF found
        for (const url of pdfLinks) {
            try {
                const r = await fetch(url, { headers: H });
                const ct = r.headers.get("content-type") || "";
                if (ct.includes("pdf") && r.ok) {
                    const buf = Buffer.from(await r.arrayBuffer());
                    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: "assets2/desarrollos/alba-palm-beach/pdfs/brochure.pdf", Body: buf, ContentType: "application/pdf" }));
                    console.log(`    ✅  Uploaded real brochure.pdf (${Math.round(buf.length / 1024)} KB)`);
                }
            } catch { }
        }
    }

    // ── 3. Also check /downloads page ─────────────────────────────────────────
    console.log("\n📄  Scanning /downloads for embedded PDF/video…");
    const dlPage = await get("https://www.albapalmbeach.com/downloads");
    if (dlPage) {
        const { text } = dlPage;
        const pdfLinks = [...text.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)].map(m => m[0]);
        const iframeSrcs = [...text.matchAll(/iframe[^>]*src=["']([^"']+)["']/gi)].map(m => m[1]);
        const ytEmbeds = [...text.matchAll(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        console.log("    PDF links:", pdfLinks.length ? pdfLinks : "(none)");
        console.log("    iframes:", iframeSrcs.slice(0, 5));
        console.log("    YouTube embeds:", ytEmbeds.length ? ytEmbeds : "(none)");
    }

    // ── 4. Find REAL YouTube video ID from channel ──────────────────────────────
    console.log("\n🎬  Finding real YouTube video from Alba channel…");
    const channelRes = await get("https://www.youtube.com/channel/UCOYZ_MT8mZRWLc-9oSpjNvQ/videos");

    let realVideoId = null;
    if (channelRes) {
        const { text } = channelRes;
        // The real channel videos are in gridVideoRenderer or richItemRenderer inside ytInitialData
        // Look for the ytInitialData JSON blob
        const dataMatch = text.match(/var ytInitialData = ({.+?});<\/script>/s) ||
                          text.match(/ytInitialData = ({.+?});\s*<\/script>/s);

        if (dataMatch) {
            const blob = dataMatch[1];
            // Look for richItemRenderer videoId entries (these are actual channel videos)
            const richIds = [...blob.matchAll(/"richItemRenderer"[^}]*?"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
            const gridIds = [...blob.matchAll(/"gridVideoRenderer"[^}]*?"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
            const videoIds = [...new Set([...richIds, ...gridIds])];

            if (videoIds.length) {
                console.log(`    Real channel videos: ${videoIds.join(", ")}`);
                realVideoId = videoIds[0];
            } else {
                // Fallback: look for videoIds near "thumbnails" (channel video thumbnails)
                const allIds = [...blob.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
                // Filter out YouTube system/UI video IDs (they tend to appear in pairs close together)
                const countById = {};
                allIds.forEach(id => countById[id] = (countById[id] || 0) + 1);
                // Channel videos typically appear once; UI videos appear multiple times
                const uniqueIds = allIds.filter((id, idx, arr) => arr.indexOf(id) === idx && countById[id] === 1);
                console.log(`    All unique once-appearing IDs: ${uniqueIds.slice(0, 10).join(", ")}`);
                if (uniqueIds.length) realVideoId = uniqueIds[0];
            }
        } else {
            // No ytInitialData blob — just extract all unique videoIds
            const allIds = [...new Set([...text.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]))];
            console.log(`    All videoIds on page: ${allIds.join(", ")}`);
            // Filter known YouTube UI video IDs
            const skipIds = new Set(["Mwp3xMNUo3A", "galL1VWZLGI", "59SyCbzf5wU", "H0X-NIYfYjw", "hfZU0IUpAh4", "cihxD8aBFNg"]);
            const channelIds = allIds.filter(id => !skipIds.has(id));
            if (channelIds.length) { realVideoId = channelIds[0]; console.log(`    → Using: ${realVideoId}`); }
        }

        // Also extract video titles
        const titles = [...text.matchAll(/"title":\{"runs":\[\{"text":"([^"]{10,150})"\}/g)].slice(0, 5).map(m => m[1]);
        if (titles.length) console.log(`    Video titles found: ${titles.join(" | ")}`);
    }

    // ── 5. Try direct video page URLs ──────────────────────────────────────────
    const videoPagesRes = await get("https://www.albapalmbeach.com/");
    if (videoPagesRes && !realVideoId) {
        const ytMatch = videoPagesRes.text.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (ytMatch) { realVideoId = ytMatch[1]; console.log(`    Found in homepage: ${realVideoId}`); }
    }

    // ── 6. Patch AlbaPalmBeach.tsx if we found a real ID ──────────────────────
    const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
    let src = readFileSync(tsPath, "utf-8");

    if (realVideoId) {
        console.log(`\n    Using YouTube ID: ${realVideoId}`);
        // Replace any existing video (in case wrong one was set)
        if (src.includes("iframe")) {
            src = src.replace(
                /project\.video = \([\s\S]*?\);\n/,
                [
                    `project.video = (`,
                    `    <iframe`,
                    `        width="100%"`,
                    `        height="500px"`,
                    `        src="https://www.youtube.com/embed/${realVideoId}?controls=1&rel=0"`,
                    `        title="Alba Palm Beach"`,
                    `        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`,
                    `        allowFullScreen`,
                    `        style={{border: "none", display: "block"}}`,
                    `    />`,
                    `);`,
                    ``,
                ].join("\n")
            );
        } else {
            src = src.replace(
                "export default project;",
                [
                    `project.video = (`,
                    `    <iframe`,
                    `        width="100%"`,
                    `        height="500px"`,
                    `        src="https://www.youtube.com/embed/${realVideoId}?controls=1&rel=0"`,
                    `        title="Alba Palm Beach"`,
                    `        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`,
                    `        allowFullScreen`,
                    `        style={{border: "none", display: "block"}}`,
                    `    />`,
                    `);`,
                    `export default project;`,
                ].join("\n")
            );
        }
        writeFileSync(tsPath, src, "utf-8");
        console.log(`    ✅  AlbaPalmBeach.tsx updated`);
    } else {
        console.log(`\n    ⚠️  Could not find a confirmed real YouTube video ID.`);
        console.log(`    Visit https://www.youtube.com/channel/UCOYZ_MT8mZRWLc-9oSpjNvQ/videos`);
        console.log(`    and add the video ID manually to project.video in AlbaPalmBeach.tsx`);
    }

    console.log("\n📋  Summary:");
    console.log("    ✅  Thumbnail: assets2/areas/west-palm-beach/alba-palm-beach.webp (CAM_08 aerial)");
    console.log("    ⚠️  PDFs: behind registration form — upload manually via /editor");
    console.log("    🎬  Video: check AlbaPalmBeach.tsx for iframe");
    console.log("\n🎉  Done!\n");
}

main().catch(console.error);

