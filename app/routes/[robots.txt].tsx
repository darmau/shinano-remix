import type { LoaderFunctionArgs } from "react-router";
import {createClient} from "~/utils/supabase/server";

export const loader = async ({request, context}: LoaderFunctionArgs) => {
  const {supabase} = createClient(request, context);
  const baseUrl = context.cloudflare.env.BASE_URL;

  const {data: premiumArticles} = await supabase
    .from('article')
    .select(`
      slug,
      language!inner (lang)
    `)
    .eq('is_premium', true)
    .eq('is_draft', false);

  const premiumDisallowLines = (premiumArticles ?? [])
    .filter((article): article is {slug: string; language: {lang: string | null}} => Boolean(article.slug) && Boolean(article.language?.lang))
    .map((article) => `Disallow: /${article.language!.lang}/article/${article.slug}`);

  const robotText = [
    "User-agent: Googlebot",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /*/login",
    "Disallow: /en/thought/",
    "Disallow: /jp/thought/",
    "Disallow: /en/book",
    "Disallow: /jp/book",
    ...premiumDisallowLines,
    "",
    `Sitemap: ${baseUrl}/sitemap-index.xml`,
    ""
  ].join("\n");
  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText,{
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    }
  });
};
