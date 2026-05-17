globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const POST = async (ctx) => {
  const url = new URL(ctx.request.url);
  const formData = await ctx.request.formData();
  const rawLang = formData.get("lang")?.trim();
  const lang = rawLang && ["zh", "en", "jp"].includes(rawLang) ? rawLang : "zh";
  const next = url.searchParams.get("next") ?? `/${lang}`;
  const supabase = ctx.locals.supabase;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });
  if (error || !data.url) {
    console.error("GitHub OAuth init failed:", error);
    return new Response(null, {
      status: 303,
      headers: { Location: `/${lang}/login?error=oauth_init_failed` }
    });
  }
  return new Response(null, {
    status: 303,
    headers: { Location: data.url }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
