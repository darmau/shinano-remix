import {useMemo, useState} from "react";
import Subnav from "~/components/Subnav";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import {createClient} from "~/utils/supabase/server";
import { useLoaderData, useLocation, useOutletContext } from "react-router";
import Pagination from "~/components/Pagination";
import getLanguageLabel from "~/utils/getLanguageLabel";
import HomepageText from "~/locales/homepage";
import i18nLinks from "~/utils/i18nLinks";
import type {AlbumRow, GalleryItem, GalleryMediaImage, ThoughtRow} from "~/types/Gallery";
import GalleryCard from "~/components/GalleryCard";

type LoaderData = {
  items: GalleryItem[];
  count: number;
  page: number;
  baseUrl: string;
  prefix: string;
  availableLangs: string[];
};

const PAGE_SIZE = 20;

const toImages = (cover: AlbumRow["cover"] | null, galleryImages?: AlbumRow["photo_image"] | ThoughtRow["thought_image"]): GalleryMediaImage[] => {
  const images: GalleryMediaImage[] = [];

  if (Array.isArray(galleryImages)) {
    galleryImages
        .map(item => ({order: item?.order ?? 0, image: item?.image}))
        .filter((item): item is { order: number; image: NonNullable<AlbumRow["cover"]> } => !!item.image)
        .sort((a, b) => a.order - b.order)
        .forEach(({image}) => {
          images.push({
            id: String(image.id),
            alt: image.alt ?? null,
            storage_key: image.storage_key,
            width: image.width ?? 0,
            height: image.height ?? 0,
          });
        });
  }

  const hasCover = cover && images.some(img => img.storage_key === cover.storage_key);

  if (cover && !hasCover) {
    images.push({
      id: String(cover.id),
      alt: cover.alt ?? null,
      storage_key: cover.storage_key,
      width: cover.width ?? 0,
      height: cover.height ?? 0,
    });
  }

  return images;
};

const normalizeAlbums = (rows: unknown): GalleryItem[] => {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows.flatMap(row => {
    if (!row || typeof row !== "object") {
      return [];
    }

    const candidate = row as AlbumRow;
    if (typeof candidate.id !== "number" || !candidate.cover || !candidate.language) {
      return [];
    }

    return [{
      type: "photo" as const,
      id: candidate.id,
      slug: candidate.slug,
      title: candidate.title ?? "",
      content: candidate.content_text ?? "",
      createdAt: candidate.published_at ?? candidate.created_at ?? "",
      images: toImages(candidate.cover, candidate.photo_image),
    }];
  });
};

const normalizeThoughts = (rows: unknown): GalleryItem[] => {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows.flatMap(row => {
    if (!row || typeof row !== "object") {
      return [];
    }

    const candidate = row as ThoughtRow;
    if (candidate.push_to_gallery !== true || typeof candidate.id !== "number") {
      return [];
    }

    return [{
      type: "thought" as const,
      id: candidate.id,
      slug: candidate.slug,
      title: "",
      content: candidate.content_text ?? "",
      createdAt: candidate.created_at ?? "",
      images: toImages(null, candidate.thought_image ?? null),
    }];
  });
};

const toTimestamp = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const isLoaderData = (value: unknown): value is LoaderData =>
    typeof value === "object" &&
    value !== null &&
    "baseUrl" in value &&
    "availableLangs" in value &&
    "page" in value &&
    "prefix" in value &&
    "items" in value &&
    "count" in value;

export default function AllAlbums() {
  const {prefix, lang} = useOutletContext<{prefix: string, lang: string}>();
  const {items, count, page} = useLoaderData<LoaderData>();
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState(5);

  // 将pathname末尾的page去掉
  const path = location.pathname.replace(/\/\d+$/, '');

  const visibleItems = useMemo(
      () => items.slice(0, Math.min(visibleCount, items.length)),
      [items, visibleCount]
  );

  const loadMore = () => {
    setVisibleCount(prev => Math.min(items.length, prev + 5));
  };

  return (
      <>
        <Subnav active = "photography"/>
        <h1 className = "sr-only">Photography</h1>
        <div className = "w-full max-w-5xl mx-auto p-4 lg:mb-16 space-y-6">
          <ul className = "space-y-6">
            {visibleItems.map((item) => (
                <GalleryCard item = {item} lang = {lang} prefix = {prefix} key = {`${item.type}-${item.id}`}/>
            ))}
          </ul>

          {visibleCount < items.length && (
              <button
                  className = "bg-zinc-900 text-white px-4 py-2 rounded-md text-sm"
                  onClick = {loadMore}
              >
                加载更多
              </button>
          )}

          <Pagination count = {count ?? 0} limit = {PAGE_SIZE} page = {page} path = {path}/>
        </div>
      </>
  )
}

export const meta: MetaFunction<typeof loader> = ({params, data}) => {
  const lang = params.lang as string;
  const label = getLanguageLabel(HomepageText, lang);

  if (!isLoaderData(data)) {
    return [{title: 'Not Found'}];
  }

  const baseUrl = data.baseUrl;
  const ogCover = data.items.find(item => item.images.length > 0)?.images[0]?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const multiLangLinks = i18nLinks(baseUrl,
      lang,
      data.availableLangs,
      `albums/all/${data.page}`
  );

  return [
    {title: label.albums_title},
    {
      name: "description",
      content: label.albums_description,
    },
    {
      tagName: "link",
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: `${baseUrl}/${lang}/album/rss.xml`,
    },
    {
      property: "og:title",
      content: label.albums_title
    },
    {
      property: "og:url",
      content: `${baseUrl}/${lang}/albums/all/${data.page}`
    },
    {
      property: "og:image",
      content: `${data.prefix}/cdn-cgi/image/format=jpeg,width=960/${ogCover}`
    },
    {
      property: "og:description",
      content: label.albums_description
    },
    {
      property: "twitter:card",
      content: "summary_large_image"
    },
    {
      property: "twitter:creator",
      content: "@darmau8964"
    },
    ...multiLangLinks
  ];
};

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {supabase} = createClient(request, context);
  const lang = params.lang as string;
  const page = Number(params.page);

  // 如果page无法转换为数字，返回404
  if (!Number.isInteger(page) || page < 1) {
    return new Response(null, {status: 404});
  }

  const fetchLimit = page * PAGE_SIZE;

  const [albumResult, thoughtResult] = await Promise.all([
    supabase
    .from('photo')
    .select(`
        id,
        title,
        slug,
        content_text,
        created_at,
        published_at,
        cover (id, alt, storage_key, width, height),
        language!inner (lang),
        photo_image (
          order,
          image (id, alt, storage_key, width, height)
        )
      `)
    .eq('language.lang', lang)
    .eq('is_draft', false)
    .order('published_at', {ascending: false})
    .limit(fetchLimit),
    supabase
    .from('thought')
    .select(`
      id,
      slug,
      content_text,
      created_at,
      push_to_gallery,
      thought_image (
        order,
        image (id, alt, storage_key, width, height)
      )
    `)
    .order('created_at', {ascending: false})
    .limit(fetchLimit)
    .eq('push_to_gallery' as never, true)
  ]);

  if (albumResult.error) {
    return new Response(albumResult.error.message, {status: 500});
  }

  if (thoughtResult.error) {
    return new Response(thoughtResult.error.message, {status: 500});
  }

  const albums = normalizeAlbums(albumResult.data);
  const thoughts = normalizeThoughts(thoughtResult.data);
  const sortedItems = [...albums, ...thoughts].sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt));
  const start = (page - 1) * PAGE_SIZE;

  const {count: photoCount} = await supabase
  .from('photo')
  .select(`
    id,
    language!inner (lang)
  `, {count: 'exact', head: true})
  .eq('is_draft', false)
  .eq('language.lang', lang);

  const {count: thoughtCount} = await supabase
  .from('thought')
  .select('id', {count: 'exact', head: true})
  .eq('push_to_gallery' as never, true);

  const availableLangs = ["zh", "en", "jp"];

  return {
    items: sortedItems.slice(start, start + PAGE_SIZE),
    count: (photoCount ?? 0) + (thoughtCount ?? 0),
    page,
    baseUrl: context.cloudflare.env.BASE_URL,
    prefix: context.cloudflare.env.IMG_PREFIX,
    availableLangs,
  };
}
