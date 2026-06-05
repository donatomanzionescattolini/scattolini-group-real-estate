// api/generate-post.mjs
//
// Scheduled blog-post generator for the Scattolini Group site.
//
// HOW IT WORKS
// 1. Vercel Cron (see vercel.json "crons") calls this endpoint on a schedule.
// 2. It asks OpenAI for a bilingual (ES/EN) real-estate advisory article aimed
//    at foreign investors, returned as strict JSON.
// 3. It appends the new post to `src/data/generated-posts.json` by committing it
//    through the GitHub Contents API, which triggers a fresh Vercel deploy so the
//    article appears on the site automatically.
//
// REQUIRED ENVIRONMENT VARIABLES (set in the Vercel dashboard)
//   OPENAI_API_KEY   – OpenAI API key
//   GITHUB_TOKEN     – fine-grained PAT with "Contents: read & write" on the repo
//   GITHUB_REPO      – "owner/repository" (e.g. "scattolini/scattolini-group-real-estate")
//   GITHUB_BRANCH    – branch to commit to (defaults to "main")
//   CRON_SECRET      – shared secret; Vercel Cron sends it as a Bearer token
//
// To trigger manually:  curl -H "Authorization: Bearer <CRON_SECRET>" https://<site>/api/generate-post

const OPENAI_MODEL = 'gpt-4o-mini';
const GENERATED_FILE = 'src/data/generated-posts.json';

// Rotating topic pool — one is picked per run based on the week number so the
// blog covers a balanced spread of subjects over time.
const TOPICS = [
  'How foreign nationals obtain a mortgage in Florida',
  'Understanding FIRPTA withholding when a foreign owner sells',
  'LLC vs. personal ownership for international buyers',
  'Cap-rate trends in Brickell versus Edgewater',
  'The 1031 exchange explained for non-resident investors',
  'Seasonality of the Miami luxury rental market',
  'Closing costs and timelines for a cash purchase in Miami',
  'Property taxes and insurance for South Florida condos',
  'Why pre-construction deposit schedules favor international buyers',
  'Currency strategy: timing a dollar-denominated purchase',
  'Short-term rental rules across Miami-Dade neighborhoods',
  'How rising interest rates affect South Florida condo demand',
];

const CATEGORIES = ['market-insights', 'investor-guide', 'financing', 'neighborhood', 'lifestyle'];

function weekNumber(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date - start) / 86400000;
  return Math.floor(diff / 7);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 70);
}

function buildPrompt(topic) {
  return `You are a senior Miami real estate investment advisor at a boutique agency, writing for Latin American and European clients who are considering buying property in South Florida.

Write a blog post about: "${topic}".

Tone: professional, reassuring, educational, calm. Help foreign clients feel informed and confident, never pressured. Avoid hype and avoid guarantees about returns.

Return ONLY valid JSON (no markdown fences) with EXACTLY this shape:
{
  "category": one of ${JSON.stringify(CATEGORIES)},
  "readMinutes": integer between 3 and 7,
  "title": { "es": "...", "en": "..." },
  "excerpt": { "es": "1-2 sentence summary", "en": "1-2 sentence summary" },
  "body": {
    "es": ["paragraph", "## Subheading", "paragraph", ...],
    "en": ["paragraph", "## Subheading", "paragraph", ...]
  }
}

Rules for "body": 5 to 8 entries per language. Use "## " at the start of an entry to mark a subheading. The Spanish and English arrays must convey the same content. Use neutral, polished Spanish (no regionalisms).`;
}

async function generatePost(topic) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: buildPrompt(topic) }],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned no content');

  const parsed = JSON.parse(content);

  const today = new Date().toISOString().slice(0, 10);
  const title = parsed.title?.en || topic;

  return {
    id: `${slugify(title)}-${today}`,
    category: CATEGORIES.includes(parsed.category) ? parsed.category : 'investor-guide',
    author: 'Scattolini Group',
    publishedAt: today,
    readMinutes: Math.min(7, Math.max(3, Number(parsed.readMinutes) || 5)),
    // A rotating, stable stock image keeps the layout consistent without extra services.
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
    title: { es: parsed.title?.es ?? title, en: title },
    excerpt: { es: parsed.excerpt?.es ?? '', en: parsed.excerpt?.en ?? '' },
    body: {
      es: Array.isArray(parsed.body?.es) ? parsed.body.es : [],
      en: Array.isArray(parsed.body?.en) ? parsed.body.en : [],
    },
    generated: true,
  };
}

// ─── GitHub commit helpers ────────────────────────────────────────────────────

const GH_API = 'https://api.github.com';

async function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function getExistingFile(repo, branch) {
  const res = await fetch(`${GH_API}/repos/${repo}/contents/${GENERATED_FILE}?ref=${branch}`, {
    headers: await ghHeaders(),
  });
  if (res.status === 404) return { posts: [], sha: undefined };
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status} ${await res.text()}`);

  const json = await res.json();
  const decoded = Buffer.from(json.content, 'base64').toString('utf8');
  let posts = [];
  try {
    posts = JSON.parse(decoded);
  } catch {
    posts = [];
  }
  return { posts: Array.isArray(posts) ? posts : [], sha: json.sha };
}

async function commitFile(repo, branch, posts, sha, post) {
  const body = {
    message: `chore(blog): add scheduled post "${post.title.en}"`,
    content: Buffer.from(`${JSON.stringify(posts, null, 2)}\n`).toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(`${GH_API}/repos/${repo}/contents/${GENERATED_FILE}`, {
    method: 'PUT',
    headers: { ...(await ghHeaders()), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`GitHub commit failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // Authorize: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`.
  const auth = req.headers.authorization || '';
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.OPENAI_API_KEY || !process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return res.status(500).json({ error: 'Missing required environment variables' });
  }

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const topic = TOPICS[weekNumber() % TOPICS.length];

  try {
    const post = await generatePost(topic);
    const { posts, sha } = await getExistingFile(repo, branch);

    // Skip if a post with this id already exists (idempotent re-runs).
    if (posts.some((existing) => existing.id === post.id)) {
      return res.status(200).json({ skipped: true, reason: 'Post already exists', id: post.id });
    }

    const updated = [...posts, post];
    await commitFile(repo, branch, updated, sha, post);

    return res.status(200).json({ ok: true, id: post.id, topic, title: post.title.en });
  } catch (error) {
    return res.status(500).json({ error: String(error?.message || error) });
  }
}

