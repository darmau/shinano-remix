import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { lazy, Suspense } from "react";
import { createClient } from "~/utils/supabase/server";
import type { MapImageCollection, MapImageFeature } from "~/components/MapGallery";
import type { Json } from "~/types/supabase";
import getLanguageLabel from "~/utils/getLanguageLabel";
import AlbumText from "~/locales/album";
import i18nLinks from "~/utils/i18nLinks";
import Subnav from "~/components/Subnav";

// 懒加载 MapGallery 组件
const MapGallery = lazy(() => import("~/components/MapGallery"));

type ImageWithAlbums = {
  image_id: number;
  image: {
    storage_key: string;
    alt: string | null;
    caption: string | null;
    location: string | null;
    width: number | null;
    height: number | null;
    exif: Json | null;
  };
  photo: {
    id: number;
    slug: string | null;
    title: string | null;
    published_at: string | null;
  };
};

export default function AlbumsMap() {
  const { imageCollection, MAPBOX, imgPrefix } = useLoaderData<typeof loader>();
  const { lang } = useOutletContext<{ lang: string }>();

  return (
    <>
      <Subnav active="photography" />
      <h1 className="sr-only">Albums Map</h1>
      <Suspense
        fallback={
          <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg text-gray-600">加载地图中...</div>
            </div>
          </div>
        }
      >
        <MapGallery
          mapboxToken={MAPBOX}
          imageCollection={imageCollection}
          imgPrefix={imgPrefix}
          lang={lang}
        />
      </Suspense>
    </>
  );
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const { supabase } = createClient(request, context);
  const lang = params.lang as string;

  // 查询所有带GPS坐标的图片及其关联的相册
  const { data: rawImages, error } = await supabase
    .from("photo_image")
    .select(
      `
      image_id,
      image!inner (
        storage_key,
        alt,
        caption,
        location,
        width,
        height,
        exif
      ),
      photo!inner (
        id,
        slug,
        title,
        published_at,
        is_draft,
        language!inner (lang)
      )
    `
    )
    .eq("photo.is_draft", false)
    .eq("photo.language.lang", lang)
    .not("image.exif", "is", null);

  if (error) {
    console.error("Error fetching images:", error);
    return json({
      imageCollection: { type: "FeatureCollection", features: [] } as MapImageCollection,
      MAPBOX: context.cloudflare.env.MAPBOX_TOKEN,
      imgPrefix: context.cloudflare.env.IMG_PREFIX,
      baseUrl: context.cloudflare.env.BASE_URL,
      availableLangs: ["zh", "en", "jp"],
    });
  }

  // 按 image_id 聚合数据
  const imageMap = new Map<
    number,
    {
      image: ImageWithAlbums["image"];
      albums: Array<{
        id: number;
        slug: string;
        title: string;
        publishedAt: string;
      }>;
    }
  >();

  rawImages?.forEach((item: ImageWithAlbums) => {
    const imageId = item.image_id;
    const exif = item.image.exif as { latitude?: number; longitude?: number } | null;

    // 检查是否有有效的GPS坐标
    if (!exif || typeof exif.latitude !== "number" || typeof exif.longitude !== "number") {
      return;
    }

    // 验证坐标范围
    const lat = exif.latitude;
    const lng = exif.longitude;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return;
    }

    // 验证必需字段
    if (!item.photo.slug || !item.photo.title || !item.photo.published_at) {
      return;
    }

    if (!imageMap.has(imageId)) {
      imageMap.set(imageId, {
        image: item.image,
        albums: [],
      });
    }

    const imageData = imageMap.get(imageId)!;
    imageData.albums.push({
      id: item.photo.id,
      slug: item.photo.slug,
      title: item.photo.title,
      publishedAt: item.photo.published_at,
    });
  });

  // 转换为 GeoJSON FeatureCollection
  const features: MapImageFeature[] = [];

  imageMap.forEach((data, imageId) => {
    const exif = data.image.exif as { latitude?: number; longitude?: number } | null;
    if (!exif || typeof exif.latitude !== "number" || typeof exif.longitude !== "number") {
      return;
    }

    // 按发布时间降序排序相册
    data.albums.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [exif.longitude, exif.latitude], // GeoJSON 格式：[lng, lat]
      },
      properties: {
        imageId,
        storageKey: data.image.storage_key,
        alt: data.image.alt,
        caption: data.image.caption,
        location: data.image.location,
        width: data.image.width ?? 800,
        height: data.image.height ?? 600,
        albums: data.albums,
      },
    });
  });

  const imageCollection: MapImageCollection = {
    type: "FeatureCollection",
    features,
  };

  const availableLangs = ["zh", "en", "jp"];

  return json({
    imageCollection,
    MAPBOX: context.cloudflare.env.MAPBOX_TOKEN,
    imgPrefix: context.cloudflare.env.IMG_PREFIX,
    baseUrl: context.cloudflare.env.BASE_URL,
    availableLangs,
  });
}

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const lang = params.lang as string;
  const label = getLanguageLabel(AlbumText, lang);

  if (!data) {
    return [{ title: "Not Found" }];
  }

  const baseUrl = data.baseUrl;
  const multiLangLinks = i18nLinks(baseUrl, lang, data.availableLangs, "albums/map");

  return [
    { title: label.map_title },
    {
      name: "description",
      content: label.map_description,
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
      content: label.map_title,
    },
    {
      property: "og:url",
      content: `${baseUrl}/${lang}/albums/map`,
    },
    {
      property: "og:description",
      content: label.map_description,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:creator",
      content: "@darmau8964",
    },
    ...multiLangLinks,
  ];
};
