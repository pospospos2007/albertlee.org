import type { Lang } from './i18n';

export const SITE = {
  title: 'Albert Lee',
  tagline: 'Software Engineer',
  description:
    'Notes on software engineering, systems design, developer tools, and building independent products on the web.',
  url: 'https://albertlee.org',
  author: 'Albert Lee',
  locale: 'en-US',
} as const;

export const SOCIALS = {
  github: 'https://github.com/pospospos2007',
  email: 'hello@albertlee.org',
  x: '', // Optional: e.g. 'https://x.com/yourhandle'
  linkedin: '', // Optional: e.g. 'https://linkedin.com/in/yourhandle'
} as const;

/**
 * Future Monetization & Audience Building Configuration
 * ----------------------------------------------------
 * Paste your form action URL from Buttondown, ConvertKit, Beehiiv, or Substack
 * below when ready to collect email subscribers.
 */
export const NEWSLETTER = {
  enabled: true,
  actionUrl: '', // e.g. 'https://buttondown.com/api/emails/embed-subscribe/albertlee'
  emailFieldName: 'email',
} as const;

export interface ProjectItem {
  name: string;
  description: Record<Lang, string>;
  url: string;
  status: Record<Lang, string>;
  tags: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'albertlee.org',
    description: {
      en: 'This site — a zero-ops, bilingual static blog and personal home built with Astro and hosted on Cloudflare Pages.',
      zh: '本站 —— 基于 Astro 与 Cloudflare Pages 构建的零运维、双语极简静态个人博客。',
    },
    url: 'https://github.com/pospospos2007/albertlee.org',
    status: {
      en: 'Active',
      zh: '运行中',
    },
    tags: ['Astro', 'Cloudflare Pages', 'Static'],
  },
];
