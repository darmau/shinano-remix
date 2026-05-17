globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, l as Fragment } from '../../../../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../../../chunks/Subnav_Ba7eeqYw.mjs';
import { $ as $$NormalArticleCard } from '../../../../../chunks/NormalArticleCard_A7U6DU_Q.mjs';
import { $ as $$Pagination } from '../../../../../chunks/Pagination_DgOK-H5Q.mjs';
import { A as ArticlesText, $ as $$ArticleListSidebar } from '../../../../../chunks/ArticleListSidebar_cFdu7F9W.mjs';
import { n as normalizeArticles, c as normalizeYearCounts, a as normalizeCategoryCounts } from '../../../../../chunks/articles_BoEWakG5.mjs';
import { H as HomepageText } from '../../../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { lang, year: yearParam, page: pageParam } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  if (!pageParam || isNaN(Number(pageParam))) {
    return new Response(null, { status: 404 });
  }
  if (!yearParam || isNaN(Number(yearParam))) {
    return new Response(null, { status: 404 });
  }
  const page = Number(pageParam);
  const year = Number(yearParam);
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const [articleRowsResult, articleCountResult, countByYearResult, countByCategoryResult] = await Promise.all([
    supabase.from("article").select(
      `
        id, title, slug, subtitle, abstract, is_featured, is_premium, topic,
        page_view, published_at,
        category (title, slug),
        language!inner (lang),
        comments:comment(count)
        `
    ).eq("language.lang", lang).eq("is_draft", false).limit(12).gte("published_at", `${year}-01-01T00:00:00Z`).lte("published_at", `${year}-12-31T23:59:59Z`).order("published_at", { ascending: false }).range((page - 1) * 12, page * 12 - 1),
    supabase.from("article").select(`id, language!inner (lang)`, { count: "exact", head: true }).eq("is_draft", false).eq("language.lang", lang).gte("published_at", `${year}-01-01T00:00:00Z`).lte("published_at", `${year}-12-31T23:59:59Z`),
    supabase.rpc("get_article_count_by_year", { lang_name: lang }),
    supabase.rpc("get_article_count_by_category", { lang_name: lang })
  ]);
  const articles = normalizeArticles(articleRowsResult.data);
  const articleCount = articleCountResult.count ?? 0;
  const countByYear = normalizeYearCounts(countByYearResult.data);
  const countByCategory = normalizeCategoryCounts(countByCategoryResult.data);
  const homeLabel = getLanguageLabel(HomepageText, lang);
  const label = getLanguageLabel(ArticlesText, lang);
  const availableLangs = [lang];
  const path = `/${lang}/articles/archive/${year}`;
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/a2b148a3-5799-4be0-a8d4-907f9355f20f`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": `${year} - ${homeLabel.archive_article_title}`, "description": homeLabel.archive_article_description, "ogTitle": `${year} - ${homeLabel.archive_article_title}`, "ogDescription": homeLabel.archive_article_description, "ogImage": ogImage, "ogType": "article", "pathWithoutLang": `articles/archive/${year}/${page}`, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/article/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "article" })} ${articles.length === 0 ? renderTemplate`${maybeRenderHead()}<header class="w-full max-w-6xl mx-auto p-4 md:py-8 mb-8 lg:mb-16"> <h1 class="text-3xl font-black text-zinc-700 text-center my-16">${label.no_articles}</h1> </header>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <header class="w-full max-w-6xl mx-auto px-4 py-8 my-8 space-y-4"> <p class="font-medium text-violet-700 text-sm">${label.published_at}</p> <h1 class="font-bold text-3xl md:text-4xl">${year}</h1> </header> <div class="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8 md:py-8 mb-8 lg:mb-16 md:grid md:grid-cols-3"> <div class="grow flex flex-col gap-8 md:gap-12 md:col-span-2"> ${articles.map((article) => renderTemplate`${renderComponent($$result3, "NormalArticleCard", $$NormalArticleCard, { "article": article, "lang": lang, "showAbstract": true })}`)} ${renderComponent($$result3, "Pagination", $$Pagination, { "count": articleCount, "limit": 12, "page": page, "path": path, "lang": lang })} </div> ${renderComponent($$result3, "ArticleListSidebar", $$ArticleListSidebar, { "lang": lang, "countByYear": countByYear, "countByCategory": countByCategory, "yearLabel": label.year, "categoryLabel": label.category })} </div> ` })}`}` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/archive/[year]/[page].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/articles/archive/[year]/[page].astro";
const $$url = "/[lang]/articles/archive/[year]/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
