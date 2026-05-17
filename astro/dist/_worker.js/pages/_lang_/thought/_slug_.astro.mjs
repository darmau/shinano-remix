globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, aq as unescapeHTML, ac as maybeRenderHead, _ as addAttribute } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { f as generateThoughtStructuredData, d as generateBreadcrumbStructuredData, b as buildCommentsStructuredData, $ as $$Base, s as serializeStructuredData } from '../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Breadcrumb, b as ContentContainer, R as Reaction, C as CommentEditor, a as $$CommentBlock, P as PageViewTracker } from '../../../chunks/PageViewTracker_DDWphovL.mjs';
import { R as ResponsiveImage } from '../../../chunks/ResponsiveImage_DfoY88XY.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { g as getTime } from '../../../chunks/getTime_CcDELrHl.mjs';
import { T as ThoughtText } from '../../../chunks/thought_npWjrI48.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { F as ForwardRef } from '../../../chunks/EyeIcon_BCB1a6Md.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

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
  if (!lang || !LOCALES.includes(lang) || !slug) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }
  const supabase = Astro2.locals.supabase;
  const session = Astro2.locals.session;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const url = new URL(Astro2.request.url);
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")) : 20;
  const { data: thoughtData } = await supabase.from("thought").select(`id, content_json, content_text, slug, page_view, reactions, created_at`).eq("slug", slug).single();
  if (!thoughtData) {
    return new Response(null, { status: 404, statusText: "Thought not exists" });
  }
  const [thoughtImagesResult, commentsResult, commentCountResult] = await Promise.all([
    supabase.from("thought_image").select(`order, image (id, alt, storage_key, width, height, caption)`).eq("thought_id", thoughtData.id).order("order", { ascending: true }),
    supabase.from("comment").select(
      `id, user_id, name, website, content_text, created_at, is_anonymous,
       users (id, name, role, website),
       reply_to (id, content_text, is_anonymous, name, users (id, name))`
    ).eq("to_thought", thoughtData.id).eq("is_blocked", false).eq("is_public", true).order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1),
    supabase.from("comment").select("id", { count: "exact" }).eq("to_thought", thoughtData.id).eq("is_blocked", false).eq("is_public", true)
  ]);
  const thoughtImages = thoughtImagesResult.data ?? [];
  const comments = commentsResult.data ?? [];
  const count = commentCountResult.count ?? 0;
  const totalPage = count ? Math.ceil(count / limit) : 1;
  const label = getLanguageLabel(ThoughtText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const currentUrl = `${baseUrl}/${lang}/thought/${slug}`;
  const pageViewNodeId = `thought-${thoughtData.id}-page-view`;
  const breadcrumbPages = [
    { name: label.all_thoughts, to: `thoughts`, current: false },
    {
      name: thoughtData.content_text ? `${thoughtData.content_text.slice(0, 10)}...` : "",
      to: `thought/${thoughtData.slug}`,
      current: true
    }
  ];
  const processedImages = thoughtImages.map((item) => {
    const image = item.image;
    if (!image || typeof image !== "object") return null;
    const img = image;
    if (!img.storage_key) return null;
    return {
      alt: img.alt ?? null,
      storage_key: img.storage_key,
      width: img.width ?? 0,
      height: img.height ?? 0
    };
  }).filter((img) => img !== null);
  const thoughtJsonLd = generateThoughtStructuredData({
    thought: {
      id: thoughtData.id || 0,
      slug: thoughtData.slug || "",
      content_text: thoughtData.content_text || "",
      created_at: thoughtData.created_at || (/* @__PURE__ */ new Date()).toISOString(),
      page_view: thoughtData.page_view || 0,
      images: processedImages,
      comments: [{ count }]
    },
    imgPrefix,
    lang,
    url: currentUrl
  });
  const breadcrumbJsonLd = generateBreadcrumbStructuredData([
    { name: "Home", url: `${baseUrl}/${lang}` },
    { name: "Thoughts", url: `${baseUrl}/${lang}/thoughts` },
    {
      name: thoughtData.content_text ? thoughtData.content_text.slice(0, 50) : "Thought",
      url: currentUrl
    }
  ]);
  const commentJsonLd = buildCommentsStructuredData(
    comments,
    baseUrl,
    currentUrl
  );
  const title = getTime(thoughtData.created_at, lang);
  const description = thoughtData.content_text ? thoughtData.content_text.split(/\r?\n/).join("") : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": title, "description": description, "ogTitle": title, "ogDescription": description, "ogType": "article", "pathWithoutLang": `thought/${slug}`, "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="w-full max-w-6xl mx-auto p-4 md:py-8 mb-8 lg:mb-16"> ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "lang": lang, "pages": breadcrumbPages })} <h1 class="sr-only">${title}</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="col-span-1 lg:col-span-2"> ${thoughtData.content_json && renderTemplate`${renderComponent($$result2, "ContentContainer", ContentContainer, { "client:visible": true, "content": thoughtData.content_json, "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ContentContainer.tsx", "client:component-export": "default" })}`} ${processedImages.length > 0 && renderTemplate`<div class="space-y-2 mt-4"> ${processedImages.map((img) => renderTemplate`${renderComponent($$result2, "ResponsiveImage", ResponsiveImage, { "client:visible": true, "image": img, "width": 560, "classList": "rounded", "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ResponsiveImage.tsx", "client:component-export": "default" })}`)} </div>`} <div class="flex justify-start items-center gap-1 mt-4"> <div class="flex gap-1 items-center justify-start"> ${renderComponent($$result2, "EyeIcon", ForwardRef, { "className": "h-4 w-4 inline-block text-zinc-500" })} <p${addAttribute(pageViewNodeId, "id")} class="text-zinc-500 text-sm">${thoughtData.page_view}</p> </div>
·
<p class="text-sm text-zinc-500">${getTime(thoughtData.created_at, lang)}</p> </div> ${renderComponent($$result2, "Reaction", Reaction, { "client:load": true, "contentType": "thought", "contentId": thoughtData.id, "reactions": thoughtData.reactions, "className": "mt-6", "pathname": Astro2.url.pathname, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "load", "client:component-path": "~/components/Reaction.tsx", "client:component-export": "default" })} </div> <div class="col-span-1 space-y-4"> ${renderComponent($$result2, "CommentEditor", CommentEditor, { "client:load": true, "contentTable": "to_thought", "contentId": thoughtData.id, "session": session, "lang": lang, "turnstileSiteKey": env.TURNSTILE_SITE_KEY, "endpoint": "/api/comments", "client:component-hydration": "load", "client:component-path": "~/components/CommentEditor.tsx", "client:component-export": "default" })} <div class="flex flex-col gap-4 divide-y divide-none"> ${comments.map((comment) => renderTemplate`${renderComponent($$result2, "CommentBlock", $$CommentBlock, { "comment": comment, "lang": lang })}`)} </div> <div class="py-8 flex justify-between"> ${page > 1 && renderTemplate`<a${addAttribute(`?page=${page - 1}&limit=${limit}#comment-editor`, "href")} class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.previous} </a>`} ${page < totalPage && renderTemplate`<a${addAttribute(`?page=${page + 1}&limit=${limit}#comment-editor`, "href")} class="ml-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.next} </a>`} </div> </div> </div> </div> ${renderComponent($$result2, "PageViewTracker", PageViewTracker, { "client:idle": true, "contentType": "thought", "contentId": thoughtData.id, "countNodeId": pageViewNodeId, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "idle", "client:component-path": "~/components/PageViewTracker.tsx", "client:component-export": "default" })} `, "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>", ""])), unescapeHTML(serializeStructuredData(thoughtJsonLd)), unescapeHTML(serializeStructuredData(breadcrumbJsonLd)), commentJsonLd.map((c) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(serializeStructuredData(c))))) })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/thought/[slug].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/thought/[slug].astro";
const $$url = "/[lang]/thought/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
