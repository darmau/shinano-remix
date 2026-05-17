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
  const { BASE_URL: baseUrl, IMG_PREFIX } = getPublicEnv(ctx.locals);
  const imgPrefix = IMG_PREFIX || "https://img.darmau.co";
  const label = getLanguageLabel(HomepageText, lang);
  const baseLink = `${baseUrl}/${lang}`;

  const [articleResult, photoResult, thoughtResult] = await Promise.all([
    supabase
      .from("article")
      .select(
        `id, title, slug, subtitle, abstract, published_at,
         category (title), cover (alt, size, storage_key), language!inner (lang)`,
      )
      .eq("language.lang", lang)
      .eq("is_draft", false)
      .order("published_at", { ascending: false })
      .limit(30),
    supabase
      .from("photo")
      .select(
        `id, title, slug, abstract, content_text, published_at,
         category (title), cover (alt, size, storage_key), language!inner (lang)`,
      )
      .eq("language.lang", lang)
      .eq("is_draft", false)
      .order("published_at", { ascending: false })
      .limit(30),
    supabase
      .from("thought")
      .select(`id, slug, content_text, created_at`)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const articleEntries: RssEntry[] = (articleResult.data ?? []).map((article) => {
    const summary = article.abstract ?? article.subtitle ?? "";
    const slug = article.slug ?? article.id;
    const cover = article.cover as { storage_key: string; size?: number } | null;
    return {
      title: article.title ?? "",
      description: summary || article.title || "",
      pubDate: article.published_at,
      link: `${baseLink}/article/${slug}`,
      guid: `article-${article.id}`,
      category: (article.category as { title?: string } | null)?.title ?? label.article,
      content: summary ? `<p>${summary}</p>` : "",
      author: "李大毛",
      enclosure: cover
        ? {
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
            type: "image/jpeg",
            length: String(cover.size ?? 0),
          }
        : undefined,
    };
  });

  const photoEntries: RssEntry[] = (photoResult.data ?? []).map((photo) => {
    const baseDescription = photo.abstract ?? photo.title ?? "";
    const slug = photo.slug ?? photo.id;
    const cover = photo.cover as { storage_key: string; size?: number; alt?: string | null } | null;
    const coverHtml = cover
      ? `<p><img src="${imgPrefix}/cdn-cgi/image/format=jpeg,width=1280/${cover.storage_key}" alt="${cover.alt ?? photo.title ?? ""}" /></p>`
      : "";
    const body = [
      baseDescription ? `<p>${baseDescription}</p>` : "",
      coverHtml,
      photo.content_text ? `<div>${photo.content_text}</div>` : "",
    ]
      .filter(Boolean)
      .join("");
    return {
      title: photo.title ?? label.photography,
      description: baseDescription || label.photography,
      pubDate: photo.published_at,
      link: `${baseLink}/album/${slug}`,
      guid: `photo-${photo.id}`,
      category: (photo.category as { title?: string } | null)?.title ?? label.photography,
      content: body,
      author: "李大毛",
      enclosure: cover
        ? {
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
            type: "image/jpeg",
            length: String(cover.size ?? 0),
          }
        : undefined,
    };
  });

  const thoughtEntries: RssEntry[] = (thoughtResult.data ?? []).map((thought) => {
    const title = thought.created_at ? getTime(thought.created_at, lang) : label.thought;
    const slug = thought.slug ?? thought.id;
    return {
      title,
      description: thought.content_text ?? "",
      pubDate: thought.created_at,
      link: `${baseLink}/thought/${slug}`,
      guid: `thought-${thought.id}`,
      category: label.thought,
      content: thought.content_text ? `<p>${thought.content_text}</p>` : "",
      author: "李大毛",
    };
  });

  const entries = [...articleEntries, ...photoEntries, ...thoughtEntries]
    .sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 60);

  const feed = buildRssChannel({
    title: `${label.title} - RSS`,
    description: label.description,
    language: lang,
    link: baseLink,
    imageTitle: "积薪",
    entries,
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};
