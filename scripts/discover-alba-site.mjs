/**
 * discover-alba-site.mjs — crawls albapalmbeach.com to find all internal links,
 * PDF downloads, and video embeds.
 */
const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,*/*",
};

const BASE = "https://www.albapalmbeach.com";

const SEED_PAGES = [
    "/",
    "/gallery",
    "/downloads",
    "/residences",
    "/amenities",
    "/video",
    "/videos",
    "/media",
    "/the-building",
    "/location",
    "/contact",
    "/floor-plans",
    "/brochure",
];

async function fetchPage(path) {
    try {
        const res = await fetch(BASE + path, { headers: HEADERS });
        if (!res.ok) return null;
        return res.text();
    } catch { return null; }
}

async function main() {
    const allPdfs = new Set();
    const allVideos = { mp4: new Set(), youtube: new Set(), vimeo: new Set() };
    const allLinks = new Set();
    const visited = new Set();

    for (const path of SEED_PAGES) {
        if (visited.has(path)) continue;
        visited.add(path);
        process.stdout.write(`Fetching ${path} … `);
        const html = await fetchPage(path);
        if (!html) { console.log("❌"); continue; }
        console.log(`✅ (${Math.round(html.length / 1024)}KB)`);

        // PDFs
        for (const m of html.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)) allPdfs.add(m[0]);
        for (const m of html.matchAll(/href=["']([^"']*\.pdf)/gi)) {
            allPdfs.add(m[1].startsWith("http") ? m[1] : BASE + m[1]);
        }

        // MP4 videos
        for (const m of html.matchAll(/https?:\/\/[^\s"'<>]+\.mp4/gi)) allVideos.mp4.add(m[0]);
        for (const m of html.matchAll(/src=["']([^"']*\.mp4)/gi)) {
            allVideos.mp4.add(m[1].startsWith("http") ? m[1] : BASE + m[1]);
        }

        // YouTube
        for (const m of html.matchAll(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/g)) {
            allVideos.youtube.add(m[1]);
        }
        for (const m of html.matchAll(/["']https?:\/\/(?:www\.)?youtu(?:\.be|be\.com)\/[^"']+["']/g)) {
            allVideos.youtube.add(m[0]);
        }

        // Vimeo
        for (const m of html.matchAll(/vimeo\.com\/(?:video\/)?(\d{6,12})/g)) allVideos.vimeo.add(m[1]);

        // Internal links for further crawling
        for (const m of html.matchAll(/href=["'](\/[^"'#?]*)/g)) allLinks.add(m[1]);

        // Show context around "video" or "pdf" mentions
        const videoCtx = [];
        for (const m of html.matchAll(/(video|\.pdf|youtube|vimeo|mp4)/gi)) {
            const ctx = html.slice(Math.max(0, m.index - 100), m.index + 100).replace(/\s+/g, " ");
            videoCtx.push(ctx);
        }
        if (videoCtx.length) {
            console.log(`  → ${videoCtx.length} video/pdf reference(s):`);
            [...new Set(videoCtx)].slice(0, 5).forEach(c => console.log(`    ${c.slice(0, 150)}`));
        }
    }

    console.log("\n\n════════════ RESULTS ════════════");
    console.log("\n📄 PDFs found:");
    if (allPdfs.size) [...allPdfs].forEach(u => console.log("  " + u));
    else console.log("  (none)");

    console.log("\n🎥 Videos found:");
    console.log("  MP4:", [...allVideos.mp4].length ? [...allVideos.mp4].join("\n  ") : "(none)");
    console.log("  YouTube IDs:", [...allVideos.youtube].length ? [...allVideos.youtube].join(", ") : "(none)");
    console.log("  Vimeo IDs:", [...allVideos.vimeo].length ? [...allVideos.vimeo].join(", ") : "(none)");

    console.log("\n🔗 Internal links discovered:");
    [...allLinks].sort().forEach(l => console.log("  " + l));
}

main().catch(console.error);

