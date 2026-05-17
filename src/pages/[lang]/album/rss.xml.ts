import type { APIRoute } from "astro";
import { HomepageText } from "~/locales";
import getLanguageLabel from "~/lib/i18n/getLanguageLabel";
import { LOCALES } from "~/lib/i18n/getLang";
import { buildRssChannel, escapeHtml, type RssEntry } from "~/lib/feeds/rss";
import { getPublicEnv } from "~/lib/env";
import { createSupabaseBuild } from "~/lib/supabase/build";

export const prerender = true;

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

type AlbumImageAsset = {
  order: number;
  storageKey: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
};

function firstThreeParagraphs(text: string | null): string {
  if (!text) return "本文没有内容";
  return text
    .split("\n")
    .filter((p) => p.trim() !== "")
    .slice(0, 3)
    .join("\n");
}

function renderAlbumImagesHtml(images: AlbumImageAsset[], prefix: string): string {
  if (!images.length) return "";
  const figures = images
    .map((img) => {
      const src = `${prefix}/cdn-cgi/image/format=jpeg,width=1600/${img.storageKey}`;
      const widthAttr = img.width ? ` width="${img.width}"` : "";
      const heightAttr = img.height ? ` height="${img.height}"` : "";
      const caption = img.caption
        ? `<figcaption>${escapeHtml(img.caption)}</figcaption>`
        : "";
      return `<figure>
  <img src="${src}" loading="lazy" decoding="async" alt="${escapeHtml(img.alt ?? "")}"${widthAttr}${heightAttr} />
  ${caption}
</figure>`;
    })
    .join("");
  return `<div class="album-images">${figures}</div>`;
}

export const GET: APIRoute = async (ctx) => {
  const lang = ctx.params.lang!;
  const supabase = createSupabaseBuild();
  const { BASE_URL: baseUrl, IMG_PREFIX } = getPublicEnv(ctx.locals);
  const imgPrefix = IMG_PREFIX || "https://img.darmau.co";
  const label = getLanguageLabel(HomepageText, lang);

  const { data: posts } = await supabase
    .from("photo")
    .select(
      `id, title, slug, abstract, content_text, published_at,
       category (title), cover (alt, size, storage_key), language!inner (lang)`,
    )
    .eq("language.lang", lang)
    .eq("is_draft", false)
    .order("published_at", { ascending: false })
    .limit(30);

  const postIds = (posts ?? []).map((p) => p.id);
  const imagesByPhoto: Record<number, AlbumImageAsset[]> = {};

  if (postIds.length > 0) {
    const { data: imageRows } = await supabase
      .from("photo_image")
      .select(`photo_id, order, image (alt, caption, height, width, storage_key)`)
      .in("photo_id", postIds);

    for (const row of imageRows ?? []) {
      const photoId = (row as { photo_id?: number | null }).photo_id;
      const img = (row as { image?: { storage_key?: string; width?: number | null; height?: number | null; alt?: string | null; caption?: string | null } | null })
        .image;
      if (!photoId || !img?.storage_key) continue;
      const asset: AlbumImageAsset = {
        order: (row as { order?: number | null }).order ?? Number.MAX_SAFE_INTEGER,
        storageKey: img.storage_key,
        width: img.width ?? null,
        height: img.height ?? null,
        alt: img.alt ?? null,
        caption: img.caption ?? null,
      };
      if (!imagesByPhoto[photoId]) imagesByPhoto[photoId] = [];
      imagesByPhoto[photoId].push(asset);
    }
    Object.values(imagesByPhoto).forEach((arr) => arr.sort((a, b) => a.order - b.order));
  }

  const entries: RssEntry[] = (posts ?? []).map((post) => {
    const baseContent = firstThreeParagraphs(post.content_text);
    const imagesHtml = renderAlbumImagesHtml(imagesByPhoto[post.id] ?? [], imgPrefix);
    const content = imagesHtml ? `${baseContent}\n\n${imagesHtml}` : baseContent;
    const cover = post.cover as { storage_key: string; size?: number } | null;
    return {
      title: post.title ?? label.photography,
      description: post.abstract ?? "",
      pubDate: post.published_at,
      link: `${baseUrl}/${lang}/album/${post.slug}`,
      guid: post.id,
      author: "李大毛",
      category: (post.category as { title?: string } | null)?.title ?? label.photography,
      content,
      enclosure: cover
        ? {
            url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${cover.storage_key}`,
            type: "image/jpeg",
            length: String(cover.size ?? 0),
          }
        : undefined,
    };
  });

  const feed = buildRssChannel({
    title: `${label.title} - ${label.photography}`,
    description: label.description,
    language: lang,
    link: `${baseUrl}/${lang}`,
    imageTitle: "积薪 - 摄影",
    entries,
    followChallenge: { feedId: "46524720022474752", userId: "46488520035984384" },
  });

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=2419200",
    },
  });
};
