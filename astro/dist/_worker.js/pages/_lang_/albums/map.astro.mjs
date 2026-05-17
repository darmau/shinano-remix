globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { j as jsxRuntimeExports, F as ForwardRef, $ as $$Base } from '../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../chunks/Subnav_Ba7eeqYw.mjs';
import { r as reactExports } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { m as mapboxgl, s as setupMapboxLanguage, A as AlbumText } from '../../../chunks/mapbox_Ct0UpL2H.mjs';
/* empty css                                     */
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';

function MapGallery({
  mapboxToken,
  imageCollection,
  imgPrefix,
  lang,
  labels
}) {
  const mapContainer = reactExports.useRef(null);
  const map = reactExports.useRef(null);
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  const [clusterImages, setClusterImages] = reactExports.useState([]);
  const hasFitToBounds = reactExports.useRef(false);
  const imageCollectionRef = reactExports.useRef(imageCollection);
  reactExports.useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    mapboxgl.accessToken = mapboxToken;
    const instance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2,
      scrollZoom: false
    });
    map.current = instance;
    instance.addControl(
      new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }),
      "top-left"
    );
    setupMapboxLanguage(instance, lang);
    instance.on("load", () => {
      instance.addSource("photos", {
        type: "geojson",
        data: imageCollection,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 30
      });
      instance.addLayer({
        id: "clusters",
        type: "circle",
        source: "photos",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": ["step", ["get", "point_count"], "#7c3aed", 10, "#6d28d9", 30, "#5b21b6"],
          "circle-radius": ["step", ["get", "point_count"], 14, 10, 18, 30, 24]
        }
      });
      instance.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "photos",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        },
        paint: { "text-color": "#ffffff" }
      });
      instance.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "photos",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#7c3aed",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });
      instance.on("click", "clusters", (e) => {
        const features = instance.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        const source = instance.getSource("photos");
        const currentZoom = instance.getZoom();
        const zoomThreshold = 11;
        if (currentZoom >= zoomThreshold) {
          source.getClusterLeaves(clusterId, Number.MAX_SAFE_INTEGER, 0, (err, leaves) => {
            if (err || !leaves) return;
            const collected = leaves.map((leaf) => {
              const imageId = leaf.properties?.imageId;
              return imageCollectionRef.current.features.find(
                (f) => f.properties.imageId === imageId
              );
            }).filter((f) => f !== void 0);
            setClusterImages(collected);
            setSelectedImage(null);
          });
        } else {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            const geometry = features[0].geometry;
            if (geometry.type === "Point" && zoom !== null) {
              instance.easeTo({
                center: geometry.coordinates,
                zoom
              });
            }
          });
        }
      });
      instance.on("click", "unclustered-point", (e) => {
        if (!e.features || !e.features[0]) return;
        const imageId = e.features[0].properties?.imageId;
        const fullFeature = imageCollectionRef.current.features.find(
          (f) => f.properties.imageId === imageId
        );
        if (fullFeature) {
          setSelectedImage(fullFeature);
          setClusterImages([]);
          const coordinates = fullFeature.geometry.coordinates;
          instance.flyTo({ center: coordinates, zoom: 15, duration: 1e3, essential: true });
        }
      });
      instance.on("mouseenter", "clusters", () => {
        instance.getCanvas().style.cursor = "pointer";
      });
      instance.on("mouseleave", "clusters", () => {
        instance.getCanvas().style.cursor = "";
      });
      instance.on("mouseenter", "unclustered-point", () => {
        instance.getCanvas().style.cursor = "pointer";
      });
      instance.on("mouseleave", "unclustered-point", () => {
        instance.getCanvas().style.cursor = "";
      });
    });
    return () => {
      instance.remove();
      map.current = null;
      hasFitToBounds.current = false;
    };
  }, [mapboxToken, lang]);
  reactExports.useEffect(() => {
    imageCollectionRef.current = imageCollection;
  }, [imageCollection]);
  reactExports.useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const updateSource = () => {
      const source = instance.getSource("photos");
      if (!source) return;
      source.setData(imageCollection);
      if (imageCollection.features.length === 0) {
        hasFitToBounds.current = false;
        return;
      }
      if (!hasFitToBounds.current) {
        const bounds = new mapboxgl.LngLatBounds();
        imageCollection.features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates);
        });
        instance.fitBounds(bounds, { padding: 50 });
        hasFitToBounds.current = true;
      }
    };
    if (!instance.isStyleLoaded()) {
      instance.once("load", updateSource);
      return () => {
        instance.off("load", updateSource);
      };
    }
    updateSource();
  }, [imageCollection]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-7xl mx-auto h-[75vh] rounded-lg overflow-hidden shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapContainer, className: "w-full h-full" }),
    clusterImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 md:top-4 w-[90%] md:w-96 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-xl z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-zinc-800", children: [
          labels.map_title,
          " (",
          clusterImages.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setClusterImages([]),
            className: "text-zinc-500 hover:text-zinc-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: clusterImages.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            setSelectedImage(feature);
            setClusterImages([]);
            map.current?.flyTo({
              center: feature.geometry.coordinates,
              zoom: 15,
              duration: 1e3,
              essential: true
            });
          },
          className: "cursor-pointer rounded-lg overflow-hidden bg-zinc-50 hover:bg-zinc-100 transition-colors border border-zinc-200 hover:border-violet-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-4/3 overflow-hidden bg-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: `${imgPrefix}/cdn-cgi/image/format=avif,width=640/${feature.properties.storageKey}`,
                alt: feature.properties.alt || "",
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
              feature.properties.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-zinc-800 mb-1", children: feature.properties.location }),
              feature.properties.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-600 line-clamp-2", children: feature.properties.caption }),
              feature.properties.albums.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-500 mt-1", children: [
                labels.albums_count,
                ": ",
                feature.properties.albums.length
              ] })
            ] })
          ]
        },
        feature.properties.imageId
      )) })
    ] }),
    selectedImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 md:top-4 w-[90%] md:w-96 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-xl z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-white border-b p-4 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-zinc-800", children: selectedImage.properties.location || labels.map_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedImage(null),
            className: "text-zinc-500 hover:text-zinc-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-4/3 rounded-lg overflow-hidden bg-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `${imgPrefix}/cdn-cgi/image/format=avif,width=640/${selectedImage.properties.storageKey}`,
            alt: selectedImage.properties.alt || "",
            className: "w-full h-full object-cover",
            loading: "lazy"
          }
        ) }),
        selectedImage.properties.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-600", children: selectedImage.properties.caption }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-medium text-zinc-700", children: [
            labels.albums_count,
            " (",
            selectedImage.properties.albums.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedImage.properties.albums.map((album) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `/${lang}/album/${album.slug}`,
              className: "block p-3 rounded-md bg-zinc-50 hover:bg-zinc-100 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-zinc-800", children: album.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500 mt-1", children: new Date(album.publishedAt).toLocaleDateString(lang) })
              ]
            },
            album.id
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-zinc-600", children: [
      labels.total_photos,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-violet-700", children: imageCollection.features.length }),
      " ",
      labels.photos
    ] }) })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Map = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Map;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const mapboxToken = env.MAPBOX_TOKEN;
  const { data: geojson } = await supabase.rpc("get_photo_map_geojson", {
    lang_code: lang
  });
  const imageCollection = geojson ?? { type: "FeatureCollection", features: [] };
  const { data: latestPhoto } = await supabase.from("photo").select(`cover (storage_key), language!inner (lang)`).eq("language.lang", lang).eq("is_draft", false).order("published_at", { ascending: false }).limit(1).maybeSingle();
  const latestStorage = latestPhoto?.cover?.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const label = getLanguageLabel(AlbumText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${latestStorage}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.map_title, "description": label.map_description, "ogTitle": label.map_title, "ogDescription": label.map_description, "ogImage": ogImage, "pathWithoutLang": "albums/map", "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/album/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "photography" })} ${maybeRenderHead()}<div class="w-full max-w-8xl mx-auto p-4 md:py-8"> <h1 class="sr-only">Albums Map</h1> ${renderComponent($$result2, "MapGallery", MapGallery, { "client:visible": true, "mapboxToken": mapboxToken, "imageCollection": imageCollection, "imgPrefix": imgPrefix, "lang": lang, "labels": {
    map_title: label.map_title,
    albums_count: label.albums_count,
    total_photos: label.total_photos,
    photos: label.photos
  }, "client:component-hydration": "visible", "client:component-path": "~/components/MapGallery.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/map.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/map.astro";
const $$url = "/[lang]/albums/map";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Map,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
