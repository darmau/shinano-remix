globalThis.process ??= {}; globalThis.process.env ??= {};
import { H as HomepageText } from '../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { r as renderTipTapToRssHtml, f as fallbackArticleContent, b as buildRssChannel } from '../../../chunks/rss_CcdjkeFh.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

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
  const { data: posts } = await supabase.from("article").select(
    `id, title, slug, subtitle, abstract, published_at, content_json,
       category (title), cover (alt, size, storage_key), language!inner (lang)`
  ).eq("language.lang", lang).eq("is_draft", false).order("published_at", { ascending: false }).limit(30);
  const entries = (posts ?? []).map((post) => {
    const summary = post.abstract ?? post.subtitle ?? "";
    const fullContent = renderTipTapToRssHtml(post.content_json);
    const cover = post.cover;
    return {
      title: post.title ?? "",
      description: post.subtitle ?? summary,
      pubDate: post.published_at,
      link: `${baseUrl}/${lang}/article/${post.slug}`,
      guid: post.id,
      author: "李大毛",
      category: post.category?.title ?? label.article,
      content: fullContent || fallbackArticleContent(summary),
      enclosure: cover ? {
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
        type: "image/jpeg",
        length: String(cover.size ?? 0)
      } : void 0
    };
  });
  const feed = buildRssChannel({
    title: `${label.title} - ${label.article}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 文章",
    entries,
    followChallenge: { feedId: "42864851888759808", userId: "46488520035984384" }
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
