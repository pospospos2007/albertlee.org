---
title: "Publishing Workflow & Markdown Cheat Sheet"
description: "A quick reference for writing posts, syntax highlighting, drafts, and enabling email subscriptions on albertlee.org."
pubDate: 2026-11-17
tags: ["meta", "workflow"]
---

This post serves as a quick reference (and visual test) for publishing new articles on `albertlee.org`. Feel free to delete it once you've written a few posts of your own.

## Adding a New Post

Create a new `.md` or `.mdx` file inside `src/content/blog/` with frontmatter like this:

```markdown
---
title: "Debugging a Subtle Memory Leak in Production"
description: "How we tracked down an unbounded cache using heap snapshots."
pubDate: 2026-11-20
tags: ["debugging", "performance"]
draft: false
---
```

Set `draft: true` while writing — drafts stay visible in `npm run dev` locally, and are automatically excluded from production builds (`npm run build`).

## Code Highlighting

Dual-theme syntax highlighting (`github-light` / `github-dark`) works automatically when you toggle light and dark mode:

```typescript
export function calculateCacheTTL(hitRate: number): number {
  const baseSeconds = 60;
  return hitRate > 0.9 ? baseSeconds * 10 : baseSeconds;
}
```

## Quotes & Callouts

> Good engineering writing focuses on real constraints, concrete trade-offs, and what actually worked in production.

## Turning On Future Monetization Building Blocks

Whenever you're ready to grow this site beyond a blog:

- **Email list**: Paste your Buttondown, ConvertKit, or Beehiiv embed action URL into `NEWSLETTER.actionUrl` inside `src/consts.ts`.
- **Projects / SaaS / Tools**: Add items to `PROJECTS` in `src/consts.ts` to showcase them on the homepage and `/projects`.
- **Custom email (`hello@albertlee.org`)**: Enable free Cloudflare Email Routing in your Cloudflare dashboard, then set `SOCIALS.email` in `src/consts.ts`.
