# albertlee.org

Minimalist, bilingual (English / 中文), zero-ops personal blog & engineering home for **Albert Lee**, built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Features

- **Bilingual EN / 中文**: Static routes (`/`, `/blog/...` for English and `/zh/`, `/zh/blog/...` for Chinese) with top-bar switcher, automatic `hreflang` SEO tags, and separate `/rss.xml` + `/zh/rss.xml` feeds.
- **Zero JS by default**: Pure static HTML output for top Lighthouse & SEO performance.
- **Markdown & MDX**: Type-safe content collections in `src/content/blog/en/` and `src/content/blog/zh/`, draft filtering, reading time estimation, and dual-theme Shiki syntax highlighting.
- **Light / Dark mode**: Respects OS preference with a flash-free toggle.
- **Ready to scale**: Pre-wired `/projects` showcase and configurable `NewsletterBox` in `src/consts.ts`.

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

Visit `http://localhost:4321` (English) or `http://localhost:4321/zh/` (Chinese).

## Publishing a New Post

1. Add Markdown files with the **same filename (slug)** under both folders for bilingual linking:
   - English: `src/content/blog/en/my-post-slug.md`
   - Chinese: `src/content/blog/zh/my-post-slug.md`
2. Add frontmatter (`title`, `description`, `pubDate`, `tags`, optional `draft: true`).
3. Commit and push to `main`:

```powershell
git add .
git commit -m "post: your title"
git push
```

Cloudflare Pages automatically builds (`npm run build` -> `dist`) and deploys to `https://albertlee.org`.
