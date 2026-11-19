interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  BLOG_VIEWS?: KVNamespaceLike;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;
const BOT_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|discordbot|headless|lighthouse|pingdom|uptime/i;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function getValidatedSlug(request: Request): string | null {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')?.trim().toLowerCase() ?? '';
  return SLUG_PATTERN.test(slug) ? slug : null;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') ?? request.headers.get('referer') ?? '';
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'albertlee.org' ||
      host === 'www.albertlee.org' ||
      host.endsWith('.albertlee-org.pages.dev') ||
      host === 'albertlee-org.pages.dev' ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

export async function onRequestGet({ request, env }: PagesContext): Promise<Response> {
  if (!env.BLOG_VIEWS) {
    return json({ error: 'KV binding BLOG_VIEWS not configured' }, 503);
  }

  const slug = getValidatedSlug(request);
  if (!slug) {
    return json({ error: 'Invalid slug' }, 400);
  }

  const raw = await env.BLOG_VIEWS.get(`views:${slug}`);
  const views = raw ? parseInt(raw, 10) || 0 : 0;
  return json({ slug, views });
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!env.BLOG_VIEWS) {
    return json({ error: 'KV binding BLOG_VIEWS not configured' }, 503);
  }

  if (!isAllowedOrigin(request)) {
    return json({ error: 'Forbidden origin' }, 403);
  }

  const slug = getValidatedSlug(request);
  if (!slug) {
    return json({ error: 'Invalid slug' }, 400);
  }

  const key = `views:${slug}`;
  const raw = await env.BLOG_VIEWS.get(key);
  let views = raw ? parseInt(raw, 10) || 0 : 0;

  const ua = request.headers.get('user-agent') ?? '';
  if (!BOT_PATTERN.test(ua)) {
    views += 1;
    await env.BLOG_VIEWS.put(key, String(views));
  }

  return json({ slug, views });
}
