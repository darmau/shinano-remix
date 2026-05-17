globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, ae as renderComponent, al as renderTemplate, a1 as createAstro, l as Fragment } from '../../../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../../chunks/Subnav_Ba7eeqYw.mjs';
import { g as getTime } from '../../../../chunks/getTime_CcDELrHl.mjs';
import { R as ResponsiveImage } from '../../../../chunks/ResponsiveImage_DfoY88XY.mjs';
import { F as ForwardRef, n as normalizeArticles } from '../../../../chunks/articles_BoEWakG5.mjs';
import { F as ForwardRef$1 } from '../../../../chunks/ChatBubbleOvalLeftIcon_DNbDi8Qu.mjs';
import { $ as $$Pagination } from '../../../../chunks/Pagination_DgOK-H5Q.mjs';
import { H as HomepageText } from '../../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro$1 = createAstro();
const $$FeaturedArticle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedArticle;
  const { article, lang, imgPrefix } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="group"> <a${addAttribute(`/${lang}/article/${article.slug}`, "href")}> ${article.cover && renderTemplate`${renderComponent($$result, "ResponsiveImage", ResponsiveImage, { "client:visible": true, "image": article.cover, "width": 480, "classList": "aspect-5/3 sm:aspect-3/1 md:aspect-3/2 w-full rounded-md overflow-hidden mb-4", "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })}`} <div class="flex flex-col gap-3"> <div class="text-zinc-400 text-sm"> <span class="text-violet-700 font-medium">${article.category.title}</span>
&nbsp;·&nbsp;
<span>${getTime(article.published_at, lang)}</span> </div> <h3 class="font-medium text-zinc-800 group-hover:text-violet-900 text-xl lg:text-2xl"> ${article.title} </h3> <h4 class="text-base text-zinc-500 leading-7">${article.subtitle}</h4> ${article.topic && renderTemplate`<div class="flex flex-wrap gap-2"> ${article.topic.map((topic) => renderTemplate`<span class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600"> ${topic} </span>`)} </div>`} <div class="flex gap-3 justify-start items-center"> <div class="flex gap-1 items-center"> ${renderComponent($$result, "EyeIcon", ForwardRef, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.page_view}</span> </div> <div class="flex gap-1 items-center"> ${renderComponent($$result, "ChatBubbleOvalLeftIcon", ForwardRef$1, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.comments[0].count}</span> </div> </div> </div> </a> </article>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/FeaturedArticle.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { lang, page: pageParam } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  if (!pageParam || isNaN(Number(pageParam))) {
    return new Response(null, { status: 404 });
  }
  const page = Number(pageParam);
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const [articleRowsResult, articleCountResult] = await Promise.all([
    supabase.from("article").select(
      `
      id, title, slug, subtitle, abstract, is_featured, is_premium, topic,
      published_at, page_view,
      category (title, slug),
      cover (alt, storage_key, width, height),
      language!inner (lang),
      comments:comment(count)
      `
    ).eq("language.lang", lang).limit(12).range((page - 1) * 12, page * 12 - 1).filter("is_draft", "eq", false).filter("is_featured", "eq", true).order("published_at", { ascending: false }),
    supabase.from("article").select(`id, language!inner (lang)`, { count: "exact", head: true }).filter("is_draft", "eq", false).filter("is_featured", "eq", true).eq("language.lang", lang)
  ]);
  const articles = normalizeArticles(articleRowsResult.data);
  const articleCount = articleCountResult.count ?? 0;
  const label = getLanguageLabel(HomepageText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const path = `/${lang}/articles/featured`;
  const ogImageStorage = articles[0]?.cover?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${ogImageStorage}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.featured_article_title, "description": label.featured_article_description, "ogTitle": label.featured_article_title, "ogDescription": label.featured_article_description, "ogImage": ogImage, "ogType": "article", "pathWithoutLang": "articles/featured", "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/article/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "article" })} ${articles.length === 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full max-w-8xl mx-auto px-4 my-16 text-center text-zinc-500">
No articles found
</div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h1 class="sr-only">Featured Articles</h1> <div class="w-full max-w-8xl mx-auto p-4 md:py-8 mb-8 lg:mb-16 space-y-8 lg:space-y-12"> <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> ${articles.map((article) => renderTemplate`${renderComponent($$result3, "FeaturedArticle", $$FeaturedArticle, { "article": article, "lang": lang, "imgPrefix": imgPrefix })}`)} </div> ${renderComponent($$result3, "Pagination", $$Pagination, { "count": articleCount, "limit": 12, "page": page, "path": path, "lang": lang })} </div> ` })}`}` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/featured/[page].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/featured/[page].astro";
const $$url = "/[lang]/articles/featured/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
