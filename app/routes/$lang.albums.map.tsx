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
    gps_location: string | null; // PostGIS GEOGRAPHY 返回为 WKT 字符串
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
  // 注意：不在这里过滤 GPS，而是获取所有图片，在应用层过滤
  // 这样可以同时支持 gps_location 和 exif 两种数据源
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
        exif,
        gps_location
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
    .eq("photo.language.lang", lang);

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

  console.log(`[Map Loader] Found ${rawImages?.length || 0} photo_image records for lang: ${lang}`);

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
      coordinates: { lat: number; lng: number };
    }
  >();

  rawImages?.forEach((item, index) => {
    const typedItem = item as ImageWithAlbums;
    const imageId = typedItem.image_id;
    let lat: number | null = null;
    let lng: number | null = null;
    let source = "";

    // 优先从 gps_location 提取坐标（PostGIS GEOGRAPHY 格式）
    if (typedItem.image.gps_location) {
      // 调试：记录第一条 gps_location 的格式
      if (index === 0) {
        console.log("[Map Loader] First gps_location format:", typedItem.image.gps_location);
      }

      // gps_location 格式: "POINT(longitude latitude)" 或 GeoJSON
      const gpsMatch = typedItem.image.gps_location.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
      if (gpsMatch) {
        lng = parseFloat(gpsMatch[1]);
        lat = parseFloat(gpsMatch[2]);
        source = "gps_location(WKT)";
      } else {
        // 尝试解析为 GeoJSON
        try {
          const geoJson = JSON.parse(typedItem.image.gps_location);
          if (geoJson.type === "Point" && Array.isArray(geoJson.coordinates)) {
            lng = geoJson.coordinates[0];
            lat = geoJson.coordinates[1];
            source = "gps_location(GeoJSON)";
          }
        } catch (e) {
          // 解析失败，尝试直接作为对象访问
          const gpsObj = typedItem.image.gps_location as any;
          if (gpsObj && typeof gpsObj === 'object' && gpsObj.type === "Point" && Array.isArray(gpsObj.coordinates)) {
            lng = gpsObj.coordinates[0];
            lat = gpsObj.coordinates[1];
            source = "gps_location(Object)";
          }
        }
      }
    }

    // 如果 gps_location 没有数据，回退到 exif
    if (lat === null || lng === null) {
      const exif = typedItem.image.exif as { latitude?: number; longitude?: number } | null;
      if (exif && typeof exif.latitude === "number" && typeof exif.longitude === "number") {
        lat = exif.latitude;
        lng = exif.longitude;
        source = "exif";
      }
    }

    // 检查是否有有效的GPS坐标
    if (lat === null || lng === null || isNaN(lat) || isNaN(lng)) {
      if (index < 3) {
        console.log(`[Map Loader] Image ${imageId} skipped: no valid coordinates`);
      }
      return;
    }

    // 验证坐标范围
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.log(`[Map Loader] Image ${imageId} skipped: coordinates out of range (${lat}, ${lng})`);
      return;
    }

    // 验证必需字段
    if (!typedItem.photo.slug || !typedItem.photo.title || !typedItem.photo.published_at) {
      console.log(`[Map Loader] Image ${imageId} skipped: missing photo fields`);
      return;
    }

    if (!imageMap.has(imageId)) {
      imageMap.set(imageId, {
        image: typedItem.image,
        albums: [],
        coordinates: { lat, lng },
      });
      if (index < 3) {
        console.log(`[Map Loader] Image ${imageId} added from ${source}: [${lng}, ${lat}]`);
      }
    }

    const imageData = imageMap.get(imageId)!;
    imageData.albums.push({
      id: typedItem.photo.id,
      slug: typedItem.photo.slug,
      title: typedItem.photo.title,
      publishedAt: typedItem.photo.published_at,
    });
  });

  // 转换为 GeoJSON FeatureCollection
  const features: MapImageFeature[] = [];

  imageMap.forEach((data, imageId) => {
    // 按发布时间降序排序相册
    data.albums.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [data.coordinates.lng, data.coordinates.lat], // GeoJSON 格式：[lng, lat]
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

  console.log(`[Map Loader] Final result: ${features.length} unique images with GPS data`);

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
