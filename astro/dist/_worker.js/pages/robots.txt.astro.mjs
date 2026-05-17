globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const GET = async (ctx) => {
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
    ""
  ].join("\n");
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
