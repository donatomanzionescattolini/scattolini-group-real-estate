# Blog / Insights — Guide

The site has a bilingual (ES/EN) **Insights** blog at `/blog`, focused on calm, advisory-style content for foreign real-estate investors in South Florida.

## How content works (two layers)

1. **Curated seed posts** — `src/data/blog.ts`. These ship with the site so the blog is never empty. Edit or add posts here directly.
2. **AI-generated posts** — `src/data/generated-posts.json`. Appended automatically by the scheduled generator (starts as an empty `[]`).

Both layers merge and sort by date in `src/data/blog.ts`.

## Adding a post by hand

Add an object to `seedPosts` in `src/data/blog.ts`:

```ts
{
  id: 'mi-slug-unico',
  category: 'investor-guide', // market-insights | investor-guide | financing | neighborhood | lifestyle
  author: 'Scattolini Group',
  publishedAt: '2026-06-01',  // YYYY-MM-DD
  readMinutes: 5,
  image: 'https://…',
  title:   { es: '…', en: '…' },
  excerpt: { es: '…', en: '…' },
  body: {
    es: ['Párrafo…', '## Subtítulo', 'Párrafo…'],
    en: ['Paragraph…', '## Subheading', 'Paragraph…'],
  },
}
```

A body entry starting with `## ` renders as a subheading; everything else is a paragraph.

## The scheduled self-generating content

`api/generate-post.mjs` runs **every Monday at 13:00 UTC** (`vercel.json` → `crons`). Each run:

1. Picks a rotating topic (foreign-buyer focused).
2. Asks OpenAI for a bilingual article as strict JSON.
3. Commits it to `src/data/generated-posts.json` via the GitHub API → Vercel redeploys → the post goes live.

### To activate, set these env vars in Vercel

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | OpenAI key used to write the article |
| `GITHUB_TOKEN` | Fine-grained PAT with **Contents: read & write** on this repo |
| `GITHUB_REPO` | `owner/repository` |
| `GITHUB_BRANCH` | Branch to commit to (default `main`) |
| `CRON_SECRET` | Shared secret; Vercel Cron sends it as a Bearer token |

Until these are set, the endpoint safely returns an error and the blog simply shows the curated seed posts.

### Run it manually (e.g. to test)

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" https://<your-site>/api/generate-post
```

Re-runs are idempotent — a post with an existing id is skipped.

### Editorial safety

Generated posts are committed to the repo, so they are **reviewable in git** before/after going live. To require approval first, point the generator at a `drafts` branch and merge manually, or add an `approved: true` flag check in `blog.ts`.

