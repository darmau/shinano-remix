import type { APIRoute } from "astro";
import { ConfirmText } from "~/locales";

export const prerender = false;

const SUPPORTED = ["zh", "en", "jp"] as const;

function pickLang(value: string | null | undefined): "zh" | "en" | "jp" {
  if (value && (SUPPORTED as readonly string[]).includes(value)) {
    return value as "zh" | "en" | "jp";
  }
  return "zh";
}

async function syncUserToPublicTable(
  supabase: App.Locals["supabase"],
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
      await supabase.from("users").update({ name: username, website }).eq("user_id", userId);
    } else {
      await supabase
        .from("users")
        .insert({ user_id: userId, name: username, website } as never);
    }
  } catch (err) {
    console.error("Sync user failed:", err);
  }
}

export const POST: APIRoute = async (ctx) => {
  const url = new URL(ctx.request.url);
  const formData = await ctx.request.formData();
  const username = (formData.get("username") as string | null)?.trim();
  const websiteInput = (formData.get("website") as string | null)?.trim() ?? "";
  const nextPath = (formData.get("next") as string | null) ?? "/zh";
  const lang = pickLang(formData.get("lang") as string | null);
  const labels = ConfirmText[lang];

  const supabase = ctx.locals.supabase;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const redirectToForm = (err: string, values?: { username?: string; website?: string }) => {
    const params = new URLSearchParams({
      needs_username: "true",
      next: nextPath,
      err,
    });
    if (values?.username) params.set("username", values.username);
    if (values?.website) params.set("website", values.website);
    return Response.redirect(new URL(`/auth/confirm?${params.toString()}`, url), 303);
  };

  if (!session?.user) return redirectToForm(labels.invalid);
  if (!username)
    return redirectToForm(labels.username_required, { website: websiteInput });

  let website: string | null = null;
  if (websiteInput) {
    const normalized =
      websiteInput.startsWith("http://") || websiteInput.startsWith("https://")
        ? websiteInput
        : `https://${websiteInput}`;
    try {
      website = new URL(normalized).toString();
    } catch {
      return redirectToForm(labels.website_invalid, { username, website: websiteInput });
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: { name: username, email: session.user.email, website },
  });
  if (updateError) {
    console.error("updateUser failed:", updateError);
    return redirectToForm(labels.invalid, { username, website: websiteInput });
  }

  await syncUserToPublicTable(supabase, session.user.id, username, website);

  return Response.redirect(new URL(nextPath, url), 303);
};
