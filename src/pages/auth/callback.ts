import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
  const url = new URL(ctx.request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const errorDescription = url.searchParams.get("error_description") ?? undefined;

  if (code) {
    const supabase = ctx.locals.supabase;
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirect(next);
    const reason = encodeURIComponent(error.message ?? "exchange_failed");
    return redirect(`/auth/auth-code-error?next=${encodeURIComponent(next)}&reason=${reason}`);
  }

  const SUPPORTED = ["zh", "en", "jp"] as const;
  const lang = (() => {
    const seg = next.split("/").filter(Boolean)[0];
    return seg && (SUPPORTED as readonly string[]).includes(seg) ? seg : "zh";
  })();
  const reason =
    errorDescription ??
    url.searchParams.get("error") ??
    url.searchParams.get("message") ??
    "unknown";

  return redirect(
    `/auth/auth-code-error?next=${encodeURIComponent(next)}&reason=${encodeURIComponent(reason)}&lang=${lang}`,
  );
};

function redirect(location: string): Response {
  return new Response(null, { status: 303, headers: { Location: location } });
}
