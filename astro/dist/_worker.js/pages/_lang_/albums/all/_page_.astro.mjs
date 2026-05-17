globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, al as renderTemplate, a1 as createAstro, ae as renderComponent } from '../../../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../../chunks/Subnav_Ba7eeqYw.mjs';
import { g as getTime } from '../../../../chunks/getTime_CcDELrHl.mjs';
import { $ as $$Pagination } from '../../../../chunks/Pagination_DgOK-H5Q.mjs';
import { H as HomepageText } from '../../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../../chunks/getLang_DVpWAtTa.mjs';
export { a as renderers } from '../../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const $$Astro$1 = createAstro();
const $$GalleryCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$GalleryCard;
  const { item, lang, prefix } = Astro2.props;
  function getGridClass(count) {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-2";
    return "grid-cols-3";
  }
  const href = item.type === "photo" ? `/${lang}/album/${item.slug ?? item.id}` : `/${lang}/thought/${item.slug ?? item.id}`;
  const images = item.images;
  const displayImages = images.slice(0, 9);
  const remainingCount = images.length - 9;
  const gridClass = getGridClass(images.length);
  return renderTemplate`${images.length > 0 && renderTemplate`${maybeRenderHead()}<li class="flex flex-col gap-2"><div class="flex items-center gap-3">${item.type === "photo" && item.title && renderTemplate`<a${addAttribute(href, "href")} class="text-xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors">${item.title}</a>`}</div>${item.type === "thought" && item.content && renderTemplate`<a${addAttribute(href, "href")} class="block text-sm text-zinc-700 line-clamp-3">${item.content}</a>`}<time class="text-sm text-zinc-500 tabular-nums">${getTime(item.createdAt, lang)}</time><a${addAttribute(href, "href")}${addAttribute(["grid", gridClass, "gap-1 rounded-lg overflow-hidden"], "class:list")}>${displayImages.map((image, index) => {
    const isLastWithMore = index === 8 && remainingCount > 0;
    return renderTemplate`<div class="relative overflow-hidden aspect-square"><img${addAttribute(`${prefix}/cdn-cgi/image/format=auto,width=720/${image.storage_key}`, "src")}${addAttribute(image.alt ?? "", "alt")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async">${isLastWithMore && renderTemplate`<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="text-white text-2xl font-semibold">+${remainingCount}</span></div>`}</div>`;
  })}</a></li>`}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/GalleryCard.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const PAGE_SIZE = 20;
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
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;
  const [feedResult, countResult] = await Promise.all([
    supabase.from("gallery_feed").select("*").or(`lang.eq.${lang},lang.is.null`).order("sort_date", { ascending: false }).range(start, end),
    supabase.from("gallery_feed").select("*", { count: "exact", head: true }).or(`lang.eq.${lang},lang.is.null`)
  ]);
  if (feedResult.error) {
    return new Response(feedResult.error.message, { status: 500 });
  }
  const isRecord = (value) => typeof value === "object" && value !== null;
  function normalize(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.flatMap((row) => {
      if (!isRecord(row)) return [];
      const item = row;
      if (typeof item.id !== "number") return [];
      const images = (item.images ?? []).filter((entry) => entry?.image?.storage_key).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((entry) => ({
        id: String(entry.image.id),
        alt: entry.image.alt ?? null,
        storage_key: entry.image.storage_key,
        width: entry.image.width ?? 0,
        height: entry.image.height ?? 0
      }));
      if (images.length === 0 && item.cover?.storage_key) {
        images.push({
          id: String(item.cover.id),
          alt: item.cover.alt ?? null,
          storage_key: item.cover.storage_key,
          width: item.cover.width ?? 0,
          height: item.cover.height ?? 0
        });
      }
      return [
        {
          type: item.content_type,
          id: item.id,
          slug: item.slug,
          title: item.title ?? "",
          content: item.content_text ?? "",
          createdAt: item.sort_date ?? "",
          images
        }
      ];
    });
  }
  const items = normalize(feedResult.data);
  const count = countResult.count ?? 0;
  const label = getLanguageLabel(HomepageText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const path = `/${lang}/albums/all`;
  const ogCover = items.find((it) => it.images.length > 0)?.images[0]?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${ogCover}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.albums_title, "description": label.albums_description, "ogTitle": label.albums_title, "ogDescription": label.albums_description, "ogImage": ogImage, "pathWithoutLang": `albums/all/${page}`, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/album/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "photography" })} ${maybeRenderHead()}<h1 class="sr-only">Photography</h1> <div class="w-full max-w-5xl mx-auto p-4 lg:mb-16 space-y-6"> <ul class="mx-auto space-y-12 lg:space-y-16 max-w-lg"> ${items.map((item) => renderTemplate`${renderComponent($$result2, "GalleryCard", $$GalleryCard, { "item": item, "lang": lang, "prefix": imgPrefix })}`)} </ul> ${renderComponent($$result2, "Pagination", $$Pagination, { "count": count, "limit": PAGE_SIZE, "page": page, "path": path, "lang": lang })} </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/all/[page].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/all/[page].astro";
const $$url = "/[lang]/albums/all/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
