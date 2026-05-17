import type { APIRoute } from "astro";
import { HomepageText } from "~/locales";
import getLanguageLabel from "~/lib/i18n/getLanguageLabel";
import getTime from "~/lib/i18n/getTime";
import { LOCALES } from "~/lib/i18n/getLang";
import { buildRssChannel, type RssEntry } from "~/lib/feeds/rss";
import { getPublicEnv } from "~/lib/env";
import { createSupabaseBuild } from "~/lib/supabase/build";

export const prerender = true;

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async (ctx) => {
  const lang = ctx.params.lang!;
  const supabase = createSupabaseBuild();
  const baseUrl = getPublicEnv(ctx.locals).BASE_URL;
  const label = getLanguageLabel(HomepageText, lang);

  const { data: posts } = await supabase
    .from("thought")
    .select(`id, slug, content_text, created_at`)
    .order("created_at", { ascending: false })
    .limit(50);

  const entries: RssEntry[] = (posts ?? []).map((post) => ({
    title: post.created_at ? getTime(post.created_at, lang) : label.thought,
    description: post.content_text ?? "",
    pubDate: post.created_at,
    link: `${baseUrl}/${lang}/thought/${post.slug}`,
    guid: post.id,
    author: "李大毛",
    category: label.thought,
  }));

  const feed = buildRssChannel({
    title: `${label.title} - ${label.thought}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 想法",
    entries,
    followChallenge: { feedId: "46420994967031808", userId: "46488520035984384" },
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};
