import type { APIRoute } from "astro";
import { HomepageText } from "~/locales";
import getLanguageLabel from "~/lib/i18n/getLanguageLabel";
import { LOCALES } from "~/lib/i18n/getLang";
import {
  buildRssChannel,
  fallbackArticleContent,
  renderTipTapToRssHtml,
  type RssEntry,
} from "~/lib/feeds/rss";
import type { Json } from "~/types/supabase";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
  const lang = ctx.params.lang;
  if (!lang || !(LOCALES as readonly string[]).includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }

  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX ?? "https://img.darmau.co";
  const label = getLanguageLabel(HomepageText, lang);

  const { data: posts } = await supabase
    .from("article")
    .select(
      `id, title, slug, subtitle, abstract, published_at, content_json,
       category (title), cover (alt, size, storage_key), language!inner (lang)`,
    )
    .eq("language.lang", lang)
    .eq("is_draft", false)
    .order("published_at", { ascending: false })
    .limit(30);

  const entries: RssEntry[] = (posts ?? []).map((post) => {
    const summary = post.abstract ?? post.subtitle ?? "";
    const fullContent = renderTipTapToRssHtml(post.content_json as Json | null | undefined);
    const cover = post.cover as { storage_key: string; size?: number } | null;
    return {
      title: post.title ?? "",
      description: post.subtitle ?? summary,
      pubDate: post.published_at,
      link: `${baseUrl}/${lang}/article/${post.slug}`,
      guid: post.id,
      author: "李大毛",
      category: (post.category as { title?: string } | null)?.title ?? label.article,
      content: fullContent || fallbackArticleContent(summary),
      enclosure: cover
        ? {
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
            type: "image/jpeg",
            length: String(cover.size ?? 0),
          }
        : undefined,
    };
  });

  const feed = buildRssChannel({
    title: `${label.title} - ${label.article}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 文章",
    entries,
    followChallenge: { feedId: "42864851888759808", userId: "46488520035984384" },
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};
