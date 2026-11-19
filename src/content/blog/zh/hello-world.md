---
title: "为什么我用零运维纯静态方案搭建 albertlee.org"
description: "用 Astro + GitHub + Cloudflare Pages 搭一个极简个人技术博客：每月 $0 服务器成本、彻底拒绝运维负担，同时为未来的产品与变现留好扩展空间。"
pubDate: 2026-11-17
category: "tech"
tags: ["engineering", "astro", "cloudflare"]
---

每个软件工程师迟早都会意识到一件事：如果所有内容都只发在第三方平台，你既不拥有自己的网址，也不拥有自己的读者关系。

所以我注册了 **albertlee.org**，并给自己定了三条硬性原则：

1. **拒绝运维负担**：不买 VPS、不折腾数据库备份、半夜三点不用怕服务器宕机。
2. **$0 基础设施成本**：纯静态站点托管在 Cloudflare 全球边缘网络上。
3. **保留成长空间**：先从极简、高速的技术博客起步，后续随时可以无缝扩展小工具、邮件订阅或独立产品。

## 技术栈选型

![零运维纯静态发布流程：Markdown + Astro 推送至 GitHub 并由 Cloudflare Pages 自动部署](/images/static-blog-stack.svg)

| 层级 | 方案 | 原因 |
| --- | --- | --- |
| 框架 | **Astro** | 默认零前端 JS，原生支持 Markdown/MDX，极速构建与满分 SEO |
| 托管与 CDN | **Cloudflare Pages** | `git push` 自动构建上线，免费 HTTPS 与全球 CDN |
| DNS 与邮箱 | **Cloudflare** | 秒级 DNS、`www` 自动 301 跳转与免费 Email Routing |
| 内容存储 | **Git + Markdown** | 永久可迁移、自带版本控制、零平台锁定 |

## 先把写作跑起来

至于未来具体以哪种方式变现，现在并不需要过早定死。对工程师来说，把真实解决过的技术难题持续写出来本身就是复利——既能帮到同样踩坑的人、积累精准搜索流量，也能为以后推出的小工具或独立产品打好地基。

```bash
# 整个发布流程就这三行
git add src/content/blog/
git commit -m "post: add new engineering note"
git push
```

推到 `main` 分支，等 30 秒，全球节点自动上线。开始写吧。
