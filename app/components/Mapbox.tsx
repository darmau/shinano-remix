import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export interface EXIF {
  latitude?: number | null;
  longitude?: number | null;
}

interface MapComponentProps {
  mapboxToken: string;
  exifData: EXIF | null;
}

export default function MapComponent({ mapboxToken, exifData }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const isMapLoaded = useRef(false);
  const exifDataRef = useRef(exifData);
  
  // 保持 exifData ref 最新
  useEffect(() => {
    exifDataRef.current = exifData;
  }, [exifData]);

  // 初始化地图
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) {
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2,
    });

    map.current = mapInstance;
    isMapLoaded.current = false;

    // 监听地图加载完成事件
    const handleMapLoad = () => {
      isMapLoaded.current = true;
      
      // 如果地图加载完成时已经有 exifData，立即应用
      const currentExif = exifDataRef.current;
      if (currentExif?.latitude != null && currentExif?.longitude != null) {
        const lat = currentExif.latitude;
        const lng = currentExif.longitude;
        
        if (typeof lat === 'number' && typeof lng === 'number' && 
            !isNaN(lat) && !isNaN(lng)) {
          const target: [number, number] = [lng, lat];
          mapInstance.flyTo({
            center: target,
            zoom: 13,
          });

          if (!marker.current) {
            marker.current = new mapboxgl.Marker();
            marker.current.addTo(mapInstance);
          }
          marker.current.setLngLat(target);
        }
      }
    };
    
    mapInstance.on('load', handleMapLoad);

    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      mapInstance.remove();
      map.current = null;
      isMapLoaded.current = false;
    };
  }, [mapboxToken]);

  // 处理 exifData 变化
  useEffect(() => {
    if (!map.current || !isMapLoaded.current) {
      return;
    }

    const latitude = exifData?.latitude ?? null;
    const longitude = exifData?.longitude ?? null;

    if (latitude === null || longitude === null) {
      // 如果没有坐标，移除现有标记
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      return;
    }

    // 确保坐标是有效数字
    if (typeof latitude !== 'number' || typeof longitude !== 'number' || 
        isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    const target: [number, number] = [longitude, latitude];
    
    // 先移动地图
    map.current.flyTo({
      center: target,
      zoom: 13,
    });

    // 创建或更新标记
    if (!marker.current) {
      marker.current = new mapboxgl.Marker();
      // 先添加到地图，这样标记才能正确初始化
      marker.current.addTo(map.current);
    }
    
    // 设置标记位置
    marker.current.setLngLat(target);
  }, [exifData]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
}
