/**
 * find-alba-video-pdf.mjs
 * - Looks for video src in homepage (wpvr 360 plugin, JS sources)
 * - Tries common WordPress PDF paths
 * - Checks the Alba YouTube channel for video IDs
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

async function get(url) {
    const r = await fetch(url, { headers: H });
    return r.ok ? r.text() : null;
}
async function head(url) {
    try { const r = await fetch(url, { method: "HEAD", headers: H }); return r.ok ? r : null; } catch { return null; }
}
async function download(url) {
    const r = await fetch(url, { headers: H, redirect: "follow" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return { buf: Buffer.from(await r.arrayBuffer()), ct: r.headers.get("content-type") || "" };
}
async function upload(buf, key, ct) {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buf, ContentType: ct }));
    console.log(`  ✅  Uploaded → s3://${BUCKET}/${key}  (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
    console.log("\n🔍  Finding Alba Palm Beach video and PDFs…\n");

    // ── 1. Fetch homepage and look for video sources in all <script> blocks ──
    const homeHtml = await get("https://www.albapalmbeach.com/") || "";

    // Save snippet around "source" and "mp4" and "wpvr"
    const videoSnippets = [];
    for (const m of homeHtml.matchAll(/(source|mp4|wpvr|panorama|locat|autoplay|\.mp4|video_url|videoUrl)/gi)) {
        videoSnippets.push(homeHtml.slice(Math.max(0, m.index - 150), m.index + 200));
    }
    if (videoSnippets.length) {
        console.log("📄 Homepage video-related HTML snippets:");
        [...new Set(videoSnippets)].slice(0, 8).forEach(s => console.log("  " + s.replace(/\s+/g, " ").slice(0, 200)));
    }

    // Look specifically for wp-json API calls or localized script data (wp_localize_script)
    const wpjsonMatches = [...homeHtml.matchAll(/"(?:source|src|url|file)"\s*:\s*"([^"]+\.(?:mp4|webm|pdf))"/gi)];
    if (wpjsonMatches.length) {
        console.log("\n📌 Found in wp-localized data:");
        wpjsonMatches.forEach(m => console.log("  " + m[1]));
    }

    // ── 2. Try the WP JSON REST API for pages ─────────────────────────────────
    console.log("\n🔎  Checking WP REST API for pages with video/PDF…");
    const wpPages = await get("https://www.albapalmbeach.com/wp-json/wp/v2/pages?per_page=50");
    if (wpPages) {
        const pages = JSON.parse(wpPages);
        for (const page of pages) {
            const content = (page.content?.rendered || "") + (page.title?.rendered || "");
            const pdfs = [...content.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/g)].map(m => m[0]);
            const mp4s = [...content.matchAll(/https?:\/\/[^\s"'<>]+\.mp4/g)].map(m => m[0]);
            const yts = [...content.matchAll(/youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|)([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
            if (pdfs.length || mp4s.length || yts.length) {
                console.log(`  Page: "${page.title?.rendered}" (${page.link})`);
                pdfs.forEach(u => console.log(`    PDF: ${u}`));
                mp4s.forEach(u => console.log(`    MP4: ${u}`));
                yts.forEach(id => console.log(`    YouTube: https://youtu.be/${id}`));
            }
        }
    }

    // ── 3. Try WP REST API for media (attachments) ────────────────────────────
    console.log("\n🔎  Checking WP REST API media library for PDFs and videos…");
    const wpMedia = await get("https://www.albapalmbeach.com/wp-json/wp/v2/media?per_page=100&mime_type=application/pdf");
    if (wpMedia && wpMedia !== "null") {
        try {
            const media = JSON.parse(wpMedia);
            if (Array.isArray(media) && media.length) {
                console.log(`  Found ${media.length} PDF(s) in media library:`);
                media.forEach(m => console.log(`  → ${m.source_url}`));
            } else { console.log("  No PDFs in media library (public access)"); }
        } catch { console.log("  Could not parse media response"); }
    }

    const wpVideo = await get("https://www.albapalmbeach.com/wp-json/wp/v2/media?per_page=100&mime_type=video/mp4");
    if (wpVideo && wpVideo !== "null") {
        try {
            const media = JSON.parse(wpVideo);
            if (Array.isArray(media) && media.length) {
                console.log(`  Found ${media.length} video(s):`);
                media.forEach(m => console.log(`  → ${m.source_url}`));
            } else { console.log("  No videos in media library (public access)"); }
        } catch {  }
    }

    // ── 4. Probe common PDF filenames in wp-content/uploads ───────────────────
    console.log("\n🔎  Probing common PDF paths on albapalmbeach.com…");
    const PDF_CANDIDATES = [
        "Alba-Palm-Beach-Brochure.pdf",
        "Alba-Brochure.pdf",
        "AlbaPalmBeach-Brochure.pdf",
        "Alba-Palm-Beach-Fact-Sheet.pdf",
        "Alba-Fact-Sheet.pdf",
        "Alba-Floor-Plans.pdf",
        "Alba-Palm-Beach-Floor-Plans.pdf",
        "Alba-Palm-Beach-Floorplans.pdf",
        "ALBA-Brochure.pdf",
        "ALBA-Palm-Beach-Brochure.pdf",
        "ALBA_Brochure.pdf",
        "alba-palm-beach-brochure.pdf",
        "Brochure.pdf",
    ];
    const YEARS = ["2023", "2024", "2025", "2026", ""];
    const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", ""];

    const foundPdfs = [];
    for (const name of PDF_CANDIDATES) {
        for (const year of YEARS) {
            for (const month of MONTHS) {
                const path = year && month
                    ? `/wp-content/uploads/${year}/${month}/${name}`
                    : year
                    ? `/wp-content/uploads/${year}/${name}`
                    : `/wp-content/uploads/${name}`;
                const r = await head("https://www.albapalmbeach.com" + path);
                if (r) {
                    const url = "https://www.albapalmbeach.com" + path;
                    console.log(`  ✅  Found: ${url}`);
                    foundPdfs.push(url);
                    break; // found in this year/month, move to next filename
                }
            }
            if (foundPdfs.some(u => u.includes(name))) break;
        }
    }

    // ── 5. Upload any PDFs found ───────────────────────────────────────────────
    if (foundPdfs.length) {
        console.log("\n⬆️   Uploading PDFs to S3…");
        const PDF_NAMES = ["brochure.pdf", "hoja.pdf", "planos.pdf"];
        for (let i = 0; i < foundPdfs.length && i < PDF_NAMES.length; i++) {
            try {
                const { buf } = await download(foundPdfs[i]);
                await upload(buf, `assets2/desarrollos/alba-palm-beach/pdfs/${PDF_NAMES[i]}`, "application/pdf");
            } catch (e) { console.log(`  ❌  ${e.message}`); }
        }
    } else {
        console.log("\n  ⚠️  No PDFs found via path probing.");
        console.log("  The PDFs are likely behind a contact/registration form.");
        console.log("  → Upload them manually via the Editor panel at /editor");
    }

    // ── 6. YouTube channel: extract latest video IDs ───────────────────────────
    console.log("\n🎬  Checking Alba YouTube channel for video IDs…");
    const ytChannel = await get("https://www.youtube.com/@AlbaPalmBeach");
    if (ytChannel) {
        const ytIds = new Set([...ytChannel.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]));
        if (ytIds.size) {
            console.log(`  Found ${ytIds.size} video ID(s) on YouTube channel:`);
            [...ytIds].slice(0, 5).forEach(id => console.log(`  → https://youtu.be/${id}  |  embed: https://www.youtube.com/embed/${id}`));

            // Patch AlbaPalmBeach.tsx with the first YouTube video
            const firstId = [...ytIds][0];
            const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
            let src = readFileSync(tsPath, "utf-8");
            if (!src.includes("youtube") && !src.includes("iframe")) {
                src = src.replace(
                    "export default project;",
                    [
                        `project.video = (`,
                        `    <iframe`,
                        `        width="100%"`,
                        `        height="500px"`,
                        `        src="https://www.youtube.com/embed/${firstId}?controls=1&showinfo=0&rel=0"`,
                        `        title="Alba Palm Beach"`,
                        `        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`,
                        `        allowFullScreen`,
                        `        style={{border: "none", display: "block"}}`,
                        `    />`,
                        `);`,
                        `export default project;`,
                    ].join("\n")
                );
                writeFileSync(tsPath, src, "utf-8");
                console.log(`  ✅  YouTube iframe (ID: ${firstId}) added to AlbaPalmBeach.tsx`);
            } else {
                console.log("  ℹ️   Video already present in AlbaPalmBeach.tsx");
            }
        } else {
            console.log("  No video IDs extracted from YouTube channel page.");
        }
    } else {
        // Try Alba Palm Beach YouTube channel by name variations
        const channelId = "UCOYZ_MT8mZRWLc-9oSpjNvQ";
        const ytApi = await get(`https://www.youtube.com/channel/${channelId}`);
        if (ytApi) {
            const ytIds = new Set([...ytApi.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]));
            if (ytIds.size) {
                const firstId = [...ytIds][0];
                console.log(`  Found video ID from channel: ${firstId}`);
                console.log(`  → https://www.youtube.com/embed/${firstId}`);
                const tsPath = resolve(root, "src/objects/desarrollos/WestPalmBeach/AlbaPalmBeach.tsx");
                let src = readFileSync(tsPath, "utf-8");
                if (!src.includes("youtube")) {
                    src = src.replace(
                        "export default project;",
                        `project.video = (<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${firstId}?controls=1&rel=0" title="Alba Palm Beach" allowFullScreen style={{border:"none",display:"block"}} />);\nexport default project;`
                    );
                    writeFileSync(tsPath, src, "utf-8");
                    console.log(`  ✅  YouTube iframe added to AlbaPalmBeach.tsx`);
                }
            }
        }
    }

    console.log("\n🎉  Done!\n");
}

main().catch(console.error);

