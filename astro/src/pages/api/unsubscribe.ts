import type { APIRoute } from "astro";
import { UnsubscribeText } from "~/locales";
import { verifyUnsubscribeToken } from "~/lib/auth/unsubscribeToken";

export const prerender = false;

const SUPPORTED = ["zh", "en", "jp"] as const;

export const POST: APIRoute = async (ctx) => {
  const formData = await ctx.request.formData();
  const token = formData.get("token");
  const langRaw = (formData.get("lang") as string | null) ?? "zh";
  const lang = (SUPPORTED as readonly string[]).includes(langRaw)
    ? (langRaw as (typeof SUPPORTED)[number])
    : "zh";
  const labels = UnsubscribeText[lang] ?? UnsubscribeText.zh;

  const redirect = (params: Record<string, string>) => {
    const qs = new URLSearchParams({ ...params, token: typeof token === "string" ? token : "" }).toString();
    return new Response(null, {
      status: 303,
      headers: { Location: `/${lang}/unsubscribe?${qs}` },
    });
  };

  if (!token || typeof token !== "string") {
    return redirect({ error: labels.error_missing_token });
  }

  const secret = ctx.locals.runtime.env.UNSUBSCRIBE_KEY;
  if (!secret) return redirect({ error: labels.error_config });

  const commentId = await verifyUnsubscribeToken(token, secret);
  if (!commentId) return redirect({ error: labels.error_invalid_token });

  const supabase = ctx.locals.supabase;
  const { error } = await supabase
    .from("comment")
    .update({ receive_notification: false } as never)
    .eq("id", commentId);
  if (error) {
    console.error("Failed to unsubscribe:", error);
    return redirect({ error: labels.error_generic });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/${lang}/unsubscribe?status=ok` },
  });
};
