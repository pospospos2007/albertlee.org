import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type BlogPost = CollectionEntry<'blog'>;

export function getPostLang(post: BlogPost): Lang {
  return post.id.startsWith('zh/') ? 'zh' : 'en';
}

export function getPostSlug(post: BlogPost): string {
  return post.id.replace(/^(en|zh)\//, '');
}

export function getPostUrl(post: BlogPost): string {
  const lang = getPostLang(post);
  const slug = getPostSlug(post);
  return lang === 'zh' ? `/zh/blog/${slug}/` : `/blog/${slug}/`;
}

export async function getPublishedPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection('blog', (entry) => {
    const matchesLang = getPostLang(entry) === lang;
    const isVisible = import.meta.env.PROD ? !entry.data.draft : true;
    return matchesLang && isVisible;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function hasTranslation(lang: Lang, slug: string): Promise<boolean> {
  const otherLang: Lang = lang === 'en' ? 'zh' : 'en';
  const posts = await getPublishedPosts(otherLang);
  return posts.some((p) => getPostSlug(p) === slug);
}

export function getReadingTime(body: string | undefined, lang: Lang = 'en'): string {
  if (!body) return lang === 'zh' ? '预计阅读 1 分钟' : '1 min read';
  const cjkChars = (body.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) ?? []).length;
  const latinWords = body
    .replace(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(latinWords / 220 + cjkChars / 400));
  return lang === 'zh' ? `阅读约 ${minutes} 分钟` : `${minutes} min read`;
}

export function formatDate(date: Date, lang: Lang = 'en'): string {
  if (lang === 'zh') {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    return `${y}年${m}月${d}日`;
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllTags(posts: BlogPost[]): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { tag, slug, count: 1 });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
