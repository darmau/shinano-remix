export function getLanguageSwitcherLinks(
  currentLang: string,
  currentPath: string,
  availableLangs?: string[],
  allLangs: string[] = ["zh", "en", "jp"]
): Map<string, string> {
  const links = new Map<string, string>();
  const targetLangs = allLangs.filter((lang) => lang !== currentLang);

  const isDynamicContent =
    currentPath.startsWith("article/") ||
    currentPath.startsWith("album/") ||
    currentPath.startsWith("thought/");

  for (const lang of targetLangs) {
    if (isDynamicContent && availableLangs && availableLangs.length > 0) {
      if (availableLangs.includes(lang)) {
        links.set(lang, `/${lang}/${currentPath}`);
      } else {
        links.set(lang, `/${lang}`);
      }
    } else if (!currentPath) {
      links.set(lang, `/${lang}`);
    } else {
      links.set(lang, `/${lang}/${currentPath}`);
    }
  }

  return links;
}
