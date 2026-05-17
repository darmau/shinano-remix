globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const GET = async (ctx) => {
  const url = new URL(ctx.request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const errorDescription = url.searchParams.get("error_description") ?? void 0;
  if (code) {
    const supabase = ctx.locals.supabase;
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect(next);
    const reason2 = encodeURIComponent(error.message ?? "exchange_failed");
    return redirect(`/auth/auth-code-error?next=${encodeURIComponent(next)}&reason=${reason2}`);
  }
  const SUPPORTED = ["zh", "en", "jp"];
  const lang = (() => {
    const seg = next.split("/").filter(Boolean)[0];
    return seg && SUPPORTED.includes(seg) ? seg : "zh";
  })();
  const reason = errorDescription ?? url.searchParams.get("error") ?? url.searchParams.get("message") ?? "unknown";
  return redirect(
    `/auth/auth-code-error?next=${encodeURIComponent(next)}&reason=${encodeURIComponent(reason)}&lang=${lang}`
  );
};
function redirect(location) {
  return new Response(null, { status: 303, headers: { Location: location } });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
