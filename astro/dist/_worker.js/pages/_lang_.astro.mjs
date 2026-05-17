globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, ae as renderComponent, al as renderTemplate, a1 as createAstro, l as Fragment } from '../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../chunks/Subnav_Ba7eeqYw.mjs';
import { g as getTime } from '../chunks/getTime_CcDELrHl.mjs';
import { R as ResponsiveImage } from '../chunks/ResponsiveImage_DfoY88XY.mjs';
import { F as ForwardRef, $ as $$NormalArticleCard } from '../chunks/NormalArticleCard_A7U6DU_Q.mjs';
import { F as ForwardRef$1, n as normalizeArticles } from '../chunks/articles_BoEWakG5.mjs';
import { F as ForwardRef$2 } from '../chunks/ChatBubbleOvalLeftIcon_DNbDi8Qu.mjs';
import { H as HomepageText } from '../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro$1 = createAstro();
const $$HomeTopArticle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HomeTopArticle;
  const { article, isTop, lang, imgPrefix, classList } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(classList, "class")}> <a${addAttribute(`/${lang}/article/${article.slug}`, "href")}${addAttribute([
    "gap-4 flex flex-col lg:gap-6",
    isTop ? "lg:flex-col" : "lg:flex-row"
  ], "class:list")}> ${article.cover && (isTop ? renderTemplate`${renderComponent($$result, "ResponsiveImage", ResponsiveImage, { "client:visible": true, "image": article.cover, "width": 640, "classList": "aspect-5/3 sm:aspect-3/1 w-full rounded-md overflow-hidden", "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })}` : renderTemplate`${renderComponent($$result, "ResponsiveImage", ResponsiveImage, { "client:visible": true, "image": article.cover, "width": 640, "classList": "aspect-5/3 sm:aspect-3/1 w-full rounded-md overflow-hidden md:aspect-3/2 lg:grow-0 lg:max-w-48", "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })}`)} <div class="flex flex-col gap-3 sm:grow"> <div class="text-zinc-400 text-sm"> <span class="text-violet-700 font-medium">${article.category.title}</span>
&nbsp;·&nbsp;
<span>${getTime(article.published_at, lang)}</span> </div> <div class="flex items-center gap-2 text-zinc-800 group-hover:text-violet-900"> ${article.is_premium && renderTemplate`${renderComponent($$result, "LockClosedIcon", ForwardRef, { "className": `h-5 w-5 text-violet-600 ${isTop ? "" : "mt-0.5"}` })}`} <h2${addAttribute(["font-medium", isTop ? "text-3xl" : "text-2xl"], "class:list")}>${article.title}</h2> </div> <h3 class="text-base text-zinc-500 leading-7">${article.subtitle}</h3> ${article.topic && renderTemplate`<div class="flex flex-wrap gap-2"> ${article.topic.map((topic) => renderTemplate`<span class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600"> ${topic} </span>`)} </div>`} ${isTop && article.abstract && renderTemplate`<p class="text-sm bg-zinc-50 p-2 rounded-md text-zinc-500 mt-2 lg:p-4"> ${article.abstract} </p>`} <div class="flex gap-3 justify-start items-center"> <div class="flex gap-1 items-center"> ${renderComponent($$result, "EyeIcon", ForwardRef$1, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.page_view}</span> </div> <div class="flex gap-1 items-center"> ${renderComponent($$result, "ChatBubbleOvalLeftIcon", ForwardRef$2, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.comments[0].count}</span> </div> </div> </div> </a> </article>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/HomeTopArticle.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const { data: articleRows } = await supabase.from("article").select(
    `
    id,
    title,
    slug,
    subtitle,
    abstract,
    is_featured,
    is_premium,
    topic,
    published_at,
    page_view,
    cover (alt, storage_key, width, height),
    category (title, slug),
    language!inner (lang),
    comments:comment(count)
    `
  ).eq("language.lang", lang).filter("is_draft", "eq", false).limit(16).order("is_top", { ascending: false }).order("published_at", { ascending: false });
  const articles = normalizeArticles(articleRows);
  const label = getLanguageLabel(HomepageText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/a2b148a3-5799-4be0-a8d4-907f9355f20f`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.title, "description": label.description, "ogTitle": label.title, "ogDescription": label.description, "ogImage": ogImage, "ogType": "website", "pathWithoutLang": "", "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/rss.xml` }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "article" })} ${articles.length === 0 ? renderTemplate`${maybeRenderHead()}<div class="w-full max-w-8xl mx-auto px-4 my-16 text-center text-zinc-500">
No articles found
</div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h1 class="sr-only">${label.title}</h1> <div class="w-full max-w-8xl mx-auto px-4 space-y-8 lg:space-y-12 mb-8 lg:mb-16"> <div class="flex flex-col gap-8 mt-4 border-b border-gray-200 pb-8 lg:pb-12 lg:mt-8 lg:grid lg:grid-cols-2"> ${renderComponent($$result3, "HomeTopArticle", $$HomeTopArticle, { "isTop": true, "article": articles[0], "lang": lang, "imgPrefix": imgPrefix, "classList": "group" })} <div class="flex flex-col gap-8 md:grid md:grid-cols-3 lg:flex lg:flex-col"> ${articles.slice(1, 4).map((article) => renderTemplate`${renderComponent($$result3, "HomeTopArticle", $$HomeTopArticle, { "isTop": false, "article": article, "lang": lang, "imgPrefix": imgPrefix, "classList": "group" })}`)} </div> </div> <div class="space-y-8"> <h2 class="font-medium text-lg text-zinc-700">${label.recent_article}</h2> <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"> ${articles.slice(4).map((article) => renderTemplate`${renderComponent($$result3, "NormalArticleCard", $$NormalArticleCard, { "article": article, "lang": lang, "showAbstract": false })}`)} </div> </div> </div> ` })}`}`, "head": async ($$result2) => renderTemplate`<link rel="sitemap" type="application/xml"${addAttribute(`${baseUrl}/sitemap-index.xml`, "href")} title="Sitemap">` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/index.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
