import type {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {createClient} from "~/utils/supabase/server";

type SitemapArticle = {
  slug: string | null;
  updated_at: string | null;
};

type SitemapAlbum = {
  slug: string | null;
  updated_at: string | null;
};

type SitemapThought = {
  slug: string | null;
  created_at: string | null;
};

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {supabase} = createClient(request, context);
  const lang = params.lang as string;
  const baseUrl = context.cloudflare.env.BASE_URL;

  const {data: articles} = await supabase
    .from('article')
    .select<SitemapArticle>(`
      slug,
      updated_at,
      language!inner (lang)
    `)
    .eq('is_draft', false)
    .eq('language.lang', lang)
    .order('updated_at', {ascending: false});

  const {data: albums} = await supabase
    .from('photo')
    .select<SitemapAlbum>(`
      slug,
      updated_at,
      language!inner (lang)
    `)
    .eq('is_draft', false)
    .eq('language.lang', lang)
    .order('updated_at', {ascending: false});

  const {data: thoughts} = await supabase
    .from('thought')
    .select<SitemapThought>(`
      slug,
      created_at
    `)
    .order('created_at', {ascending: false});

  const now = new Date().toISOString();

  const articleEntries = (articles ?? [])
      .filter((article): article is SitemapArticle & { slug: string; updated_at: string } => Boolean(article?.slug) && Boolean(article?.updated_at))
      .map((article) => `
            <url>
                <loc>${baseUrl}/${lang}/article/${article.slug}</loc>
                <lastmod>${article.updated_at}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>`)
      .join("");

  const albumEntries = (albums ?? [])
      .filter((album): album is SitemapAlbum & { slug: string; updated_at: string } => Boolean(album?.slug) && Boolean(album?.updated_at))
      .map((album) => `
            <url>
                <loc>${baseUrl}/${lang}/album/${album.slug}</loc>
                <lastmod>${album.updated_at}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
            </url>`)
      .join("");

  const thoughtEntries = (thoughts ?? [])
      .filter((thought): thought is SitemapThought & { slug: string; created_at: string } => Boolean(thought?.slug) && Boolean(thought?.created_at))
      .map((thought) => `
            <url>
                <loc>${baseUrl}/${lang}/thought/${thought.slug}</loc>
                <lastmod>${thought.created_at}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>0.6</priority>
            </url>`)
      .join("");

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}/${lang}</loc>
            <lastmod>${now}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${baseUrl}/${lang}/about</loc>
            <lastmod>${now}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${baseUrl}/${lang}/site</loc>
            <lastmod>${now}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${baseUrl}/${lang}/contact</loc>
            <lastmod>${now}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${baseUrl}/${lang}/rss</loc>
            <lastmod>${now}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${baseUrl}/${lang}/book</loc>
            <lastmod>${now}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>
        ${articleEntries}

        ${albumEntries}

        ${thoughtEntries}
    </urlset>
  `

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8"
    }
  });
}
