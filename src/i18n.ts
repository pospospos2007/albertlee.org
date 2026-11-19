export type Lang = 'en' | 'zh';
export type Category = 'tech' | 'faith' | 'notes';

export const CATEGORIES: Category[] = ['tech', 'faith', 'notes'];

export const CATEGORY_LABELS: Record<Lang, Record<Category | 'all', string>> = {
  en: {
    all: 'All',
    tech: 'Engineering',
    faith: 'Faith',
    notes: 'Life & Notes',
  },
  zh: {
    all: '全部',
    tech: '技术',
    faith: '信仰',
    notes: '随笔',
  },
};

export const DEFAULT_LANG: Lang = 'en';

export const UI = {
  en: {
    htmlLang: 'en',
    locale: 'en-US',
    siteTitle: 'Albert Lee',
    tagline: 'Software Engineer',
    siteDescription:
      'Notes on software engineering, systems design, developer tools, and building independent products on the web.',
    nav: {
      writing: 'Writing',
      projects: 'Projects',
      about: 'About',
      switchLabel: '中文',
      switchAria: 'Switch to Chinese',
      themeAria: 'Toggle color theme',
    },
    home: {
      eyebrow: '$ whoami',
      heading: "Hi, I'm Albert Lee.",
      bio: "I'm a software engineer. I write about practical engineering, systems debugging, developer tooling, and building lean, useful products on the internet.",
      latestWriting: 'Latest Writing',
      allPosts: 'All posts →',
      projectsTitle: 'Projects & Tools',
      viewAll: 'View all →',
      rssFeed: 'RSS Feed →',
      email: 'Email →',
      about: 'About →',
      github: 'GitHub →',
    },
    blog: {
      title: 'Writing',
      description:
        'Essays, engineering notes, and debugging guides on software development and building products.',
      introPrefix:
        'Notes on software engineering, architecture trade-offs, and practical fixes. Subscribe via ',
      introSuffix: ' to get new posts automatically.',
      allWriting: '← All writing',
      updated: 'Updated',
      older: '← Older',
      newer: 'Newer →',
      alsoInOtherLang: '阅读中文版 →',
      tagCountSingular: 'post tagged with',
      tagCountPlural: 'posts tagged with',
      emptyCategory: 'No posts in this category yet.',
      viewSingular: 'view',
      viewPlural: 'views',
    },
    projects: {
      title: 'Projects & Products',
      pageTitle: 'Projects',
      description:
        'Open-source software, developer tools, and independent products built by Albert Lee.',
      intro:
        "Tools, experiments, and software I'm building. This page will grow as I ship small utilities, open-source packages, and independent web products.",
    },
    about: {
      title: 'About',
      description:
        'About Albert Lee — software engineer writing about engineering craft, systems, and indie tools.',
    },
    newsletter: {
      heading: 'Stay in the loop',
      description:
        'Occasional deep dives on software engineering, debugging notes, and tools I build. No spam, unsubscribe anytime.',
      placeholder: 'you@example.com',
      buttonLabel: 'Subscribe',
      rssButton: 'Subscribe via RSS',
      githubButton: 'Follow on GitHub',
    },
    footer: {
      builtWith: 'Built with Astro & Cloudflare Pages.',
    },
    notFound: {
      title: '404 — Page Not Found',
      heading: 'Page not found',
      desc: "The page you're looking for doesn't exist or has been moved.",
      backHome: 'Back to home',
    },
  },
  zh: {
    htmlLang: 'zh-CN',
    locale: 'zh-CN',
    siteTitle: 'Albert Lee',
    tagline: '软件工程师',
    siteDescription:
      '记录软件工程实战、系统排障、开发工具以及独立产品的思考与笔记。',
    nav: {
      writing: '文章',
      projects: '项目',
      about: '关于',
      switchLabel: 'EN',
      switchAria: '切换到英文',
      themeAria: '切换明暗主题',
    },
    home: {
      eyebrow: '$ whoami',
      heading: '你好，我是 Albert Lee。',
      bio: '一名软件工程师，专注实用工程架构、系统排障实战、开发者工具，以及长期构建精简有用的独立产品。',
      latestWriting: '最新文章',
      allPosts: '全部文章 →',
      projectsTitle: '项目与工具',
      viewAll: '查看全部 →',
      rssFeed: 'RSS 订阅 →',
      email: '邮箱联系 →',
      about: '关于我 →',
      github: 'GitHub →',
    },
    blog: {
      title: '文章',
      description: '软件工程笔记、系统排障复盘与实用技术指南。',
      introPrefix: '记录软件工程实践、架构取舍与真实排障方案。可以通过 ',
      introSuffix: ' 自动订阅最新文章。',
      allWriting: '← 返回全部文章',
      updated: '更新于',
      older: '← 上一篇',
      newer: '下一篇 →',
      alsoInOtherLang: 'Read in English →',
      tagCountSingular: '篇文章包含标签',
      tagCountPlural: '篇文章包含标签',
      emptyCategory: '该分类下暂时还没有文章。',
      viewSingular: '次阅读',
      viewPlural: '次阅读',
    },
    projects: {
      title: '项目与产品',
      pageTitle: '项目',
      description: 'Albert Lee 构建的开源项目、开发者工具与独立产品。',
      intro:
        '这里收录我正在做的工具、实验项目与软件产品。随着后续发布更多实用小工具、开源库和独立 Web 产品，这里会持续更新。',
    },
    about: {
      title: '关于',
      description: '关于 Albert Lee —— 软件工程师，分享工程实践、系统排障与独立工具。',
    },
    newsletter: {
      heading: '保持关注',
      description:
        '不定期分享软件工程深度笔记、真实排障复盘以及我做的小工具。无垃圾邮件，随时退订。',
      placeholder: 'you@example.com',
      buttonLabel: '订阅',
      rssButton: '通过 RSS 订阅',
      githubButton: '在 GitHub 关注',
    },
    footer: {
      builtWith: '基于 Astro 与 Cloudflare Pages 构建。',
    },
    notFound: {
      title: '404 — 页面未找到',
      heading: '页面未找到',
      desc: '你访问的页面不存在或已被移动。',
      backHome: '返回首页',
    },
  },
} as const;

export function getPrefix(lang: Lang): string {
  return lang === 'zh' ? '/zh' : '';
}

export function localizedPath(lang: Lang, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return normalized;
  return normalized === '/' ? '/zh/' : `/zh${normalized}`;
}

export function getAlternateUrl(lang: Lang, currentPathname: string, customAlt?: string): string {
  if (customAlt) return customAlt;
  const targetLang: Lang = lang === 'en' ? 'zh' : 'en';
  if (lang === 'zh') {
    const stripped = currentPathname.replace(/^\/zh(?=\/|$)/, '') || '/';
    return stripped;
  }
  return localizedPath(targetLang, currentPathname);
}
