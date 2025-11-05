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

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) {
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2,
    });

    return () => {
      marker.current = null;
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current) {
      return;
    }

    const latitude = exifData?.latitude ?? null;
    const longitude = exifData?.longitude ?? null;

    if (latitude === null || longitude === null) {
      return;
    }

    const target: [number, number] = [longitude, latitude];
    map.current.flyTo({
      center: target,
      zoom: 13,
    });

    if (!marker.current) {
      marker.current = new mapboxgl.Marker().addTo(map.current);
    }

    marker.current.setLngLat(target);
  }, [exifData]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
}
