import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { lazy, Suspense } from "react";
import { createClient } from "~/utils/supabase/server";
import type { MapImageCollection } from "~/components/MapGallery";
import getLanguageLabel from "~/utils/getLanguageLabel";
import AlbumText from "~/locales/album";
import i18nLinks from "~/utils/i18nLinks";
import Subnav from "~/components/Subnav";

// 懒加载 MapGallery 组件
const MapGallery = lazy(() => import("~/components/MapGallery"));

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

  console.log(`[Map Loader - Function] Fetching data for lang: ${lang}`);
  const startTime = Date.now();

  // 🚀 一行调用数据库函数，直接获取完整的 GeoJSON！
  // @ts-ignore - 自定义数据库函数，未在类型定义中
  const { data: geojson, error } = await supabase.rpc("get_photo_map_geojson", {
    lang_code: lang,
  });

  if (error) {
    console.error("Error fetching map data:", error);
    return json({
      imageCollection: { type: "FeatureCollection", features: [] } as MapImageCollection,
      MAPBOX: context.cloudflare.env.MAPBOX_TOKEN,
      imgPrefix: context.cloudflare.env.IMG_PREFIX,
      baseUrl: context.cloudflare.env.BASE_URL,
      availableLangs: ["zh", "en", "jp"],
    });
  }

  const elapsed = Date.now() - startTime;
  const imageCollection = (geojson || { type: "FeatureCollection", features: [] }) as MapImageCollection;
  const featureCount = imageCollection.features?.length || 0;
  console.log(`[Map Loader - Function] ✅ Loaded ${featureCount} images in ${elapsed}ms`);

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
