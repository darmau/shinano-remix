import Subnav from "~/components/Subnav";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import {createClient} from "~/utils/supabase/server";
import { Link, useLoaderData, useLocation, useOutletContext } from "react-router";
import type {FeaturedPhoto} from "~/utils/generatePhotoAlbum";
import {generatePhotoAlbum} from "~/utils/generatePhotoAlbum";
import {ServerPhotoAlbum} from "~/components/ServerPhotoAlbum";
import GalleryImage from "~/components/GalleryImage";
import "react-photo-album/columns.css";
import Pagination from "~/components/Pagination";
import getLanguageLabel from "~/utils/getLanguageLabel";
import HomepageText from "~/locales/homepage";
import i18nLinks from "~/utils/i18nLinks";

type AlbumRow = {
  id: number;
  title: string | null;
  slug: string | null;
  page_view: number | null;
  cover: {
    id: string | number;
    alt: string | null;
    storage_key: string;
    width: number | null;
    height: number | null;
  } | null;
  language: {
    lang: string | null;
  } | null;
};

type LoaderData = {
  albums: FeaturedPhoto[];
  count: number;
  page: number;
  baseUrl: string;
  prefix: string;
  availableLangs: string[];
};

const normalizeAlbums = (rows: unknown, fallbackLang: string): FeaturedPhoto[] => {
  if (!Array.isArray(rows)) {
    return [];
  }

  const normalized: FeaturedPhoto[] = [];

  rows.forEach(row => {
    if (!row || typeof row !== "object") {
      return;
    }

    const candidate = row as AlbumRow;
    if (typeof candidate.id !== "number" || !candidate.cover || !candidate.language) {
      return;
    }

    normalized.push({
      id: candidate.id,
      slug: candidate.slug,
      title: candidate.title ?? "",
      language: {
        lang: candidate.language.lang ?? fallbackLang,
      },
      cover: {
        id: String(candidate.cover.id),
        alt: candidate.cover.alt,
        storage_key: candidate.cover.storage_key,
        width: candidate.cover.width ?? 0,
        height: candidate.cover.height ?? 0,
      },
    });
  });

  return normalized;
};

const isLoaderData = (value: unknown): value is LoaderData =>
    typeof value === "object" &&
    value !== null &&
    "baseUrl" in value &&
    "availableLangs" in value &&
    "page" in value &&
    "prefix" in value &&
    "albums" in value &&
    "count" in value;

export default function AllAlbums() {
  const {prefix, lang} = useOutletContext<{prefix: string, lang: string}>();
  const {albums, count, page} = useLoaderData<LoaderData>();
  const location = useLocation();

  // 将pathname末尾的page去掉
  const path = location.pathname.replace(/\/\d+$/, '');

  const photos = generatePhotoAlbum(albums, prefix, lang);

  return (
      <>
        <Subnav active = "photography"/>
        <h1 className = "sr-only">Photography</h1>
        <div className = "w-full max-w-8xl mx-auto p-4 lg:mb-16 space-y-8">
          <ServerPhotoAlbum
              layout = "columns"
              photos = {photos}
              breakpoints = {[480, 720, 1080]}
              columns = {(containerWidth: number) => {
                if (containerWidth < 480) return 1;
                if (containerWidth < 720) return 2;
                if (containerWidth < 960) return 3;
                return 4;
              }}
              spacing = {0}
              render = {{
                // eslint-disable-next-line no-empty-pattern
                photo: ({}, {photo}: { photo: typeof photos[number] }) => (
                    <Link
                        to = {photo.href} className = "group m-2 relative rounded-md overflow-hidden" key = {photo.key}
                    >
                      <div className = "z-20 absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent">
                        <div
                            className = "transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 p-4"
                        >
                          <p className = "text-white font-medium text-base">{photo.title}</p>
                        </div>
                      </div>
                      <GalleryImage image = {photo} width = {640} classList = "group w-full h-auto"/>
                    </Link>
                )
              }}
          />
          <Pagination count = {count ?? 0} limit = {16} page = {page} path = {path}/>
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
      // 没有数据的时候会有bug
      content: `${data.prefix}/cdn-cgi/image/format=jpeg,width=960/${data.albums[0]?.cover?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f"}`
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
  const page = params.page as string;

  // 如果page无法转换为数字，返回404
  if (isNaN(Number(page))) {
    return new Response(null, {status: 404});
  }

  const {data: albumRows, error: albumsError} = await supabase
  .from('photo')
  .select(`
      id,
      title,
      slug,
      page_view,
      cover (id, alt, storage_key, width, height),
      language!inner (lang)
    `)
  .eq('language.lang', lang)
  .eq('is_draft', false)
  .limit(12)
  .range((Number(page) - 1) * 16, Number(page) * 16 - 1)
  .order('published_at', {ascending: false});

  if (albumsError) {
    return new Response(albumsError.message, {status: 500});
  }

  // 指定语言album的数量，排除草稿
  const {count} = await supabase
  .from('photo')
  .select(`
    id,
    language!inner (lang)
  `, {count: 'exact', head: true})
  .eq('is_draft', false)
  .eq('language.lang', lang);

  const availableLangs = [lang];
  const albums = normalizeAlbums(albumRows, lang);

  return {
    albums,
    count: count ?? 0,
    page: Number(page),
    baseUrl: context.cloudflare.env.BASE_URL,
    prefix: context.cloudflare.env.IMG_PREFIX,
    availableLangs,
  };
}
