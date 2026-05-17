// 1:1 port of app/utils/i18nLinks.ts — produces canonical + hreflang + og:locale:alternate
// records that the Base layout serializes into <link> / <meta> tags.

const langMap = new Map([
  ["en", "en"],
  ["zh", "zh-Hans"],
  ["jp", "ja"],
]);

export type LinkRecord =
  | { tagName: "link"; rel: "canonical"; href: string }
  | { tagName: "link"; rel: "alternate"; href: string; hrefLang: string | undefined }
  | { property: "og:locale:alternate"; content: string };

export default function i18nLinks(
  baseUrl: string,
  currentLang: string,
  availableLangs: string[],
  url: string,
): LinkRecord[] {
  const canonical: LinkRecord = {
    tagName: "link",
    rel: "canonical",
    href: `${baseUrl}/${currentLang}/${url}`,
  };
  const langs = availableLangs.filter((l) => l !== currentLang);

  const links: LinkRecord[] = langs.map((l) => ({
    tagName: "link",
    rel: "alternate",
    href: `${baseUrl}/${l}/${url}`,
    hrefLang: langMap.get(l),
  }));

  const ogLocale: LinkRecord[] = langs.map((l) => ({
    property: "og:locale:alternate",
    content: l,
  }));

  return [canonical, ...links, ...ogLocale];
}
