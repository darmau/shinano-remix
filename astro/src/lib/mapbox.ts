import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

const MAPBOX_LANG_MAP: Record<string, string> = {
  zh: "zh-Hans",
  en: "en",
  jp: "ja",
};

export function getMapboxLang(lang: string): string {
  return MAPBOX_LANG_MAP[lang] ?? "en";
}

export function setupMapboxLanguage(map: mapboxgl.Map, lang: string): void {
  const language = new MapboxLanguage({ defaultLanguage: getMapboxLang(lang) });
  map.addControl(language);
}
