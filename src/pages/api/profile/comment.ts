import type { APIRoute } from "astro";
import { ProfileText } from "~/locales";

export const prerender = false;

const SUPPORTED = ["zh", "en", "jp"] as const;

export const POST: APIRoute = async (ctx) => {
  const formData = await ctx.request.formData();
  const intent = formData.get("intent") as string | null;
  const commentIdRaw = formData.get("commentId") as string | null;
  const userId = formData.get("userId") as string | null;
  const langRaw = (formData.get("lang") as string | null) ?? "zh";
  const lang = (SUPPORTED as readonly string[]).includes(langRaw)
    ? (langRaw as (typeof SUPPORTED)[number])
    : "zh";
  const label = ProfileText[lang] ?? ProfileText.zh;

  const profilePath = userId ? `/${lang}/profile/${userId}` : `/${lang}`;
  const redirect = (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return new Response(null, {
      status: 303,
      headers: { Location: qs ? `${profilePath}?${qs}` : profilePath },
    });
  };

  const supabase = ctx.locals.supabase;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userId || session.user.id !== userId) {
    return redirect({ error: label.unauthorized });
  }
  const commentId = commentIdRaw ? parseInt(commentIdRaw, 10) : NaN;
  if (!Number.isFinite(commentId)) return redirect({ error: "Invalid comment id" });

  const { data: publicUser } = await supabase
    .from("users")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();
  if (!publicUser) return redirect({ error: label.unauthorized });

  const { data: comment } = await supabase
    .from("comment")
    .select("id, user_id")
    .eq("id", commentId)
    .maybeSingle();
  if (!comment || comment.user_id !== publicUser.id) {
    return redirect({ error: label.unauthorized });
  }

  if (intent === "delete") {
    const { error } = await supabase.from("comment").delete().eq("id", commentId);
    if (error) return redirect({ error: label.delete_error });
    return redirect({ status: "ok" });
  }

  if (intent === "toggle_notification") {
    const currentValue = formData.get("currentValue") === "true";
    const { error } = await supabase
      .from("comment")
      .update({ receive_notification: !currentValue } as never)
      .eq("id", commentId);
    if (error) return redirect({ error: label.update_error });
    return redirect({ status: "ok" });
  }

  return redirect({ error: "Unknown action" });
};
