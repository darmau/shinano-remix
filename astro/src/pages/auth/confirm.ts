import type { APIRoute } from "astro";
import type { EmailOtpType, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";
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

function redirect(location: string): Response {
  return new Response(null, { status: 303, headers: { Location: location } });
}

async function syncUserToPublicTable(
  supabase: SupabaseClient<Database>,
  userId: string,
  username: string,
  website: string | null,
) {
  try {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("users")
        .update({ name: username, website } as never)
        .eq("user_id", userId);
    } else {
      await supabase
        .from("users")
        .insert({ user_id: userId, name: username, website } as never);
    }
  } catch (err) {
    console.error("Sync user failed:", err);
  }
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
  const redirectParam = url.searchParams.get("redirect");
  const needsUsernameParam = url.searchParams.get("needs_username");
  const emailParam = url.searchParams.get("email");
  const nextQuery = url.searchParams.get("next") ?? "/zh";
  const lang = deriveLang(nextQuery);

  const supabase = ctx.locals.supabase;

  let userEmail: string | null = null;

  if (needsUsernameParam === "true") {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return redirect(`/${lang}/login?error=magic_link`);
    userEmail = emailParam || session.user.email || null;
  } else if (redirectParam) {
    try {
      const redirectUrl = new URL(redirectParam);
      const token = redirectUrl.searchParams.get("token");
      const type = redirectUrl.searchParams.get("type") as EmailOtpType | null;
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
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return redirect(`/${lang}/login?error=magic_link`);

      const hasUsername = !!session.user.user_metadata?.name;
      if (hasUsername) {
        await syncUserToPublicTable(
          supabase,
          session.user.id,
          session.user.user_metadata.name as string,
          (session.user.user_metadata.website as string | undefined) ?? null,
        );
        return redirect(nextQuery);
      }

      return redirect(
        `/auth/confirm?needs_username=true&email=${encodeURIComponent(session.user.email || "")}&next=${encodeURIComponent(nextQuery)}`,
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

  const errorBlock = errorParam
    ? `<div class="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600 text-center">${escapeHtml(errorParam)}</div>`
    : "";
  const emailHint = userEmail
    ? `<p class="text-xs text-zinc-500">Email: ${escapeHtml(userEmail)}</p>`
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
      <p class="mt-4 text-sm text-zinc-600 text-center">${escapeHtml(labels.new_user_description)}</p>
      ${errorBlock}
      <form method="POST" action="/api/auth/confirm" class="mt-8 space-y-4">
        <input type="hidden" name="next" value="${escapeHtml(nextQuery)}" />
        <input type="hidden" name="lang" value="${lang}" />
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-zinc-700">${escapeHtml(labels.username_label)}</label>
          <input type="text" id="username" name="username" required placeholder="${escapeHtml(labels.username_placeholder)}" value="${escapeHtml(prevUsername)}" class="block w-full rounded-md border-0 p-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
          ${emailHint}
        </div>
        <div class="space-y-2">
          <label for="website" class="block text-sm font-medium text-zinc-700">${escapeHtml(labels.website_label)}</label>
          <input type="url" id="website" name="website" placeholder="${escapeHtml(labels.website_placeholder)}" value="${escapeHtml(prevWebsite)}" class="block w-full rounded-md border-0 p-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
          <p class="text-xs text-zinc-500">${escapeHtml(labels.website_hint)}</p>
        </div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">${escapeHtml(labels.button)}</button>
      </form>
    </div>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
