globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, al as renderTemplate, a1 as createAstro, ae as renderComponent, aq as unescapeHTML } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { j as jsxRuntimeExports, t as throttle, a as generateArticleStructuredData, d as generateBreadcrumbStructuredData, b as buildCommentsStructuredData, $ as $$Base, s as serializeStructuredData } from '../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Breadcrumb, b as ContentContainer, R as Reaction, C as CommentEditor, a as $$CommentBlock, P as PageViewTracker } from '../../../chunks/PageViewTracker_DDWphovL.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { S as ShareButton } from '../../../chunks/ShareButton_BkkCYp0x.mjs';
import { r as reactExports } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { R as ResponsiveImage } from '../../../chunks/ResponsiveImage_DfoY88XY.mjs';
import { g as getTime } from '../../../chunks/getTime_CcDELrHl.mjs';
import { F as ForwardRef$1 } from '../../../chunks/EyeIcon_BCB1a6Md.mjs';

const ArticleText = {
  "zh": {
    "category": "分类",
    "topic": "主题",
    "published_at": "发布时间",
    "next": "下一页",
    "previous": "上一页",
    "latest_articles": "最新文章",
    "premium_content_locked": "该文章为会员专属内容，请登录后继续阅读。",
    "login_to_read": "前往登录"
  },
  "en": {
    "category": "Category",
    "topic": "Topic",
    "published_at": "Published At",
    "next": "Next",
    "previous": "Previous",
    "latest_articles": "Latest Articles",
    "premium_content_locked": "This article is for members only. Please sign in to continue reading.",
    "login_to_read": "Sign in to read"
  },
  "jp": {
    "category": "カテゴリ",
    "topic": "トピック",
    "published_at": "公開日",
    "next": "次の記事",
    "previous": "前の記事",
    "latest_articles": "最新記事",
    "premium_content_locked": "このコンテンツは会員限定です。ログインして続きを読んでください。",
    "login_to_read": "ログインして読む"
  }
};

function LockClosedIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(LockClosedIcon);

const $$Astro$2 = createAstro();
const $$NextAndPrev = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NextAndPrev;
  const { type, lang, prev, next } = Astro2.props;
  const label = getLanguageLabel(ArticleText, lang);
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between items-center flex-wrap border-y border-gray-200 py-8 mt-12"> ${prev && renderTemplate`<div class="flex flex-col gap-2"> <h3 class="font-medium text-violet-900 text-sm">${label.previous}</h3> <a${addAttribute(`/${lang}/${type}/${prev.slug}`, "href")}> <h4 class="font-medium text-zinc-800 text-lg">${prev.title}</h4> </a> </div>`} ${next && renderTemplate`<div class="flex flex-col gap-2 items-end text-right ml-auto"> <h3 class="font-medium text-violet-900 text-sm">${label.next}</h3> <a${addAttribute(`/${lang}/${type}/${next.slug}`, "href")}> <h4 class="font-medium text-zinc-800 text-lg">${next.title}</h4> </a> </div>`} </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/NextAndPrev.astro", void 0);

const $$Astro$1 = createAstro();
const $$Catalog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Catalog;
  const { content, url, title, lang } = Astro2.props;
  function isContentStructure(value) {
    return typeof value === "object" && value !== null && "content" in value && Array.isArray(value.content);
  }
  function getHeadingText(heading) {
    return heading.content?.filter((node) => node.type === "text").map((node) => node.text ?? "").join("") ?? "";
  }
  const headings = isContentStructure(content) ? content.content.filter(
    (node) => node.type === "heading" && [2, 3, 4].includes(node.attrs?.level) && node.attrs?.id !== void 0
  ) : [];
  return renderTemplate`${headings.length === 0 ? renderTemplate`${maybeRenderHead()}<div><p>没有目录</p></div>` : renderTemplate`<nav aria-label="Table of contents" class="md:w-full md:sticky md:top-24 md:h-fit space-y-6"><div class="flex flex-col gap-2 border-b border-gray-200 pb-6">${headings.map((heading) => {
    const id = String(heading.attrs?.id);
    const text = getHeadingText(heading);
    switch (heading.attrs?.level) {
      case 2:
        return renderTemplate`<a${addAttribute(`#${id}`, "href")} class="font-medium text-zinc-700 hover:text-violet-700">${text}</a>`;
      case 3:
        return renderTemplate`<a${addAttribute(`#${id}`, "href")} class="pl-2 text-zinc-600 hover:text-violet-700">${text}</a>`;
      case 4:
        return renderTemplate`<a${addAttribute(`#${id}`, "href")} class="pl-4 text-zinc-500 hover:text-violet-700">${text}</a>`;
      default:
        return null;
    }
  })}</div>${renderComponent($$result, "ShareButton", ShareButton, { "client:load": true, "url": url, "title": title, "lang": lang, "contentType": "article", "client:component-hydration": "load", "client:component-path": "~/components/ShareButton.tsx", "client:component-export": "default" })}</nav>`}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Catalog.astro", void 0);

function ReadingProcess() {
  const [scrollProgress, setScrollProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx * 100;
      setScrollProgress(scrolled);
    }, 50);
    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: "2px",
        backgroundColor: "#7c3aed",
        zIndex: 9999,
        transition: "width 0.1s ease-in-out"
      }
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { lang, slug } = Astro2.params;
  if (!lang || !slug) return Astro2.redirect("/zh");
  const supabase = Astro2.locals.supabase;
  const session = Astro2.locals.session;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const url = new URL(Astro2.request.url);
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")) : 20;
  const { data: article } = await supabase.from("article").select(
    `
    id, title, slug, subtitle, abstract, updated_at, published_at,
    is_premium, is_featured, is_top, topic, content_json, page_view, reactions,
    category (title, slug),
    cover (alt, height, width, storage_key),
    language!inner (lang),
    lang
  `
  ).eq("slug", slug).eq("language.lang", lang).single();
  if (!article) {
    return new Response(null, { status: 404, statusText: "Article not exists" });
  }
  const [
    previousArticleResult,
    nextArticleResult,
    commentsResult,
    commentCountResult,
    availableArticleResult
  ] = await Promise.all([
    supabase.from("article").select("title, slug, subtitle").eq("lang", article.lang).lt("published_at", article.published_at).order("published_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("article").select("title, slug").eq("lang", article.lang).gt("published_at", article.published_at).order("published_at", { ascending: true }).limit(1).maybeSingle(),
    supabase.from("comment").select(
      `id, user_id, name, website, content_text, created_at, is_anonymous,
       users (id, name, role, website),
       reply_to (id, content_text, is_anonymous, name, users (id, name))`
    ).eq("to_article", article.id).eq("is_blocked", false).eq("is_public", true).order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1),
    supabase.from("comment").select("id", { count: "exact" }).eq("to_article", article.id).eq("is_blocked", false).eq("is_public", true),
    supabase.from("article").select(`language!inner (lang)`).eq("slug", slug)
  ]);
  const previousArticle = previousArticleResult.data ?? null;
  const nextArticle = nextArticleResult.data ?? null;
  const comments = commentsResult.data ?? [];
  const count = commentCountResult.count ?? 0;
  const availableArticle = availableArticleResult.data ?? [];
  const totalPage = count ? Math.ceil(count / limit) : 1;
  const availableLangs = availableArticle.map((item) => item.language?.lang).filter((l) => Boolean(l));
  const currentUrl = `${baseUrl}/${lang}/article/${slug}`;
  const label = getLanguageLabel(ArticleText, lang);
  const isPremiumArticle = article.is_premium === true;
  const canViewContent = !isPremiumArticle || !!session;
  const breadcrumbPages = [
    { name: label.latest_articles, to: `articles/1`, current: false },
    { name: article.title, to: `article/${article.slug}`, current: true }
  ];
  const articleJsonLd = generateArticleStructuredData({
    article: {
      id: article.id,
      title: article.title || "",
      slug: article.slug || "",
      subtitle: article.subtitle,
      abstract: article.abstract,
      is_featured: article.is_featured,
      is_premium: article.is_premium,
      topic: article.topic,
      published_at: article.published_at || (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: article.updated_at,
      page_view: article.page_view || 0,
      cover: article.cover ? {
        alt: article.cover.alt,
        storage_key: article.cover.storage_key,
        width: article.cover.width || 0,
        height: article.cover.height || 0
      } : null,
      category: {
        title: article.category?.title || "",
        slug: article.category?.slug || ""
      },
      comments: [{ count }],
      content_json: article.content_json
    },
    imgPrefix,
    lang,
    url: currentUrl
  });
  const breadcrumbJsonLd = generateBreadcrumbStructuredData([
    { name: "Home", url: `${baseUrl}/${lang}` },
    { name: "Articles", url: `${baseUrl}/${lang}/articles/1` },
    { name: article.title || "Article", url: currentUrl }
  ]);
  const commentJsonLd = buildCommentsStructuredData(
    comments,
    baseUrl,
    currentUrl
  );
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${article.cover?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f"}`;
  const pageViewNodeId = `article-${article.id}-page-view`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": article.title, "description": article.abstract ?? article.subtitle ?? void 0, "ogTitle": article.title, "ogDescription": article.subtitle ?? void 0, "ogImage": ogImage, "ogType": "article", "pathWithoutLang": `article/${article.slug}`, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/article/rss.xml` }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="w-full max-w-6xl mx-auto p-4 md:py-8 mb-8 lg:mb-16"> ${renderComponent($$result2, "ReadingProcess", ReadingProcess, { "client:load": true, "client:component-hydration": "load", "client:component-path": "~/components/ReadingProcess.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "lang": lang, "pages": breadcrumbPages })} <div class="flex flex-col gap-8 md:gap-16"> <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-1 mt-4 gap-6 md:gap-8"> <header class="space-y-4"> <div class="flex gap-4 flex-wrap justify-start items-center"> <h3 class="text-sm text-violet-700 font-medium">${article.category.title}</h3> <time class="text-zinc-600 text-sm">${getTime(article.published_at, lang)}</time> </div> <div class="flex items-center gap-3 text-zinc-800"> <h1 class="font-medium leading-normal text-4xl lg:text-5xl">${article.title}</h1> </div> <h2 class="text-zinc-600 text-lg lg:text-xl">${article.subtitle}</h2> ${article.abstract && renderTemplate`<p class="p-4 rounded-md bg-zinc-100 text-zinc-600 leading-normal text-sm lg:text-base"> ${article.abstract} </p>`} ${article.topic && renderTemplate`<ol class="flex gap-2 flex-wrap"> ${article.topic.map((topic) => renderTemplate`<li class="text-sm text-zinc-600">#${topic}</li>`)} </ol>`} <div class="flex gap-1 items-center justify-start"> ${renderComponent($$result2, "EyeIcon", ForwardRef$1, { "className": "h-4 w-4 inline-block text-zinc-500" })} <p${addAttribute(pageViewNodeId, "id")} class="text-zinc-500 text-sm">${article.page_view}</p> </div> </header> ${article.cover && renderTemplate`${renderComponent($$result2, "ResponsiveImage", ResponsiveImage, { "client:load": true, "image": article.cover, "width": 960, "classList": "w-full rounded-md overflow-hiden object-cover aspect-3/2", "prefix": imgPrefix, "client:component-hydration": "load", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })}`} </div> <div${addAttribute(`relative grid grid-cols-1 ${canViewContent ? "md:grid-cols-3" : "md:grid-cols-2"} md:gap-24`, "class")}> <div class="col-span-1 md:col-span-2 selection:bg-violet-800/60 selection:text-white"> <div class="flex flex-col"> ${canViewContent ? article.content_json && renderTemplate`${renderComponent($$result2, "ContentContainer", ContentContainer, { "client:visible": true, "content": article.content_json, "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ContentContainer.tsx", "client:component-export": "default" })}` : renderTemplate`<div class="relative overflow-hidden rounded-lg border border-violet-200 bg-white/80 p-4 md:p-6"> <div class="pointer-events-none select-none blur-sm" aria-hidden="true"> <div class="space-y-3 text-left text-lg font-semibold leading-8 text-gray-300"> <p>
我们认为下面这些真理是不证自明的：人人生而平等，造物主赋予他们若干不可剥夺的权利，其中包括生命权、自由权和追求幸福的权利。为了保障这些权利，人们才在他们之间建立政府，而政府之正当权力，则来自被统治者的同意。
</p> </div> </div> <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg px-6 py-8 text-center"> ${renderComponent($$result2, "LockClosedIcon", ForwardRef, { "className": "h-10 w-10 text-violet-600" })} <p class="text-base text-zinc-600 md:text-lg">${label.premium_content_locked}</p> <a${addAttribute(`/${lang}/login`, "href")} class="inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"> ${label.login_to_read} </a> </div> </div>`} ${renderComponent($$result2, "Reaction", Reaction, { "client:load": true, "contentType": "article", "contentId": article.id, "reactions": article.reactions, "className": "mt-10", "pathname": Astro2.url.pathname, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "load", "client:component-path": "~/components/Reaction.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "NextAndPrev", $$NextAndPrev, { "type": "article", "lang": lang, "prev": previousArticle, "next": nextArticle })} <div class="mt-16 col-span-1 lg:col-span-2"> ${renderComponent($$result2, "CommentEditor", CommentEditor, { "client:load": true, "contentTable": "to_article", "contentId": article.id, "session": session, "lang": lang, "turnstileSiteKey": env.TURNSTILE_SITE_KEY, "endpoint": "/api/comments", "client:component-hydration": "load", "client:component-path": "~/components/CommentEditor.tsx", "client:component-export": "default" })} <div class="flex flex-col gap-4 divide-y divide-none"> ${comments.map((comment) => renderTemplate`${renderComponent($$result2, "CommentBlock", $$CommentBlock, { "comment": comment, "lang": lang })}`)} </div> <div class="py-8 flex justify-between"> ${page > 1 && renderTemplate`<a${addAttribute(`?page=${page - 1}&limit=${limit}#comment-editor`, "href")} class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.previous} </a>`} ${page < totalPage && renderTemplate`<a${addAttribute(`?page=${page + 1}&limit=${limit}#comment-editor`, "href")} class="ml-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.next} </a>`} </div> </div> </div> </div> ${canViewContent && article.content_json && renderTemplate`<aside class="hidden md:flex md:col-span-1 md:h-full"> ${renderComponent($$result2, "Catalog", $$Catalog, { "content": article.content_json, "url": currentUrl, "title": article.title, "lang": lang })} </aside>`} </div> </div> </div> ${renderComponent($$result2, "PageViewTracker", PageViewTracker, { "client:idle": true, "contentType": "article", "contentId": article.id, "countNodeId": pageViewNodeId, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "idle", "client:component-path": "~/components/PageViewTracker.tsx", "client:component-export": "default" })} `, "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>", ""])), unescapeHTML(serializeStructuredData(articleJsonLd)), unescapeHTML(serializeStructuredData(breadcrumbJsonLd)), commentJsonLd.map((c) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(serializeStructuredData(c))))) })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/article/[slug].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/article/[slug].astro";
const $$url = "/[lang]/article/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
