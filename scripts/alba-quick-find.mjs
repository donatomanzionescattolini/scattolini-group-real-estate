/**
 * alba-quick-find.mjs — quick focused search for Alba PDF/video assets
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
        const k = t.slice(0, eq).trim();
        const v = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[k]) process.env[k] = v;
    }
}
loadDotEnv(resolve(root, ".env.local"));
const BUCKET = process.env.VITE_S3_BUCKET || "pagina-mama";
const s3 = new S3Client({
    region: process.env.VITE_AWS_REGION || "us-east-1",
    credentials: { accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY },
});

const H = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36", "Referer": "https://www.albapalmbeach.com/" };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url) {
    try { const r = await fetch(url, { headers: H }); return r.ok ? r.text() : null; } catch { return null; }
}
async function headOk(url) {
    try { const r = await fetch(url, { method: "HEAD", headers: H, signal: AbortSignal.timeout(5000) }); return r.ok; } catch { return false; }
}
async function download(url) {
    const r = await fetch(url, { headers: H, redirect: "follow" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return { buf: Buffer.from(await r.arrayBuffer()), ct: r.headers.get("content-type") || "application/octet-stream" };
}
async function upload(buf, key, ct) {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: ct }));
    console.log(`  ✅  → s3://${BUCKET}/${key}  (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
    console.log("\n🔍  Alba Palm Beach — quick asset discovery\n");

    // ── 1. WP REST API — check pages for PDF/video URLs ────────────────────
    console.log("📡  WP REST API pages scan…");
    const pages = await get("https://www.albapalmbeach.com/wp-json/wp/v2/pages?per_page=100");
    const media = await get("https://www.albapalmbeach.com/wp-json/wp/v2/media?per_page=100&media_type=application");
    const videoMedia = await get("https://www.albapalmbeach.com/wp-json/wp/v2/media?per_page=100&media_type=video");

    const pdfUrls = new Set();
    const mp4Urls = new Set();
    const ytIds = new Set();

    if (media) {
        try {
            JSON.parse(media).forEach(m => {
                if (m.source_url) pdfUrls.add(m.source_url);
                console.log(`  PDF media: ${m.source_url}`);
            });
        } catch { console.log("  Could not parse media"); }
    }
    if (videoMedia) {
        try {
            JSON.parse(videoMedia).forEach(m => {
                if (m.source_url) mp4Urls.add(m.source_url);
                console.log(`  Video media: ${m.source_url}`);
            });
        } catch { console.log("  Could not parse video media"); }
    }

    if (pages) {
        try {
            JSON.parse(pages).forEach(p => {
                const content = (p.content?.rendered || "") + JSON.stringify(p);
                for (const m of content.matchAll(/https?:\/\/[^\s"'<>\\]+\.pdf/gi)) pdfUrls.add(m[0].replace(/\\u002F/g, "/").replace(/\\/g, ""));
                for (const m of content.matchAll(/https?:\/\/[^\s"'<>\\]+\.mp4/gi)) mp4Urls.add(m[0]);
                for (const m of content.matchAll(/(?:youtu\.be\/|youtube\.com\/embed\/|v=)([a-zA-Z0-9_-]{11})/g)) ytIds.add(m[1]);
            });
        } catch { }
    }

    // ── 2. Fetch homepage and search inline JavaScript data ─────────────────
    console.log("\n📄  Searching homepage inline JS data…");
    const html = await get("https://www.albapalmbeach.com/") || "";
    for (const m of html.matchAll(/https?:\\?\/\\?\/[^\s"'<>\\]+\.pdf/gi)) pdfUrls.add(m[0].replace(/\\/g, "").replace("http:\\/\\/", "http://").replace("https:\\/\\/", "https://"));
    for (const m of html.matchAll(/https?:\\?\/\\?\/[^\s"'<>\\]+\.mp4/gi)) mp4Urls.add(m[0].replace(/\\/g, ""));
    for (const m of html.matchAll(/(?:youtu(?:\.be|be\.com))\\?\/(?:embed\\?\/|watch\?v=)?([a-zA-Z0-9_-]{11})/g)) ytIds.add(m[1]);

    // Also look for Vimeo
    const vimeoIds = new Set();
    for (const m of html.matchAll(/vimeo\.com\/(?:video\/)?(\d{6,12})/g)) vimeoIds.add(m[1]);

    console.log(`  PDFs: ${pdfUrls.size}, MP4s: ${mp4Urls.size}, YouTube: ${ytIds.size}, Vimeo: ${vimeoIds.size}`);
    [...pdfUrls].forEach(u => console.log(`    PDF → ${u}`));
    [...mp4Urls].forEach(u => console.log(`    MP4 → ${u}`));
    [...ytIds].forEach(id => console.log(`    YT  → https://youtu.be/${id}`));
    [...vimeoIds].forEach(id => console.log(`    Vim → https://vimeo.com/${id}`));

    // ── 3. Targeted PDF path probing (only most-likely filenames + 2023-2026) ─
    console.log("\n🔎  Probing most-likely PDF paths (targeted, fast)…");
    const PDF_NAMES = [
        "Alba-Palm-Beach-Brochure.pdf", "ALBA-Brochure.pdf", "Alba-Brochure.pdf",
        "Alba-Palm-Beach-Fact-Sheet.pdf", "Alba-Fact-Sheet.pdf",
        "Alba-Palm-Beach-Floor-Plans.pdf", "Alba-Floor-Plans.pdf",
        "Alba-Palm-Beach-Floorplan.pdf",
        "alba-brochure.pdf", "alba-fact-sheet.pdf", "alba-floor-plans.pdf",
        "ALBA_Brochure.pdf", "ALBA_PalmBeach_Brochure.pdf",
    ];
    const YEAR_MONTHS = ["2023/01", "2023/06", "2023/09", "2024/01", "2024/06", "2025/01", "2025/06", "2026/01"];

    for (const name of PDF_NAMES) {
        let found = false;
        // Try root uploads first
        if (await headOk(`https://www.albapalmbeach.com/wp-content/uploads/${name}`)) {
            pdfUrls.add(`https://www.albapalmbeach.com/wp-content/uploads/${name}`);
            console.log(`  ✅  /wp-content/uploads/${name}`); found = true;
        }
        if (!found) {
            for (const ym of YEAR_MONTHS) {
                const url = `https://www.albapalmbeach.com/wp-content/uploads/${ym}/${name}`;
                if (await headOk(url)) { pdfUrls.add(url); console.log(`  ✅  ${url}`); found = true; break; }
                await sleep(50);
            }
        }
        if (!found) process.stdout.write(".");
    }
    console.log();

    // ── 4. Upload found PDFs ─────────────────────────────────────────────────
    const PDF_SLOTS = ["brochure.pdf", "hoja.pdf", "planos.pdf"];
    const pdfList = [...pdfUrls].filter(u => u.endsWith(".pdf"));
    if (pdfList.length) {
        console.log(`\n⬆️   Uploading ${pdfList.length} PDF(s)…`);
        for (let i = 0; i < pdfList.length && i < PDF_SLOTS.length; i++) {
            try {
                const { buf } = await download(pdfList[i]);
                await upload(buf, `assets2/desarrollos/alba-palm-beach/pdfs/${PDF_SLOTS[i]}`, "application/pdf");
            } catch (e) { console.log(`  ❌  ${e.message}`); }
        }
    } else {
        console.log("\n  ⚠️  No PDFs found. They are likely behind a registration form.");
        console.log("  → Upload them manually via the Editor panel at /editor");
    }

    // ── 5. Handle video (MP4 direct or YouTube embed) ────────────────────────
    let videoUploaded = false;
    if (mp4Urls.size) {
        console.log(`\n⬆️   Uploading MP4 video…`);
        for (const url of mp4Urls) {
            try {
                const { buf, ct } = await download(url);
                if (buf.length < 100000) continue;
                await upload(buf, "assets2/desarrollos/alba-palm-beach/video.mp4", "video/mp4");
                videoUploaded = true; break;
            } catch (e) { console.log(`  ❌  ${e.message}`); }
        }
    }

    // Add YouTube iframe to AlbaPalmBeach.tsx if no MP4
    const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
    let tsSrc = readFileSync(tsPath, "utf-8");
    const hasVideo = tsSrc.includes("youtube") || tsSrc.includes("iframe") || tsSrc.includes("video");

    if (!videoUploaded && ytIds.size) {
        const firstId = [...ytIds][0];
        console.log(`\n🎬  YouTube video found: https://youtu.be/${firstId}`);
        if (!hasVideo) {
            tsSrc = tsSrc.replace(
                "export default project;",
                [
                    `project.video = (`,
                    `    <iframe`,
                    `        width="100%"`,
                    `        height="500px"`,
                    `        src="https://www.youtube.com/embed/${firstId}?controls=1&rel=0"`,
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
            console.log(`  ✅  YouTube iframe added to AlbaPalmBeach.tsx`);
        }
    } else if (!videoUploaded && vimeoIds.size) {
        const firstId = [...vimeoIds][0];
        console.log(`\n🎬  Vimeo video found: https://vimeo.com/${firstId}`);
        if (!hasVideo) {
            tsSrc = tsSrc.replace(
                "export default project;",
                [
                    `project.video = (`,
                    `    <iframe`,
                    `        width="100%"`,
                    `        height="500px"`,
                    `        src="https://player.vimeo.com/video/${firstId}"`,
                    `        title="Alba Palm Beach"`,
                    `        allow="autoplay; fullscreen; picture-in-picture"`,
                    `        allowFullScreen`,
                    `        style={{border: "none", display: "block"}}`,
                    `    />`,
                    `);`,
                    `export default project;`,
                ].join("\n")
            );
            writeFileSync(tsPath, tsSrc, "utf-8");
            console.log(`  ✅  Vimeo iframe added to AlbaPalmBeach.tsx`);
        }
    } else if (!videoUploaded) {
        console.log("\n  ⚠️  No video found. Upload video.mp4 manually via /editor");
    }

    console.log("\n🎉  Done!\n");
}

main().catch(console.error);

