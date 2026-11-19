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
 * When you are ready to collect emails (for a newsletter, product launches,
 * or paid technical guides), paste your form action URL from Buttondown,
 * ConvertKit, Beehiiv, or Substack below.
 *
 * Leave `actionUrl` empty to show the lightweight RSS + GitHub follow bar instead.
 */
export const NEWSLETTER = {
  enabled: true,
  heading: 'Stay in the loop',
  description:
    'Occasional deep dives on software engineering, architecture lessons, and tools I build. No spam, unsubscribe anytime.',
  actionUrl: '', // e.g. 'https://buttondown.com/api/emails/embed-subscribe/albertlee'
  emailFieldName: 'email',
  buttonLabel: 'Subscribe',
} as const;

export interface ProjectItem {
  name: string;
  description: string;
  url: string;
  status: 'Active' | 'Building' | 'Open Source' | 'Planned';
  tags: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    name: 'albertlee.org',
    description:
      'This site — a zero-ops, high-speed static blog and personal home built with Astro and hosted on Cloudflare Pages.',
    url: 'https://github.com/pospospos2007/albertlee.org',
    status: 'Active',
    tags: ['Astro', 'Cloudflare Pages', 'Static'],
  },
];
