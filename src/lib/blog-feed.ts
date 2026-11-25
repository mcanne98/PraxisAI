/**
 * Optional build-time ingestion of the founder's blog feed.
 *
 * Posts are LINKED OUT, never republished: the blog remains the canonical
 * source, so there is no duplicate-content risk. If BLOG_FEED_URL is not set,
 * or the feed is unreachable, the Insights page shows a static link instead.
 */

export type BlogPost = {
  title: string;
  url: string;
  published?: string;
  summary?: string;
};

const ALLOWED_HOST = "blog.cedricanne.com";

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)));
}

function stripTags(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decodeEntities(m[1]).trim() : undefined;
}

function safeUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" || u.hostname !== ALLOWED_HOST) return undefined;
    return u.toString();
  } catch {
    return undefined;
  }
}

/** Parses RSS 2.0 or Atom XML into a list of posts. Exported for unit tests. */
export function parseFeed(xml: string, limit = 6): BlogPost[] {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  const posts: BlogPost[] = [];
  for (const block of items) {
    const title = tag(block, "title");
    const atomHref = block.match(/<link[^>]*href="([^"]+)"/i)?.[1];
    const url = safeUrl(tag(block, "link") || atomHref);
    if (!title || !url) continue;
    const date = tag(block, "pubDate") ?? tag(block, "published") ?? tag(block, "updated");
    const parsed = date ? new Date(date) : undefined;
    const rawSummary = tag(block, "description") ?? tag(block, "summary");
    const summary = rawSummary ? stripTags(decodeEntities(rawSummary)).slice(0, 220) : undefined;
    posts.push({
      title: stripTags(title),
      url,
      published: parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : undefined,
      summary,
    });
    if (posts.length >= limit) break;
  }
  return posts;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const feedUrl = process.env.BLOG_FEED_URL;
  if (!feedUrl || !safeUrl(feedUrl)) return [];
  try {
    // Fetched once at build time; the list refreshes on the next deploy.
    const res = await fetch(feedUrl, { cache: "force-cache", signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    return parseFeed(await res.text());
  } catch {
    return [];
  }
}
