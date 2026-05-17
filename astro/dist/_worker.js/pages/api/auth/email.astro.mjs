globalThis.process ??= {}; globalThis.process.env ??= {};
import { S as SignupText } from '../../../chunks/signup_BliVJK_o.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const POST = async (ctx) => {
  const formData = await ctx.request.formData();
  const email = formData.get("email")?.trim();
  const rawLang = formData.get("lang")?.trim();
  const lang = rawLang && ["zh", "en", "jp"].includes(rawLang) ? rawLang : "zh";
  const url = new URL(ctx.request.url);
  const next = url.searchParams.get("next") ?? `/${lang}`;
  const labels = SignupText[lang] ?? SignupText.zh;
  if (!email) {
    return redirect(`/${lang}/login?error=${encodeURIComponent(labels.email_required)}&next=${encodeURIComponent(next)}`);
  }
  const supabase = ctx.locals.supabase;
  const emailRedirectTo = `${url.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo, shouldCreateUser: true }
  });
  if (error) {
    console.error("Magic link error:", error);
    return redirect(`/${lang}/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }
  return redirect(`/${lang}/login?sent=1&next=${encodeURIComponent(next)}`);
};
function redirect(location) {
  return new Response(null, {
    status: 303,
    headers: { Location: location }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
