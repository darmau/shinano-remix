globalThis.process ??= {}; globalThis.process.env ??= {};
import { C as ConfirmText } from '../../chunks/confirm_CZtF0HHS.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const SUPPORTED = ["zh", "en", "jp"];
function deriveLang(input) {
  if (!input) return "zh";
  try {
    const u = new URL(input, "http://placeholder");
    const seg = u.pathname.split("/").filter(Boolean)[0];
    if (seg && SUPPORTED.includes(seg)) return seg;
  } catch {
    const seg = input.split("/").filter(Boolean)[0];
    if (seg && SUPPORTED.includes(seg)) return seg;
  }
  return "zh";
}
function redirect(location) {
  return new Response(null, { status: 303, headers: { Location: location } });
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
const HTML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPE_MAP[c] ?? c);
}
const AUTH_PAGE_STYLE = `<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fafafa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #18181b; }
  .card { width: 100%; max-width: 28rem; margin: 0 1rem; padding: 2.5rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
  h1 { margin: 0; font-size: 1.5rem; font-weight: 600; text-align: center; }
  p.body { margin: 1rem 0 0; font-size: 0.875rem; color: #52525b; text-align: center; }
  .btn { display: block; width: 100%; margin-top: 2rem; padding: 0.5rem 1rem; background: #7c3aed; color: #fff; text-align: center; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; }
  .btn:hover { background: #6d28d9; }
  .field { margin-top: 1rem; }
  .field label { display: block; font-size: 0.875rem; font-weight: 500; color: #3f3f46; margin-bottom: 0.5rem; }
  .field input { width: 100%; padding: 0.5rem; border-radius: 0.375rem; border: 1px solid #d4d4d8; font-size: 0.875rem; box-sizing: border-box; }
  .field .hint { margin-top: 0.25rem; font-size: 0.75rem; color: #71717a; }
  .err { margin-top: 1rem; padding: 0.75rem; background: #fef2f2; color: #b91c1c; border-radius: 0.375rem; font-size: 0.875rem; text-align: center; }
</style>`;
const GET = async (ctx) => {
  const url = new URL(ctx.request.url);
  const redirectParam = url.searchParams.get("redirect");
  const needsUsernameParam = url.searchParams.get("needs_username");
  const emailParam = url.searchParams.get("email");
  const nextQuery = url.searchParams.get("next") ?? "/zh";
  const lang = deriveLang(nextQuery);
  const supabase = ctx.locals.supabase;
  let userEmail = null;
  if (needsUsernameParam === "true") {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session?.user) return redirect(`/${lang}/login?error=magic_link`);
    userEmail = emailParam || session.user.email || null;
  } else if (redirectParam) {
    try {
      const redirectUrl = new URL(redirectParam);
      const token = redirectUrl.searchParams.get("token");
      const type = redirectUrl.searchParams.get("type");
      const code = redirectUrl.searchParams.get("code");
      let verifyError = null;
      let tokenFound = false;
      if (code) {
        tokenFound = true;
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        verifyError = error;
      } else if (token && type) {
        tokenFound = true;
        const { error } = await supabase.auth.verifyOtp({ token_hash: token, type });
        verifyError = error;
      }
      if (!tokenFound || verifyError) {
        return redirect(`/${lang}/login?error=magic_link`);
      }
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!session?.user) return redirect(`/${lang}/login?error=magic_link`);
      const hasUsername = !!session.user.user_metadata?.name;
      if (hasUsername) {
        await syncUserToPublicTable(
          supabase,
          session.user.id,
          session.user.user_metadata.name,
          session.user.user_metadata.website ?? null
        );
        return redirect(nextQuery);
      }
      return redirect(
        `/auth/confirm?needs_username=true&email=${encodeURIComponent(session.user.email || "")}&next=${encodeURIComponent(nextQuery)}`
      );
    } catch (err) {
      console.error("Confirm GET error:", err);
      return redirect(`/${lang}/login?error=magic_link`);
    }
  } else {
    return redirect(`/${lang}/login?error=magic_link`);
  }
  const labels = getLanguageLabel(ConfirmText, lang);
  const errorParam = url.searchParams.get("err");
  const prevUsername = url.searchParams.get("username") ?? "";
  const prevWebsite = url.searchParams.get("website") ?? "";
  const errorBlock = errorParam ? `<div class="err">${escapeHtml(errorParam)}</div>` : "";
  const emailHint = userEmail ? `<p class="hint">Email: ${escapeHtml(userEmail)}</p>` : "";
  const html = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(labels.title)}</title>
    ${AUTH_PAGE_STYLE}
  </head>
  <body>
    <main class="card">
      <h1>${escapeHtml(labels.title)}</h1>
      <p class="body">${escapeHtml(labels.new_user_description)}</p>
      ${errorBlock}
      <form method="POST" action="/api/auth/confirm">
        <input type="hidden" name="next" value="${escapeHtml(nextQuery)}" />
        <input type="hidden" name="lang" value="${lang}" />
        <div class="field">
          <label for="username">${escapeHtml(labels.username_label)}</label>
          <input type="text" id="username" name="username" required placeholder="${escapeHtml(labels.username_placeholder)}" value="${escapeHtml(prevUsername)}" />
          ${emailHint}
        </div>
        <div class="field">
          <label for="website">${escapeHtml(labels.website_label)}</label>
          <input type="url" id="website" name="website" placeholder="${escapeHtml(labels.website_placeholder)}" value="${escapeHtml(prevWebsite)}" />
          <p class="hint">${escapeHtml(labels.website_hint)}</p>
        </div>
        <button type="submit" class="btn">${escapeHtml(labels.button)}</button>
      </form>
    </main>
  </body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
