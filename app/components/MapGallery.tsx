import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import getLanguageLabel from "~/utils/getLanguageLabel";
import AlbumText from "~/locales/album";

export interface MapImageFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
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

interface MapGalleryProps {
  mapboxToken: string;
  imageCollection: MapImageCollection;
  imgPrefix: string;
  lang: string;
}

export default function MapGallery({
  mapboxToken,
  imageCollection,
  imgPrefix,
  lang,
}: MapGalleryProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedImage, setSelectedImage] = useState<MapImageFeature | null>(null);
  const label = getLanguageLabel(AlbumText, lang);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    // 初始化地图
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23], // 默认中心
      zoom: 2,
    });

    map.current = mapInstance;

    mapInstance.on("load", () => {
      // 添加数据源
      mapInstance.addSource("photos", {
        type: "geojson",
        data: imageCollection,
        cluster: true,
        clusterMaxZoom: 14, // 最大聚合层级
        clusterRadius: 50, // 聚合半径（像素）
      });

      // 添加聚合圆圈图层
      mapInstance.addLayer({
        id: "clusters",
        type: "circle",
        source: "photos",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#7c3aed", // 紫色
            10,
            "#6d28d9",
            30,
            "#5b21b6",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20, // 小于10个点
            10,
            30, // 10-30个点
            30,
            40, // 大于30个点
          ],
        },
      });

      // 添加聚合数量文字图层
      mapInstance.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "photos",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      // 添加单个点图层
      mapInstance.addLayer({
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

      // 点击聚合时放大
      mapInstance.on("click", "clusters", (e) => {
        const features = mapInstance.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        
        if (!features.length) return;
        
        const clusterId = features[0].properties?.cluster_id;
        const source = mapInstance.getSource("photos") as mapboxgl.GeoJSONSource;
        
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

        const geometry = features[0].geometry;
        if (geometry.type === "Point" && zoom !== null) {
          mapInstance.easeTo({
            center: geometry.coordinates as [number, number],
            zoom: zoom,
          });
        }
        });
      });

      // 点击单个点显示详情
      mapInstance.on("click", "unclustered-point", (e) => {
        if (!e.features || !e.features[0]) return;
        
        const clickedFeature = e.features[0];
        const imageId = clickedFeature.properties?.imageId;
        
        // 从原始数据中查找完整的 feature
        const fullFeature = imageCollection.features.find(
          (f) => f.properties.imageId === imageId
        );
        
        if (fullFeature) {
          setSelectedImage(fullFeature);
        }
      });

      // 鼠标悬停样式
      mapInstance.on("mouseenter", "clusters", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });
      mapInstance.on("mouseleave", "clusters", () => {
        mapInstance.getCanvas().style.cursor = "";
      });
      mapInstance.on("mouseenter", "unclustered-point", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });
      mapInstance.on("mouseleave", "unclustered-point", () => {
        mapInstance.getCanvas().style.cursor = "";
      });

      // 如果有数据，自动适配边界
      if (imageCollection.features.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        imageCollection.features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates as [number, number]);
        });
        mapInstance.fitBounds(bounds, { padding: 50 });
      }
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [mapboxToken, imageCollection]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* 图片详情面板 */}
      {selectedImage && (
        <div className="absolute top-4 right-4 w-96 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl z-10">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-zinc-800">
              {selectedImage.properties.location || label.map_title}
            </h3>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-zinc-500 hover:text-zinc-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {/* 图片 */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100">
              <img
                src={`${imgPrefix}/cdn-cgi/image/format=webp,width=640/${selectedImage.properties.storageKey}`}
                alt={selectedImage.properties.alt || ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* 图片说明 */}
            {selectedImage.properties.caption && (
              <p className="text-sm text-zinc-600">
                {selectedImage.properties.caption}
              </p>
            )}
            
            {/* 相册列表 */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-700">
                {label.albums_count} ({selectedImage.properties.albums.length})
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
      
      {/* 图片数量统计 */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 z-10">
        <p className="text-sm text-zinc-600">
          {label.total_photos} <span className="font-semibold text-violet-700">{imageCollection.features.length}</span> {label.photos}
        </p>
      </div>
    </div>
  );
}
