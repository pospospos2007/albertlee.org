# albertlee.org

Minimalist, bilingual (English / 中文), zero-ops personal blog & engineering home for **Albert Lee**, built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Features

- **Bilingual EN / 中文**: Static routes (`/`, `/blog/...` for English and `/zh/`, `/zh/blog/...` for Chinese) with top-bar switcher, automatic `hreflang` SEO tags, and separate `/rss.xml` + `/zh/rss.xml` feeds.
- **Categories & Tags**: Built-in filtering across `tech` (Engineering / 技术), `faith` (Faith / 信仰), and `notes` (Life & Notes / 随笔), plus tag archive pages.
- **Images & Video Ready**: Drop images into `public/images/` and embed responsive videos via `.video-embed` or `<video>`.
- **Zero JS by default**: Pure static HTML output for top Lighthouse & SEO performance.
- **Light / Dark mode**: Respects OS preference with a flash-free toggle.

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

Visit `http://localhost:4321` (English) or `http://localhost:4321/zh/` (Chinese).

## Publishing a New Post

1. Add Markdown files with the **same filename (slug)** under both folders for automatic EN ↔ 中文 linking:
   - English: `src/content/blog/en/my-post-slug.md`
   - Chinese: `src/content/blog/zh/my-post-slug.md`
2. Set frontmatter (valid `category` values: `tech`, `faith`, `notes`):

```markdown
---
title: "Your Post Title"
description: "Short summary for cards and SEO."
pubDate: 2026-11-20
category: "tech"
tags: ["engineering"]
draft: false
---
```

3. Commit and push to `main`:

```powershell
git add .
git commit -m "post: your title"
git push
```

Cloudflare Pages automatically builds (`npm run build` -> `dist`) and deploys to `https://albertlee.org`.

## Adding Images & Videos

- **Images**: Put files in `public/images/` (e.g., `public/images/static-blog-stack.svg`) and reference them in Markdown:
  ```markdown
  ![Architecture diagram](/images/static-blog-stack.svg)
  ```
- **YouTube / Bilibili Videos**: Embed cleanly with the built-in responsive 16:9 wrapper:
  ```html
  <div class="video-embed">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen loading="lazy"></iframe>
  </div>
  ```
- **Short MP4/WebM Clips** (keep small, or host on Cloudflare R2 for larger files):
  ```html
  <video controls preload="metadata" src="/images/demo.mp4"></video>
  ```
