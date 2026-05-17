import type { APIRoute } from "astro";
import { SignupText } from "~/locales";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const formData = await ctx.request.formData();
  const email = (formData.get("email") as string | null)?.trim();
  const rawLang = (formData.get("lang") as string | null)?.trim();
  const lang = rawLang && ["zh", "en", "jp"].includes(rawLang) ? rawLang : "zh";

  const url = new URL(ctx.request.url);
  const next = url.searchParams.get("next") ?? `/${lang}`;

  const labels = SignupText[lang as keyof typeof SignupText] ?? SignupText.zh;

  if (!email) {
    return redirect(`/${lang}/login?error=${encodeURIComponent(labels.email_required)}&next=${encodeURIComponent(next)}`);
  }

  const supabase = ctx.locals.supabase;
  const emailRedirectTo = `${url.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo, shouldCreateUser: true },
  });

  if (error) {
    console.error("Magic link error:", error);
    return redirect(`/${lang}/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  return redirect(`/${lang}/login?sent=1&next=${encodeURIComponent(next)}`);
};

function redirect(location: string): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: location },
  });
}
