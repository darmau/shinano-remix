globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, ae as renderComponent, al as renderTemplate, a1 as createAstro } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../chunks/Subnav_Ba7eeqYw.mjs';
import { g as getTime } from '../../chunks/getTime_CcDELrHl.mjs';
import { F as ForwardRef } from '../../chunks/EyeIcon_BCB1a6Md.mjs';
import { F as ForwardRef$1 } from '../../chunks/ChatBubbleOvalLeftIcon_DNbDi8Qu.mjs';
import { T as ThoughtText } from '../../chunks/thought_npWjrI48.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro$1 = createAstro();
const $$ThoughtCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ThoughtCard;
  const { thought, lang, imgPrefix } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="break-inside-avoid mb-4"> <a${addAttribute(`/${lang}/thought/${thought.slug}`, "href")} class="block cursor-pointer relative rounded-2xl bg-white px-6 py-2 shadow-xl border border-gray-200 overflow-hidden shadow-zinc-500/10 hover:shadow-zinc-500/30 hover:shadow-2xl transition-all duration-300"> <svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-slate-100"> <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path> </svg> <div class="relative mb-4 space-y-4"> <p class="whitespace-pre-line text-zinc-700">${thought.content_text}</p> <div class="flex gap-3 justify-start items-center"> <div class="flex gap-1 items-center"> ${renderComponent($$result, "EyeIcon", ForwardRef, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${thought.page_view}</span> </div> <div class="flex gap-1 items-center"> ${renderComponent($$result, "ChatBubbleOvalLeftIcon", ForwardRef$1, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${thought.comments[0].count}</span> </div> <p class="text-sm text-zinc-500">${getTime(thought.created_at, lang)}</p> </div> ${thought.thought_image && thought.thought_image.length > 0 && renderTemplate`<div class="grid grid-cols-3 gap-4"> ${thought.thought_image.map((entry) => renderTemplate`<img${addAttribute(`${imgPrefix}/cdn-cgi/image/format=auto,width=320/${entry.image.storage_key}`, "src")}${addAttribute(entry.image.alt ?? "", "alt")} loading="lazy" decoding="async" class="aspect-square w-full h-full object-cover rounded">`)} </div>`} </div> </a> </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/ThoughtCard.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Thoughts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Thoughts;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const url = new URL(Astro2.request.url);
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  const limit = 12;
  const [thoughtsResult, countResult] = await Promise.all([
    supabase.from("thought").select(
      `
      id, slug, content_text, created_at, page_view,
      comments:comment(count),
      thought_image ( image (id, alt, storage_key, width, height) )
      `
    ).order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1),
    supabase.from("thought").select("id", { count: "exact", head: true })
  ]);
  const isRecord = (value) => typeof value === "object" && value !== null;
  const thoughts = (thoughtsResult.data ?? []).map((row) => {
    if (!isRecord(row)) return null;
    const id = row["id"];
    const slug = row["slug"];
    const createdAt = row["created_at"];
    if (typeof id !== "number" || typeof slug !== "string" || typeof createdAt !== "string") {
      return null;
    }
    const commentsValue = row["comments"];
    const comments = Array.isArray(commentsValue) ? commentsValue.map((c) => isRecord(c) && typeof c["count"] === "number" ? { count: c["count"] } : null).filter((c) => c !== null) : [];
    const thoughtImagesValue = row["thought_image"];
    const thought_image = Array.isArray(thoughtImagesValue) ? thoughtImagesValue.map((entry) => {
      if (!isRecord(entry)) return null;
      const img = entry["image"];
      if (!isRecord(img)) return null;
      const imgId = img["id"];
      const storageKey = img["storage_key"];
      if (typeof imgId !== "number" || typeof storageKey !== "string") return null;
      return {
        image: {
          id: imgId,
          alt: typeof img["alt"] === "string" ? img["alt"] : null,
          storage_key: storageKey,
          width: typeof img["width"] === "number" ? img["width"] : 0,
          height: typeof img["height"] === "number" ? img["height"] : 0
        }
      };
    }).filter((entry) => entry !== null) : [];
    return {
      id,
      slug,
      content_text: typeof row["content_text"] === "string" ? row["content_text"] : "",
      created_at: createdAt,
      page_view: typeof row["page_view"] === "number" ? row["page_view"] : 0,
      comments: comments.length > 0 ? comments : [{ count: 0 }],
      thought_image
    };
  }).filter((t) => t !== null);
  const totalCount = countResult.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const label = getLanguageLabel(ThoughtText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const isPaged = page > 1;
  const pathWithoutLang = isPaged ? `thoughts?page=${page}` : "thoughts";
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.all_thoughts, "description": label.description, "ogTitle": label.all_thoughts, "ogDescription": label.description, "ogType": "article", "pathWithoutLang": pathWithoutLang, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/thought/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "others" })} ${maybeRenderHead()}<h1 class="sr-only">${label.all_thoughts}</h1> <div class="w-full flex-1 min-h-full max-w-2xl mx-auto p-4 md:py-8 lg:mb-16"> <div class="flex flex-col gap-4"> ${thoughts.map((thought) => renderTemplate`${renderComponent($$result2, "ThoughtCard", $$ThoughtCard, { "thought": thought, "lang": lang, "imgPrefix": imgPrefix })}`)} </div> <nav class="mt-8 flex justify-between text-sm" aria-label="Pagination"> ${page > 1 ? renderTemplate`<a${addAttribute(page - 1 === 1 ? `/${lang}/thoughts` : `/${lang}/thoughts?page=${page - 1}`, "href")} class="rounded-md bg-white px-3 py-2 font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"> ${label.previous} </a>` : renderTemplate`<span></span>`} ${page < totalPages && renderTemplate`<a${addAttribute(`/${lang}/thoughts?page=${page + 1}`, "href")} class="ml-auto rounded-md bg-white px-3 py-2 font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"> ${label.next} </a>`} </nav> </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/thoughts.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/thoughts.astro";
const $$url = "/[lang]/thoughts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thoughts,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
