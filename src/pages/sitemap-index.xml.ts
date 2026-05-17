import type { APIRoute } from "astro";
import { getPublicEnv } from "~/lib/env";

export const prerender = true;

export const GET: APIRoute = async (ctx) => {
  const baseUrl = getPublicEnv(ctx.locals).BASE_URL;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/zh/sitemap.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/en/sitemap.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/jp/sitemap.xml</loc></sitemap>
</sitemapindex>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
