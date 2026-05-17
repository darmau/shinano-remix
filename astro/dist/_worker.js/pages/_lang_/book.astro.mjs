globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, ae as renderComponent, al as renderTemplate, a1 as createAstro, _ as addAttribute } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../chunks/Subnav_Ba7eeqYw.mjs';
import { r as reactExports } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { T as ThoughtText } from '../../chunks/thought_npWjrI48.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';

const BookText = {
  "zh": {
    title: "我读的书",
    description: "豆瓣其实并不一定能持续很多年，更何况还有很多禁书不存在。于是在这里记录我读的书。"
  },
  "en": {
    title: "Books I Read",
    description: "Douban may not last for many years, let alone many banned books. So here I record the books I read."
  },
  "jp": {
    title: "私が読んだ本",
    description: "豆瓣は多くの年月を持続する必要がないかもしれません、禁書もたくさんあります。だからここに私が読んだ本を記録します。"
  }
};

function StarIcon$1({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(StarIcon$1);

function LinkIcon({
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
    d: "M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(LinkIcon);

function StarIcon({
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
    d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(StarIcon);

const $$Astro$1 = createAstro();
const $$RateStars = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RateStars;
  const { n } = Astro2.props;
  const rating = n ?? 0;
  const empty = Math.max(0, 5 - rating);
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-1"> ${Array.from({ length: rating }).map(() => renderTemplate`${renderComponent($$result, "SolidStar", ForwardRef, { "className": "w-4 h-4 text-yellow-500" })}`)} ${Array.from({ length: empty }).map(() => renderTemplate`${renderComponent($$result, "OutlineStar", ForwardRef$2, { "className": "w-4 h-4 text-gray-500" })}`)} </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/RateStars.astro", void 0);

function getDate(date, lang) {
  const time = new Date(date);
  let locale;
  switch (lang) {
    case "zh":
      locale = "zh-Hans-CN";
      break;
    case "en":
      locale = "en-US";
      break;
    case "jp":
      locale = "ja-JP";
      break;
    default:
      locale = "en-US";
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Intl.DateTimeFormat(locale, options).format(time);
}

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
  const url = new URL(Astro2.request.url);
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  const limit = 20;
  const [booksResult, countResult] = await Promise.all([
    supabase.from("book").select(`id, title, rate, comment, link, date, cover (id, alt, storage_key)`).order("date", { ascending: false }).range((page - 1) * limit, page * limit - 1),
    supabase.from("book").select("id", { count: "exact", head: true })
  ]);
  const isRecord = (value) => typeof value === "object" && value !== null;
  const books = (booksResult.data ?? []).map((row) => {
    if (!isRecord(row)) return null;
    const id = row["id"];
    if (typeof id !== "number") return null;
    const cover = row["cover"];
    const normalizedCover = isRecord(cover) && typeof cover["storage_key"] === "string" ? {
      alt: typeof cover["alt"] === "string" ? cover["alt"] : null,
      storage_key: cover["storage_key"]
    } : null;
    return {
      id,
      title: typeof row["title"] === "string" ? row["title"] : "",
      rate: typeof row["rate"] === "number" ? row["rate"] : null,
      comment: typeof row["comment"] === "string" ? row["comment"] : null,
      link: typeof row["link"] === "string" ? row["link"] : null,
      date: typeof row["date"] === "string" ? row["date"] : null,
      cover: normalizedCover
    };
  }).filter((b) => b !== null);
  const totalCount = countResult.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const label = getLanguageLabel(BookText, lang);
  const thoughtLabel = getLanguageLabel(ThoughtText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const isPaged = page > 1;
  const pathWithoutLang = isPaged ? `book?page=${page}` : "book";
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": `${label.title}(${totalCount})`, "description": label.description, "ogTitle": label.title, "ogDescription": label.description, "pathWithoutLang": pathWithoutLang, "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "others" })} ${maybeRenderHead()}<h1 class="sr-only">Books</h1> <div class="w-full max-w-6xl mx-auto p-4 md:py-8 my-8 lg:my-12"> <div class="grid grid-cols-1 gap-8 md:grid-cols-2"> ${books.map((book) => renderTemplate`<div class="flex gap-4 justify-between items-start lg:my-4"> ${book.cover && renderTemplate`<img${addAttribute(`${imgPrefix}/cdn-cgi/image/format=auto,width=240/${book.cover.storage_key}`, "src")}${addAttribute(book.cover.alt ?? "", "alt")} loading="lazy" decoding="async" class="h-32 aspect-3/4 object-cover shadow-lg">`} <div class="w-full space-y-2 lg:space-y-3"> <h3 class="font-medium text-lg text-zinc-800">${book.title}</h3> ${renderComponent($$result2, "RateStars", $$RateStars, { "n": book.rate })} ${book.comment && renderTemplate`<p class="text-zinc-700">${book.comment}</p>`} ${book.date && renderTemplate`<div class="text-sm text-zinc-500">${getDate(book.date, lang)}</div>`} ${book.link && renderTemplate`<a${addAttribute(book.link, "href")} target="_blank" class="block my-2" rel="noreferrer"> ${renderComponent($$result2, "LinkIcon", ForwardRef$1, { "className": "w-4 h-4 text-zinc-500 hover:text-violet-700 cursor-pointer" })} </a>`} </div> </div>`)} </div> <nav class="mt-8 flex justify-between text-sm" aria-label="Pagination"> ${page > 1 ? renderTemplate`<a${addAttribute(page - 1 === 1 ? `/${lang}/book` : `/${lang}/book?page=${page - 1}`, "href")} class="rounded-md bg-white px-3 py-2 font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"> ${thoughtLabel.previous} </a>` : renderTemplate`<span></span>`} ${page < totalPages && renderTemplate`<a${addAttribute(`/${lang}/book?page=${page + 1}`, "href")} class="ml-auto rounded-md bg-white px-3 py-2 font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"> ${thoughtLabel.next} </a>`} </nav> </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/book/index.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/book/index.astro";
const $$url = "/[lang]/book";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
