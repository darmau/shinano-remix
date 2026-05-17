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
  p.reason { margin: 0.5rem 0 0; font-size: 0.75rem; color: #a1a1aa; text-align: center; word-break: break-word; }
  .btn { display: block; margin-top: 2rem; padding: 0.5rem 1rem; background: #7c3aed; color: #fff; text-decoration: none; text-align: center; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; }
  .btn:hover { background: #6d28d9; }
  .field { margin-top: 1rem; }
  .field label { display: block; font-size: 0.875rem; font-weight: 500; color: #3f3f46; margin-bottom: 0.5rem; }
  .field input { width: 100%; padding: 0.5rem; border-radius: 0.375rem; border: 1px solid #d4d4d8; font-size: 0.875rem; box-sizing: border-box; }
  .field .hint { margin-top: 0.25rem; font-size: 0.75rem; color: #71717a; }
  .err { margin-top: 1rem; padding: 0.75rem; background: #fef2f2; color: #b91c1c; border-radius: 0.375rem; font-size: 0.875rem; text-align: center; }
</style>`;
const GET = async (ctx) => {
  const url = new URL(ctx.request.url);
  const next = url.searchParams.get("next") ?? "/";
  const reason = url.searchParams.get("reason") ?? "unknown";
  const providedLang = url.searchParams.get("lang");
  const lang = providedLang && SUPPORTED.includes(providedLang) ? providedLang : deriveLang(next);
  const labels = getLanguageLabel(ConfirmText, lang);
  const loginPath = `/${lang}/login`;
  const reasonBlock = reason !== "unknown" ? `<p class="reason">${escapeHtml(reason)}</p>` : "";
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
      <p class="body">${escapeHtml(labels.invalid)}</p>
      ${reasonBlock}
      <a href="${loginPath}" class="btn">${escapeHtml(labels.back_to_login)}</a>
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
