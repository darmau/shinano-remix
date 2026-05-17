globalThis.process ??= {}; globalThis.process.env ??= {};
import { U as UnsubscribeText, v as verifyUnsubscribeToken } from '../../chunks/unsubscribeToken_AVXI0DPU.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const SUPPORTED = ["zh", "en", "jp"];
const POST = async (ctx) => {
  const formData = await ctx.request.formData();
  const token = formData.get("token");
  const langRaw = formData.get("lang") ?? "zh";
  const lang = SUPPORTED.includes(langRaw) ? langRaw : "zh";
  const labels = UnsubscribeText[lang] ?? UnsubscribeText.zh;
  const redirect = (params) => {
    const qs = new URLSearchParams({ ...params, token: typeof token === "string" ? token : "" }).toString();
    return new Response(null, {
      status: 303,
      headers: { Location: `/${lang}/unsubscribe?${qs}` }
    });
  };
  if (!token || typeof token !== "string") {
    return redirect({ error: labels.error_missing_token });
  }
  const secret = ctx.locals.runtime.env.UNSUBSCRIBE_KEY;
  if (!secret) return redirect({ error: labels.error_config });
  const commentId = await verifyUnsubscribeToken(token, secret);
  if (!commentId) return redirect({ error: labels.error_invalid_token });
  const supabase = ctx.locals.supabase;
  const { error } = await supabase.from("comment").update({ receive_notification: false }).eq("id", commentId);
  if (error) {
    console.error("Failed to unsubscribe:", error);
    return redirect({ error: labels.error_generic });
  }
  return new Response(null, {
    status: 303,
    headers: { Location: `/${lang}/unsubscribe?status=ok` }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
