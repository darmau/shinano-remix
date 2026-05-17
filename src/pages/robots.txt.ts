import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
  const baseUrl = ctx.locals.runtime.env.BASE_URL;

  const body = [
    "User-agent: Googlebot",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /*/login",
    "Disallow: /*/unsubscribe",
    "Disallow: /auth/*",
    "",
    `Sitemap: ${baseUrl}/sitemap-index.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
