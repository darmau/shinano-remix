import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setupMapboxLanguage } from "~/lib/mapbox";

export interface MapboxCoords {
  latitude?: number | null;
  longitude?: number | null;
}

interface Props {
  mapboxToken: string;
  coords: MapboxCoords | null;
  lang?: string;
}

export default function Mapbox({ mapboxToken, coords, lang = "en" }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    const instance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2,
    });
    map.current = instance;
    setupMapboxLanguage(instance, lang);

    instance.on("load", () => {
      const lat = coords?.latitude;
      const lng = coords?.longitude;
      if (lat == null || lng == null) return;
      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (
        Number.isNaN(latNum) ||
        Number.isNaN(lngNum) ||
        latNum < -90 ||
        latNum > 90 ||
        lngNum < -180 ||
        lngNum > 180
      )
        return;

      const target: [number, number] = [lngNum, latNum];
      instance.flyTo({ center: target, zoom: 13 });
      marker.current = new mapboxgl.Marker().setLngLat(target).addTo(instance);
    });

    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      instance.remove();
      map.current = null;
    };
  }, [mapboxToken, lang, coords?.latitude, coords?.longitude]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
}
