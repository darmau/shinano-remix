globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const POST = async (ctx) => {
  const supabase = ctx.locals.supabase;
  const formData = await ctx.request.formData();
  const lang = formData.get("lang") || "zh";
  const redirectBase = `/${lang}/contact`;
  const redirect = (params) => {
    const qs = new URLSearchParams(params).toString();
    return new Response(null, {
      status: 303,
      headers: { Location: `${redirectBase}?${qs}` }
    });
  };
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return redirect({ error: "未登录用户无法提交信息" });
  const contactType = formData.get("contact_type");
  const contact = formData.get("contact");
  const message = formData.get("message");
  const { data: user, error: userError } = await supabase.from("users").select("id, user_id, name").eq("user_id", session.user.id).single();
  if (userError || !user) {
    return redirect({ error: userError?.message ?? "User not exists" });
  }
  const row = {
    user_id: user.id,
    name: user.name,
    contact_type: contactType,
    contact_detail: contact,
    message
  };
  const { error } = await supabase.from("message").insert(row);
  if (error) return redirect({ error: error.message });
  return redirect({ status: "ok" });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
