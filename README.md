# albertlee.org

Minimalist, zero-ops personal blog & engineering home for **Albert Lee**, built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Features

- **Zero JS by default**: Pure static HTML output for top Lighthouse & SEO performance.
- **Markdown & MDX**: Type-safe content collections in `src/content/blog/`, draft filtering, reading time calculation, and automatic dual-theme Shiki syntax highlighting.
- **SEO built in**: Canonical URLs, Open Graph / Twitter metadata, JSON-LD structured data, auto-generated `/sitemap-index.xml`, `/rss.xml`, and `robots.txt`.
- **Light / Dark mode**: Respects OS preference with a flash-free toggle.
- **Ready to scale**: Pre-wired `/projects` showcase and configurable `NewsletterBox` component in `src/consts.ts` for future audience building & monetization.

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

## Publishing a New Post

1. Create a file in `src/content/blog/your-slug.md` (or `.mdx`).
2. Add frontmatter (`title`, `description`, `pubDate`, `tags`, optional `draft: true`).
3. Commit and push to `main`:

```bash
git add .
git commit -m "post: your title"
git push
```

Cloudflare Pages automatically builds (`npm run build` -> `dist`) and deploys to `https://albertlee.org`.

## Customization

- **Site info, social links, projects, newsletter form**: edit `src/consts.ts`.
- **Styling & colors**: edit CSS variables at the top of `src/styles/global.css`.
