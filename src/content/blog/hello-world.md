---
title: "Why I Built albertlee.org on a Zero-Ops Static Stack"
description: "Starting a personal engineering blog with Astro, GitHub, and Cloudflare Pages — $0/month hosting, zero server maintenance, and room to grow."
pubDate: 2026-11-18
tags: ["engineering", "astro", "cloudflare"]
featured: true
---

Every software engineer eventually hits the same realization: relying solely on third-party platforms means you don't own your audience, your URLs, or your distribution.

So I registered **albertlee.org** and set up a personal home on the web with three strict rules:

1. **Zero ops burden** — no VPS to patch, no database to back up, no Docker container crashing at 3 AM.
2. **$0 infrastructure cost** — static files served globally from Cloudflare's edge network.
3. **Room to grow** — start as a fast, readable technical blog, with a clean path to add developer tools, newsletters, or independent products later.

## The Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Astro** | Ships pure HTML by default, first-class Markdown/MDX, instant builds |
| Hosting & CDN | **Cloudflare Pages** | Automatic deploy on `git push`, free SSL, global edge caching |
| DNS | **Cloudflare DNS** | Fast propagation and seamless Pages integration |
| Content | **Markdown in Git** | Portable forever, version-controlled, zero vendor lock-in |

## Writing Is the Starting Point

I don't have the full roadmap figured out yet, and that's intentional. Publishing consistently as a software engineer compounds in ways that are hard to predict upfront — better technical clarity, search traffic from solving real problems, and a home base for whatever tools or products come next.

```bash
# The entire publishing workflow
git add src/content/blog/my-next-post.md
git commit -m "post: add new engineering note"
git push
```

Push to `main`, wait ~30 seconds, and it's live globally. Now it's time to write.
