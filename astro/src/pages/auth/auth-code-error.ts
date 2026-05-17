import type { APIRoute } from "astro";
import { ConfirmText } from "~/locales";
import getLanguageLabel from "~/lib/i18n/getLanguageLabel";

export const prerender = false;

const SUPPORTED = ["zh", "en", "jp"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function deriveLang(input?: string | null): SupportedLang {
  if (!input) return "zh";
  try {
    const u = new URL(input, "http://placeholder");
    const seg = u.pathname.split("/").filter(Boolean)[0];
    if (seg && (SUPPORTED as readonly string[]).includes(seg)) return seg as SupportedLang;
  } catch {
    const seg = input.split("/").filter(Boolean)[0];
    if (seg && (SUPPORTED as readonly string[]).includes(seg)) return seg as SupportedLang;
  }
  return "zh";
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPE_MAP[c] ?? c);
}

export const GET: APIRoute = async (ctx) => {
  const url = new URL(ctx.request.url);
  const next = url.searchParams.get("next") ?? "/";
  const reason = url.searchParams.get("reason") ?? "unknown";
  const providedLang = url.searchParams.get("lang");
  const lang =
    providedLang && (SUPPORTED as readonly string[]).includes(providedLang)
      ? (providedLang as SupportedLang)
      : deriveLang(next);
  const labels = getLanguageLabel(ConfirmText, lang);
  const loginPath = `/${lang}/login`;

  const reasonBlock =
    reason !== "unknown"
      ? `<p class="mt-2 text-xs text-zinc-400 text-center break-words">${escapeHtml(reason)}</p>`
      : "";

  const html = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(labels.title)}</title>
    <link rel="stylesheet" href="/_astro/global.css" />
  </head>
  <body class="min-h-screen bg-zinc-50 flex flex-col justify-center px-4 py-16">
    <div class="mx-auto w-full max-w-md bg-white p-10 shadow sm:rounded-lg">
      <h1 class="text-2xl font-semibold text-zinc-900 text-center">${escapeHtml(labels.title)}</h1>
      <p class="mt-4 text-sm text-zinc-600 text-center">${escapeHtml(labels.invalid)}</p>
      ${reasonBlock}
      <div class="mt-8 space-y-3">
        <a href="${loginPath}" class="block w-full text-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">${escapeHtml(labels.back_to_login)}</a>
      </div>
    </div>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
