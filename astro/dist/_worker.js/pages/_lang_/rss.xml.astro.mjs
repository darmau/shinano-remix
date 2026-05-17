globalThis.process ??= {}; globalThis.process.env ??= {};
import { H as HomepageText } from '../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { g as getTime } from '../../chunks/getTime_CcDELrHl.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';
import { b as buildRssChannel } from '../../chunks/rss_CcdjkeFh.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const GET = async (ctx) => {
  const lang = ctx.params.lang;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX ?? "https://img.darmau.co";
  const label = getLanguageLabel(HomepageText, lang);
  const baseLink = `${baseUrl}/${lang}`;
  const [articleResult, photoResult, thoughtResult] = await Promise.all([
    supabase.from("article").select(
      `id, title, slug, subtitle, abstract, published_at,
         category (title), cover (alt, size, storage_key), language!inner (lang)`
    ).eq("language.lang", lang).eq("is_draft", false).order("published_at", { ascending: false }).limit(30),
    supabase.from("photo").select(
      `id, title, slug, abstract, content_text, published_at,
         category (title), cover (alt, size, storage_key), language!inner (lang)`
    ).eq("language.lang", lang).eq("is_draft", false).order("published_at", { ascending: false }).limit(30),
    supabase.from("thought").select(`id, slug, content_text, created_at`).order("created_at", { ascending: false }).limit(50)
  ]);
  const articleEntries = (articleResult.data ?? []).map((article) => {
    const summary = article.abstract ?? article.subtitle ?? "";
    const slug = article.slug ?? article.id;
    const cover = article.cover;
    return {
      title: article.title ?? "",
      description: summary || article.title || "",
      pubDate: article.published_at,
      link: `${baseLink}/article/${slug}`,
      guid: `article-${article.id}`,
      category: article.category?.title ?? label.article,
      content: summary ? `<p>${summary}</p>` : "",
      author: "李大毛",
      enclosure: cover ? {
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
        type: "image/jpeg",
        length: String(cover.size ?? 0)
      } : void 0
    };
  });
  const photoEntries = (photoResult.data ?? []).map((photo) => {
    const baseDescription = photo.abstract ?? photo.title ?? "";
    const slug = photo.slug ?? photo.id;
    const cover = photo.cover;
    const coverHtml = cover ? `<p><img src="${imgPrefix}/cdn-cgi/image/format=jpeg,width=1280/${cover.storage_key}" alt="${cover.alt ?? photo.title ?? ""}" /></p>` : "";
    const body = [
      baseDescription ? `<p>${baseDescription}</p>` : "",
      coverHtml,
      photo.content_text ? `<div>${photo.content_text}</div>` : ""
    ].filter(Boolean).join("");
    return {
      title: photo.title ?? label.photography,
      description: baseDescription || label.photography,
      pubDate: photo.published_at,
      link: `${baseLink}/album/${slug}`,
      guid: `photo-${photo.id}`,
      category: photo.category?.title ?? label.photography,
      content: body,
      author: "李大毛",
      enclosure: cover ? {
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
        type: "image/jpeg",
        length: String(cover.size ?? 0)
      } : void 0
    };
  });
  const thoughtEntries = (thoughtResult.data ?? []).map((thought) => {
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
      author: "李大毛"
    };
  });
  const entries = [...articleEntries, ...photoEntries, ...thoughtEntries].sort((a, b) => {
    const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 60);
  const feed = buildRssChannel({
    title: `${label.title} - RSS`,
    description: label.description,
    language: lang,
    link: baseLink,
    imageTitle: "积薪",
    entries
  });
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
