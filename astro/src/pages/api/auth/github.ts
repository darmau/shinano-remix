import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const url = new URL(ctx.request.url);
  const formData = await ctx.request.formData();
  const rawLang = (formData.get("lang") as string | null)?.trim();
  const lang = rawLang && ["zh", "en", "jp"].includes(rawLang) ? rawLang : "zh";
  const next = url.searchParams.get("next") ?? `/${lang}`;

  const supabase = ctx.locals.supabase;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) {
    console.error("GitHub OAuth init failed:", error);
    return Response.redirect(
      new URL(`/${lang}/login?error=oauth_init_failed`, url),
      303,
    );
  }

  return Response.redirect(data.url, 303);
};
