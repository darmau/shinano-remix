globalThis.process ??= {}; globalThis.process.env ??= {};
import { C as ConfirmText } from '../../../chunks/confirm_CZtF0HHS.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const SUPPORTED = ["zh", "en", "jp"];
function pickLang(value) {
  if (value && SUPPORTED.includes(value)) {
    return value;
  }
  return "zh";
}
async function syncUserToPublicTable(supabase, userId, username, website) {
  try {
    const { data: existing } = await supabase.from("users").select("id").eq("user_id", userId).maybeSingle();
    if (existing) {
      await supabase.from("users").update({ name: username, website }).eq("user_id", userId);
    } else {
      await supabase.from("users").insert({ user_id: userId, name: username, website });
    }
  } catch (err) {
    console.error("Sync user failed:", err);
  }
}
const POST = async (ctx) => {
  new URL(ctx.request.url);
  const formData = await ctx.request.formData();
  const username = formData.get("username")?.trim();
  const websiteInput = formData.get("website")?.trim() ?? "";
  const nextPath = formData.get("next") ?? "/zh";
  const lang = pickLang(formData.get("lang"));
  const labels = ConfirmText[lang];
  const supabase = ctx.locals.supabase;
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const redirectToForm = (err, values) => {
    const params = new URLSearchParams({
      needs_username: "true",
      next: nextPath,
      err
    });
    if (values?.username) params.set("username", values.username);
    if (values?.website) params.set("website", values.website);
    return redirect(`/auth/confirm?${params.toString()}`);
  };
  if (!session?.user) return redirectToForm(labels.invalid);
  if (!username)
    return redirectToForm(labels.username_required, { website: websiteInput });
  let website = null;
  if (websiteInput) {
    const normalized = websiteInput.startsWith("http://") || websiteInput.startsWith("https://") ? websiteInput : `https://${websiteInput}`;
    try {
      website = new URL(normalized).toString();
    } catch {
      return redirectToForm(labels.website_invalid, { username, website: websiteInput });
    }
  }
  const { error: updateError } = await supabase.auth.updateUser({
    data: { name: username, email: session.user.email, website }
  });
  if (updateError) {
    console.error("updateUser failed:", updateError);
    return redirectToForm(labels.invalid, { username, website: websiteInput });
  }
  await syncUserToPublicTable(supabase, session.user.id, username, website);
  return redirect(nextPath);
};
function redirect(location) {
  return new Response(null, { status: 303, headers: { Location: location } });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
