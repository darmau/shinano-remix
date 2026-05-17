import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setupMapboxLanguage } from "~/lib/mapbox";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface MapImageFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    imageId: number;
    storageKey: string;
    alt: string | null;
    caption: string | null;
    location: string | null;
    width: number;
    height: number;
    albums: Array<{
      id: number;
      slug: string;
      title: string;
      publishedAt: string;
    }>;
  };
}

export interface MapImageCollection {
  type: "FeatureCollection";
  features: MapImageFeature[];
}

interface Labels {
  map_title: string;
  albums_count: string;
  total_photos: string;
  photos: string;
}

interface Props {
  mapboxToken: string;
  imageCollection: MapImageCollection;
  imgPrefix: string;
  lang: string;
  labels: Labels;
}

export default function MapGallery({
  mapboxToken,
  imageCollection,
  imgPrefix,
  lang,
  labels,
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedImage, setSelectedImage] = useState<MapImageFeature | null>(null);
  const [clusterImages, setClusterImages] = useState<MapImageFeature[]>([]);
  const hasFitToBounds = useRef(false);
  const imageCollectionRef = useRef(imageCollection);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    const instance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2,
      scrollZoom: false,
    });
    map.current = instance;

    instance.addControl(
      new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }),
      "top-left",
    );
    setupMapboxLanguage(instance, lang);

    instance.on("load", () => {
      instance.addSource("photos", {
        type: "geojson",
        data: imageCollection,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 30,
      });

      instance.addLayer({
        id: "clusters",
        type: "circle",
        source: "photos",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": ["step", ["get", "point_count"], "#7c3aed", 10, "#6d28d9", 30, "#5b21b6"],
          "circle-radius": ["step", ["get", "point_count"], 14, 10, 18, 30, 24],
        },
      });
      instance.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "photos",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: { "text-color": "#ffffff" },
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
          "circle-stroke-color": "#fff",
        },
      });

      instance.on("click", "clusters", (e) => {
        const features = instance.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        const source = instance.getSource("photos") as mapboxgl.GeoJSONSource;
        const currentZoom = instance.getZoom();
        const zoomThreshold = 11;

        if (currentZoom >= zoomThreshold) {
          source.getClusterLeaves(clusterId, Number.MAX_SAFE_INTEGER, 0, (err, leaves) => {
            if (err || !leaves) return;
            const collected: MapImageFeature[] = leaves
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((leaf: any) => {
                const imageId = leaf.properties?.imageId;
                return imageCollectionRef.current.features.find(
                  (f) => f.properties.imageId === imageId,
                );
              })
              .filter((f): f is MapImageFeature => f !== undefined);
            setClusterImages(collected);
            setSelectedImage(null);
          });
        } else {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            const geometry = features[0].geometry;
            if (geometry.type === "Point" && zoom !== null) {
              instance.easeTo({
                center: geometry.coordinates as [number, number],
                zoom,
              });
            }
          });
        }
      });

      instance.on("click", "unclustered-point", (e) => {
        if (!e.features || !e.features[0]) return;
        const imageId = e.features[0].properties?.imageId;
        const fullFeature = imageCollectionRef.current.features.find(
          (f) => f.properties.imageId === imageId,
        );
        if (fullFeature) {
          setSelectedImage(fullFeature);
          setClusterImages([]);
          const coordinates = fullFeature.geometry.coordinates as [number, number];
          instance.flyTo({ center: coordinates, zoom: 15, duration: 1000, essential: true });
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

  useEffect(() => {
    imageCollectionRef.current = imageCollection;
  }, [imageCollection]);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const updateSource = () => {
      const source = instance.getSource("photos") as mapboxgl.GeoJSONSource | undefined;
      if (!source) return;
      source.setData(imageCollection);
      if (imageCollection.features.length === 0) {
        hasFitToBounds.current = false;
        return;
      }
      if (!hasFitToBounds.current) {
        const bounds = new mapboxgl.LngLatBounds();
        imageCollection.features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates as [number, number]);
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

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[75vh] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />

      {clusterImages.length > 0 && (
        <div className="absolute top-2 md:top-4 w-[90%] md:w-96 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 max-h-[800px] overflow-y-auto bg-white rounded-lg shadow-xl z-10">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h3 className="text-lg font-semibold text-zinc-800">
              {labels.map_title} ({clusterImages.length})
            </h3>
            <button
              onClick={() => setClusterImages([])}
              className="text-zinc-500 hover:text-zinc-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {clusterImages.map((feature) => (
              <div
                key={feature.properties.imageId}
                onClick={() => {
                  setSelectedImage(feature);
                  setClusterImages([]);
                  map.current?.flyTo({
                    center: feature.geometry.coordinates as [number, number],
                    zoom: 15,
                    duration: 1000,
                    essential: true,
                  });
                }}
                className="cursor-pointer rounded-lg overflow-hidden bg-zinc-50 hover:bg-zinc-100 transition-colors border border-zinc-200 hover:border-violet-300"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                  <img
                    src={`${imgPrefix}/cdn-cgi/image/format=avif,width=640/${feature.properties.storageKey}`}
                    alt={feature.properties.alt || ""}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  {feature.properties.location && (
                    <p className="text-sm font-medium text-zinc-800 mb-1">
                      {feature.properties.location}
                    </p>
                  )}
                  {feature.properties.caption && (
                    <p className="text-xs text-zinc-600 line-clamp-2">
                      {feature.properties.caption}
                    </p>
                  )}
                  {feature.properties.albums.length > 0 && (
                    <p className="text-xs text-zinc-500 mt-1">
                      {labels.albums_count}: {feature.properties.albums.length}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="absolute top-2 md:top-4 w-[90%] md:w-96 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-xl z-10">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-zinc-800">
              {selectedImage.properties.location || labels.map_title}
            </h3>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-zinc-500 hover:text-zinc-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-zinc-100">
              <img
                src={`${imgPrefix}/cdn-cgi/image/format=avif,width=640/${selectedImage.properties.storageKey}`}
                alt={selectedImage.properties.alt || ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {selectedImage.properties.caption && (
              <p className="text-sm text-zinc-600">{selectedImage.properties.caption}</p>
            )}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-700">
                {labels.albums_count} ({selectedImage.properties.albums.length})
              </h4>
              <div className="space-y-2">
                {selectedImage.properties.albums.map((album) => (
                  <a
                    key={album.id}
                    href={`/${lang}/album/${album.slug}`}
                    className="block p-3 rounded-md bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  >
                    <p className="font-medium text-zinc-800">{album.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(album.publishedAt).toLocaleDateString(lang)}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 z-10">
        <p className="text-sm text-zinc-600">
          {labels.total_photos}{" "}
          <span className="font-semibold text-violet-700">
            {imageCollection.features.length}
          </span>{" "}
          {labels.photos}
        </p>
      </div>
    </div>
  );
}
