import type { APIRoute } from "astro";
import { getPublicEnv } from "~/lib/env";

export const prerender = true;

export const GET: APIRoute = async (ctx) => {
  const baseUrl = getPublicEnv(ctx.locals).BASE_URL;

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
