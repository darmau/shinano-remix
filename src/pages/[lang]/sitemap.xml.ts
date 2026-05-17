import type { APIRoute } from "astro";
import { LOCALES } from "~/lib/i18n/getLang";

export const prerender = false;

type RecordWithKeys = Record<string, unknown>;
const isRecord = (value: unknown): value is RecordWithKeys =>
  typeof value === "object" && value !== null;
const toRecordArray = (value: unknown): RecordWithKeys[] =>
  Array.isArray(value) ? value.filter(isRecord) : [];

function entryMarkup(
  rows: RecordWithKeys[],
  dateKey: "updated_at" | "created_at",
  baseUrl: string,
  lang: string,
  pathSegment: string,
  changefreq: string,
  priority: string,
): string {
  return rows
    .map((row) => {
      const slug = row["slug"];
      const timestamp = row[dateKey];
      if (typeof slug !== "string" || !slug) return null;
      if (typeof timestamp !== "string" || !timestamp) return null;
      return `<url>
    <loc>${baseUrl}/${lang}/${pathSegment}/${slug}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .filter((entry): entry is string => entry !== null)
    .join("\n  ");
}

export const GET: APIRoute = async (ctx) => {
  const lang = ctx.params.lang;
  if (!lang || !(LOCALES as readonly string[]).includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }

  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const baseUrl = env.BASE_URL;

  const [articleResult, albumResult, thoughtResult] = await Promise.all([
    supabase
      .from("article")
      .select(`slug, updated_at, language!inner (lang)`)
      .eq("is_draft", false)
      .eq("language.lang", lang)
      .order("updated_at", { ascending: false }),
    supabase
      .from("photo")
      .select(`slug, updated_at, language!inner (lang)`)
      .eq("is_draft", false)
      .eq("language.lang", lang)
      .order("updated_at", { ascending: false }),
    supabase.from("thought").select(`slug, created_at`).order("created_at", { ascending: false }),
  ]);

  const now = new Date().toISOString();
  const articleEntries = entryMarkup(toRecordArray(articleResult.data), "updated_at", baseUrl, lang, "article", "daily", "1.0");
  const albumEntries = entryMarkup(toRecordArray(albumResult.data), "updated_at", baseUrl, lang, "album", "daily", "0.8");
  const thoughtEntries = entryMarkup(toRecordArray(thoughtResult.data), "created_at", baseUrl, lang, "thought", "hourly", "0.6");

  const staticPaths = ["", "about", "site", "contact", "rss", "book", "terms-of-use"];
  const staticEntries = staticPaths
    .map((p) => {
      const loc = p ? `${baseUrl}/${lang}/${p}` : `${baseUrl}/${lang}`;
      const prio = p === "" ? "1.0" : "0.5";
      const freq = p === "" ? "daily" : "monthly";
      return `<url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`;
    })
    .join("\n  ");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${articleEntries}
  ${albumEntries}
  ${thoughtEntries}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
