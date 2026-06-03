/**
 * alba-sitemap-video.mjs
 * Uses XML sitemap + YouTube channel to find PDFs and videos instantly.
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
const get = async (url) => { try { const r = await fetch(url, { headers: H, signal: AbortSignal.timeout(10000) }); return r.ok ? r.text() : null; } catch { return null; } };

async function main() {
    console.log("\n🗺️   Alba Palm Beach — sitemap + YouTube discovery\n");

    // ── 1. Sitemap ─────────────────────────────────────────────────────────────
    console.log("📋  Fetching sitemap_index.xml…");
    const sitemapIndex = await get("https://www.albapalmbeach.com/sitemap_index.xml");
    const pdfUrls = new Set();

    if (sitemapIndex) {
        const sitemapUrls = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
        console.log(`    Found ${sitemapUrls.length} sitemap(s): ${sitemapUrls.join(", ")}`);

        for (const sm of sitemapUrls) {
            const xml = await get(sm);
            if (!xml) continue;
            const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
            console.log(`    ${sm.split("/").pop()}: ${locs.length} URLs`);
            // Print any that mention pdf, download, brochure, floor-plan
            locs.filter(u => /pdf|download|brochure|floor.?plan|fact.?sheet/i.test(u))
                .forEach(u => { console.log(`    → ${u}`); pdfUrls.add(u); });
        }
    } else {
        console.log("    ⚠️  Could not fetch sitemap");
    }

    // ── 2. YouTube channel for video ID ────────────────────────────────────────
    console.log("\n🎬  Checking YouTube channel (UCOYZ_MT8mZRWLc-9oSpjNvQ)…");
    const channelHtml = await get("https://www.youtube.com/channel/UCOYZ_MT8mZRWLc-9oSpjNvQ/videos");

    let youtubeId = null;
    if (channelHtml) {
        const ids = [...new Set([...channelHtml.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]))];
        console.log(`    Found ${ids.length} video ID(s) on channel: ${ids.slice(0, 5).join(", ")}`);
        if (ids.length) youtubeId = ids[0];

        // Also extract video titles for context
        const titleMatches = [...channelHtml.matchAll(/"title":\{"runs":\[{"text":"([^"]{3,100})"/g)].slice(0, 5);
        titleMatches.forEach(m => console.log(`    Video: "${m[1]}"`));
    } else {
        console.log("    Could not fetch channel page.");
        // Try alternate channel URL
        const altHtml = await get("https://www.youtube.com/@AlbaPalmBeach/videos");
        if (altHtml) {
            const ids = [...new Set([...altHtml.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]))];
            if (ids.length) { youtubeId = ids[0]; console.log(`    Found via @handle: ${ids[0]}`); }
        }
    }

    // ── 3. Also check homepage HTML for inline YouTube embeds ──────────────────
    if (!youtubeId) {
        const homeHtml = await get("https://www.albapalmbeach.com/") || "";
        const ytMatches = [...homeHtml.matchAll(/(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/g)];
        if (ytMatches.length) { youtubeId = ytMatches[0][1]; console.log(`    Found in homepage: ${youtubeId}`); }
    }

    // ── 4. Patch AlbaPalmBeach.tsx with YouTube video ───────────────────────────
    const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
    let tsSrc = readFileSync(tsPath, "utf-8");
    if (youtubeId && !tsSrc.includes("youtube") && !tsSrc.includes("iframe")) {
        tsSrc = tsSrc.replace(
            "export default project;",
            [
                `project.video = (`,
                `    <iframe`,
                `        width="100%"`,
                `        height="500px"`,
                `        src="https://www.youtube.com/embed/${youtubeId}?controls=1&rel=0"`,
                `        title="Alba Palm Beach"`,
                `        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`,
                `        allowFullScreen`,
                `        style={{border: "none", display: "block"}}`,
                `    />`,
                `);`,
                `export default project;`,
            ].join("\n")
        );
        writeFileSync(tsPath, tsSrc, "utf-8");
        console.log(`\n    ✅  YouTube ID "${youtubeId}" added to AlbaPalmBeach.tsx as iframe`);
        console.log(`        src: https://www.youtube.com/embed/${youtubeId}`);
    } else if (youtubeId) {
        console.log(`\n    ℹ️   Video already configured in AlbaPalmBeach.tsx`);
    } else {
        console.log(`\n    ⚠️  No YouTube ID found. Add video manually.`);
    }

    // ── 5. PDF download ─────────────────────────────────────────────────────────
    if (pdfUrls.size) {
        console.log(`\n⬆️   Uploading ${pdfUrls.size} PDF(s) to S3…`);
        const slots = ["brochure.pdf", "hoja.pdf", "planos.pdf"];
        let i = 0;
        for (const url of pdfUrls) {
            if (i >= slots.length) break;
            try {
                const r = await fetch(url, { headers: H });
                if (!r.ok) { console.log(`  ❌  ${url}: HTTP ${r.status}`); continue; }
                const buf = Buffer.from(await r.arrayBuffer());
                await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: `assets2/desarrollos/alba-palm-beach/pdfs/${slots[i]}`, Body: buf, ContentType: "application/pdf" }));
                console.log(`  ✅  ${slots[i]}  (${Math.round(buf.length / 1024)} KB)`);
                i++;
            } catch (e) { console.log(`  ❌  ${e.message}`); }
        }
    } else {
        console.log("\n⚠️   No PDFs found in sitemap.");
        console.log("    The brochure/floor plans are likely behind a contact form.");
        console.log("    Upload them manually via the Editor panel (/editor) once you have the files.");
    }

    console.log("\n🎉  Done!\n");
}

main().catch(console.error);

