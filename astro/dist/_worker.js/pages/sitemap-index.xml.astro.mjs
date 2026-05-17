globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const GET = async (ctx) => {
  const baseUrl = ctx.locals.runtime.env.BASE_URL;
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
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
