globalThis.process ??= {}; globalThis.process.env ??= {};
import { H as HomepageText } from '../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { b as buildRssChannel, e as escapeHtml } from '../../../chunks/rss_CcdjkeFh.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
function firstThreeParagraphs(text) {
  if (!text) return "本文没有内容";
  return text.split("\n").filter((p) => p.trim() !== "").slice(0, 3).join("\n");
}
function renderAlbumImagesHtml(images, prefix) {
  if (!images.length) return "";
  const figures = images.map((img) => {
    const src = `${prefix}/cdn-cgi/image/format=jpeg,width=1600/${img.storageKey}`;
    const widthAttr = img.width ? ` width="${img.width}"` : "";
    const heightAttr = img.height ? ` height="${img.height}"` : "";
    const caption = img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : "";
    return `<figure>
  <img src="${src}" loading="lazy" decoding="async" alt="${escapeHtml(img.alt ?? "")}"${widthAttr}${heightAttr} />
  ${caption}
</figure>`;
  }).join("");
  return `<div class="album-images">${figures}</div>`;
}
const GET = async (ctx) => {
  const lang = ctx.params.lang;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX ?? "https://img.darmau.co";
  const label = getLanguageLabel(HomepageText, lang);
  const { data: posts } = await supabase.from("photo").select(
    `id, title, slug, abstract, content_text, published_at,
       category (title), cover (alt, size, storage_key), language!inner (lang)`
  ).eq("language.lang", lang).eq("is_draft", false).order("published_at", { ascending: false }).limit(30);
  const postIds = (posts ?? []).map((p) => p.id);
  const imagesByPhoto = {};
  if (postIds.length > 0) {
    const { data: imageRows } = await supabase.from("photo_image").select(`photo_id, order, image (alt, caption, height, width, storage_key)`).in("photo_id", postIds);
    for (const row of imageRows ?? []) {
      const photoId = row.photo_id;
      const img = row.image;
      if (!photoId || !img?.storage_key) continue;
      const asset = {
        order: row.order ?? Number.MAX_SAFE_INTEGER,
        storageKey: img.storage_key,
        width: img.width ?? null,
        height: img.height ?? null,
        alt: img.alt ?? null,
        caption: img.caption ?? null
      };
      if (!imagesByPhoto[photoId]) imagesByPhoto[photoId] = [];
      imagesByPhoto[photoId].push(asset);
    }
    Object.values(imagesByPhoto).forEach((arr) => arr.sort((a, b) => a.order - b.order));
  }
  const entries = (posts ?? []).map((post) => {
    const baseContent = firstThreeParagraphs(post.content_text);
    const imagesHtml = renderAlbumImagesHtml(imagesByPhoto[post.id] ?? [], imgPrefix);
    const content = imagesHtml ? `${baseContent}

${imagesHtml}` : baseContent;
    const cover = post.cover;
    return {
      title: post.title ?? label.photography,
      description: post.abstract ?? "",
      pubDate: post.published_at,
      link: `${baseUrl}/${lang}/album/${post.slug}`,
      guid: post.id,
      author: "李大毛",
      category: post.category?.title ?? label.photography,
      content,
      enclosure: cover ? {
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
        type: "image/jpeg",
        length: String(cover.size ?? 0)
      } : void 0
    };
  });
  const feed = buildRssChannel({
    title: `${label.title} - ${label.photography}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 摄影",
    entries,
    followChallenge: { feedId: "46524720022474752", userId: "46488520035984384" }
  });
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
