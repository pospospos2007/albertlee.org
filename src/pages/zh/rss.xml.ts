import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../../consts';
import { UI } from '../../i18n';
import { getPostUrl, getPublishedPosts } from '../../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts('zh');
  const t = UI.zh;

  return rss({
    title: `${t.siteTitle}（中文）`,
    description: t.siteDescription,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getPostUrl(post),
      categories: post.data.tags,
    })),
    customData: `<language>${t.locale}</language>`,
  });
}
