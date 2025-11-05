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
      console.log('Mapbox loaded, checking for GPS data...');
      
      // 如果地图加载完成时已经有 exifData，立即应用
      const currentExif = exifDataRef.current;
      console.log('Initial exifData on map load:', currentExif);
      
      if (!currentExif) {
        console.log('No exifData available yet');
        return;
      }
      
      const latitude = currentExif.latitude;
      const longitude = currentExif.longitude;
      
      if (latitude == null || longitude == null) {
        console.log('No GPS coordinates in exifData');
        return;
      }
      
      const lat = Number(latitude);
      const lng = Number(longitude);
      
      if (isNaN(lat) || isNaN(lng)) {
        console.warn('Invalid GPS coordinates on load:', { latitude, longitude });
        return;
      }
      
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn('GPS coordinates out of range on load:', { lat, lng });
        return;
      }
      
      console.log('Setting map position to:', { lat, lng });
      const target: [number, number] = [lng, lat];
      
      mapInstance.flyTo({
        center: target,
        zoom: 13,
      });

      if (!marker.current) {
        marker.current = new mapboxgl.Marker();
        marker.current.setLngLat(target); // 必须先设置位置
        marker.current.addTo(mapInstance); // 然后再添加到地图
        console.log('Marker created and added to map at:', target);
      } else {
        marker.current.setLngLat(target);
        console.log('Marker position updated to:', target);
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
    console.log('exifData changed:', exifData);
    console.log('Map ready:', !!map.current, 'Map loaded:', isMapLoaded.current);
    
    if (!map.current || !isMapLoaded.current) {
      console.log('Map not ready yet, skipping update');
      return;
    }

    if (!exifData) {
      console.log('No exifData provided');
      return;
    }

    const latitude = exifData.latitude;
    const longitude = exifData.longitude;

    // 检查是否有有效的坐标
    if (latitude == null || longitude == null) {
      console.log('No GPS coordinates in exifData, removing marker');
      // 如果没有坐标，移除现有标记
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      return;
    }

    // 转换为数字并验证
    const lat = Number(latitude);
    const lng = Number(longitude);

    console.log('Processing GPS coordinates:', { lat, lng });

    // 确保坐标是有效数字
    if (isNaN(lat) || isNaN(lng)) {
      console.warn('Invalid GPS coordinates:', { latitude, longitude });
      return;
    }

    // 验证经纬度范围
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.warn('GPS coordinates out of range:', { lat, lng });
      return;
    }

    const target: [number, number] = [lng, lat];
    
    console.log('Moving map to:', target);
    // 先移动地图
    map.current.flyTo({
      center: target,
      zoom: 13,
    });

    // 创建或更新标记
    if (!marker.current) {
      console.log('Creating new marker');
      marker.current = new mapboxgl.Marker();
      marker.current.setLngLat(target); // 必须先设置位置
      marker.current.addTo(map.current); // 然后再添加到地图
      console.log('Marker created and added at:', target);
    } else {
      marker.current.setLngLat(target);
      console.log('Marker position updated to:', target);
    }
  }, [exifData]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
}
