globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, _ as addAttribute } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { j as jsxRuntimeExports, $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../chunks/Subnav_Ba7eeqYw.mjs';
import { r as reactExports } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';

const RSSText = {
  "zh": {
    "title": "本站提供按内容分类的RSS订阅",
    "description": "点击对应分类的按钮即可复制到剪贴板",
    "page_title": "RSS订阅",
    "page_description": "本站提供按内容分类的RSS订阅",
    "article": "文章",
    "photography": "摄影",
    "thought": "想法",
    "copy": "复制",
    "copied": "已复制"
  },
  "en": {
    "title": "RSS Feed by Category",
    "description": "Click the button to copy the RSS URL to clipboard",
    "page_title": "RSS Feed",
    "page_description": "RSS Feed by Category",
    "article": "Articles",
    "photography": "Photography",
    "thought": "Thoughts",
    "copy": "Copy",
    "copied": "Copied"
  },
  "jp": {
    "title": "RSSフィード",
    "description": "カテゴリーごとのRSSフィードをコピーするにはボタンをクリックしてください",
    "page_title": "RSSフィード",
    "page_description": "カテゴリーごとのRSSフィード",
    "article": "記事",
    "photography": "写真",
    "thought": "思考",
    "copy": "コピー",
    "copied": "コピーしました"
  }
};

function RSSCopyButton({ url, copyLabel, copiedLabel }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: "bg-violet-600 text-white font-medium py-3 w-full rounded-md",
      children: copied ? copiedLabel : copyLabel
    }
  );
}

const $$Astro = createAstro();
const prerender = false;
const $$Rss = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rss;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const label = getLanguageLabel(RSSText, lang);
  const [articlesResult, photosResult, thoughtsResult] = await Promise.all([
    supabase.from("article").select(`id, title, subtitle, published_at, language!inner (lang)`).eq("is_draft", false).eq("language.lang", lang).order("published_at", { ascending: false }).limit(5),
    supabase.from("photo").select(`id, title, published_at, language!inner (lang), cover (storage_key)`).eq("is_draft", false).eq("is_featured", true).eq("language.lang", lang).order("published_at", { ascending: false }).limit(9),
    supabase.from("thought").select(`id, content_text, created_at`).order("created_at", { ascending: false }).limit(7)
  ]);
  const articles = articlesResult.data ?? [];
  const photos = photosResult.data ?? [];
  const thoughts = thoughtsResult.data ?? [];
  const availableLangs = ["zh", "en", "jp"];
  const articleRssUrl = `${baseUrl}/${lang}/article/rss.xml`;
  const photoRssUrl = `${baseUrl}/${lang}/album/rss.xml`;
  const thoughtRssUrl = `${baseUrl}/${lang}/thought/rss.xml`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.page_title, "description": label.page_description, "ogTitle": label.page_title, "ogDescription": label.page_description, "pathWithoutLang": "rss", "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "about" })} ${maybeRenderHead()}<div class="w-full max-w-8xl mx-auto p-4 md:py-8 my-8"> <header class="text-center space-y-2 mb-12"> <h2 class="font-medium text-sm text-violet-700">RSS</h2> <h1 class="font-medium text-zinc-900 text-3xl lg:text-4xl">${label.title}</h1> <p class="text-base text-zinc-600">${label.description}</p> </header> <div class="grid grid-cols-1 gap-8 lg:grid-cols-3"> <section class="rounded-2xl border border-gray-200 shadow-lg"> <div class="p-4 lg:p-8 border-b border-gray-200 space-y-4"> <h3 class="font-medium text-lg text-zinc-700">${label.article}</h3> <code class="text-sm block font-mono text-zinc-600">${articleRssUrl}</code> ${renderComponent($$result2, "RSSCopyButton", RSSCopyButton, { "client:load": true, "url": articleRssUrl, "copyLabel": label.copy, "copiedLabel": label.copied, "client:component-hydration": "load", "client:component-path": "~/components/RSSCopyButton.tsx", "client:component-export": "default" })} </div> ${articles.length > 0 && renderTemplate`<ol class="space-y-4 p-4 lg:p-8"> ${articles.map((article) => renderTemplate`<li> <h4 class="font-medium text-zinc-700">${article.title}</h4> <p class="text-zinc-500 mt-1">${article.subtitle}</p> </li>`)} </ol>`} </section> <section class="rounded-2xl border border-gray-200 shadow-lg"> <div class="p-4 lg:p-8 border-b border-gray-200 space-y-4"> <h3 class="font-medium text-lg text-zinc-700">${label.photography}</h3> <code class="text-sm block font-mono text-zinc-600">${photoRssUrl}</code> ${renderComponent($$result2, "RSSCopyButton", RSSCopyButton, { "client:load": true, "url": photoRssUrl, "copyLabel": label.copy, "copiedLabel": label.copied, "client:component-hydration": "load", "client:component-path": "~/components/RSSCopyButton.tsx", "client:component-export": "default" })} </div> <div class="grid grid-cols-3 gap-2 mt-8 p-4 lg:p-8"> ${photos.map(
    (photo) => photo.cover && renderTemplate`<div class="aspect-square overflow-hidden rounded"> <img${addAttribute(`${imgPrefix}/cdn-cgi/image/format=auto,width=240/${photo.cover.storage_key}`, "src")}${addAttribute(photo.title ?? "", "alt")} class="w-full h-full object-cover"> </div>`
  )} </div> </section> <section class="rounded-2xl border border-gray-200 shadow-lg"> <div class="p-4 lg:p-8 border-b border-gray-200 space-y-4"> <h3 class="font-medium text-lg text-zinc-700">${label.thought}</h3> <code class="text-sm block font-mono text-zinc-600">${thoughtRssUrl}</code> ${renderComponent($$result2, "RSSCopyButton", RSSCopyButton, { "client:load": true, "url": thoughtRssUrl, "copyLabel": label.copy, "copiedLabel": label.copied, "client:component-hydration": "load", "client:component-path": "~/components/RSSCopyButton.tsx", "client:component-export": "default" })} </div> ${thoughts.length > 0 && renderTemplate`<ol class="space-y-4 p-4 lg:p-8 pl-8 lg:pl-12 list-decimal"> ${thoughts.map((thought) => renderTemplate`<li> <p class="text-zinc-700">${thought.content_text}</p> </li>`)} </ol>`} </section> </div> </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/rss.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/rss.astro";
const $$url = "/[lang]/rss";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rss,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
