globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, l as Fragment } from '../../../../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../../../chunks/Subnav_Ba7eeqYw.mjs';
import { $ as $$NormalArticleCard } from '../../../../../chunks/NormalArticleCard_A7U6DU_Q.mjs';
import { $ as $$Pagination } from '../../../../../chunks/Pagination_DgOK-H5Q.mjs';
import { A as ArticlesText, $ as $$ArticleListSidebar } from '../../../../../chunks/ArticleListSidebar_cFdu7F9W.mjs';
import { R as ResponsiveImage } from '../../../../../chunks/ResponsiveImage_DfoY88XY.mjs';
import { n as normalizeArticles, c as normalizeYearCounts, a as normalizeCategoryCounts, b as normalizeCategorySummary } from '../../../../../chunks/articles_BoEWakG5.mjs';
import { H as HomepageText } from '../../../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { lang, category: categorySlug, page: pageParam } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  if (!categorySlug) {
    return new Response(null, { status: 404 });
  }
  if (!pageParam || isNaN(Number(pageParam))) {
    return new Response(null, { status: 404 });
  }
  const page = Number(pageParam);
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const [articleRowsResult, articleCountResult, countByYearResult, countByCategoryResult, categoryResult] = await Promise.all([
    supabase.from("article").select(
      `
        id, title, slug, subtitle, abstract, is_featured, is_premium, topic,
        published_at, page_view,
        category!inner (title, slug),
        language!inner (lang),
        comments:comment(count)
        `
    ).eq("language.lang", lang).eq("category.slug", categorySlug).eq("is_draft", false).limit(12).order("published_at", { ascending: false }).range((page - 1) * 12, page * 12 - 1),
    supabase.from("article").select(`id, language!inner (lang), category!inner (slug)`, { count: "exact", head: true }).eq("is_draft", false).eq("category.slug", categorySlug).eq("language.lang", lang),
    supabase.rpc("get_article_count_by_year", { lang_name: lang }),
    supabase.rpc("get_article_count_by_category", { lang_name: lang }),
    supabase.from("category").select(
      `
        title, slug, description,
        cover (alt, storage_key, width, height),
        language!inner (lang)
        `
    ).eq("slug", categorySlug).eq("type", "article").eq("language.lang", lang).maybeSingle()
  ]);
  const articles = normalizeArticles(articleRowsResult.data);
  const articleCount = articleCountResult.count ?? 0;
  const countByYear = normalizeYearCounts(countByYearResult.data);
  const countByCategory = normalizeCategoryCounts(countByCategoryResult.data);
  const category = normalizeCategorySummary(categoryResult.data);
  const homeLabel = getLanguageLabel(HomepageText, lang);
  const label = getLanguageLabel(ArticlesText, lang);
  const availableLangs = [lang];
  const path = `/${lang}/articles/category/${categorySlug}`;
  const ogImageStorage = category?.cover?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${ogImageStorage}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": homeLabel.category_article_title, "description": homeLabel.category_article_description, "ogTitle": homeLabel.category_article_title, "ogDescription": homeLabel.category_article_description, "ogImage": ogImage, "ogType": "article", "pathWithoutLang": `articles/category/${categorySlug}/${page}`, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/article/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "article" })} ${articles.length === 0 || category === null ? renderTemplate`${maybeRenderHead()}<header class="w-full max-w-6xl mx-auto p-4 md:py-8 mb-8 lg:mb-16"> <h1 class="text-3xl font-black text-zinc-700 text-center my-16">${label.no_articles}</h1> </header>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <header class="relative w-full max-w-6xl mx-auto px-4 my-8 space-y-4"> <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center space-y-4"> <h1 class="font-medium text-3xl md:text-5xl shadow-2x">${category.title}</h1> ${category.description && renderTemplate`<p>${category.description}</p>`} </div> ${category.cover && renderTemplate`<div class="relative overflow-hidden rounded-2xl w-full aspect-3/2 md:aspect-3/1"> <div class="absolute inset-0 bg-linear-to-b from-transparent to-zinc-800/60"></div> ${renderComponent($$result3, "ResponsiveImage", ResponsiveImage, { "client:visible": true, "image": category.cover, "width": 640, "classList": "w-full h-full object-cover", "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })} </div>`} </header> <div class="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8 md:py-8 mb-8 lg:mb-16 md:grid md:grid-cols-3"> <div class="grow flex flex-col gap-8 md:gap-12 md:col-span-2"> ${articles.map((article) => renderTemplate`${renderComponent($$result3, "NormalArticleCard", $$NormalArticleCard, { "article": article, "lang": lang, "showAbstract": true })}`)} ${renderComponent($$result3, "Pagination", $$Pagination, { "count": articleCount, "limit": 12, "page": page, "path": path, "lang": lang })} </div> ${renderComponent($$result3, "ArticleListSidebar", $$ArticleListSidebar, { "lang": lang, "countByYear": countByYear, "countByCategory": countByCategory, "yearLabel": label.year, "categoryLabel": label.category })} </div> ` })}`}` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/category/[category]/[page].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/category/[category]/[page].astro";
const $$url = "/[lang]/articles/category/[category]/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
