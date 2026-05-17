import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const supabase = ctx.locals.supabase;
  const formData = await ctx.request.formData();
  const lang = (formData.get("lang") as string) || "zh";
  const redirectBase = `/${lang}/contact`;
  const redirect = (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return new Response(null, {
      status: 303,
      headers: { Location: `${redirectBase}?${qs}` },
    });
  };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect({ error: "未登录用户无法提交信息" });

  const contactType = formData.get("contact_type");
  const contact = formData.get("contact");
  const message = formData.get("message");

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, user_id, name")
    .eq("user_id", session.user.id)
    .single();

  if (userError || !user) {
    return redirect({ error: userError?.message ?? "User not exists" });
  }

  const row = {
    user_id: user.id,
    name: user.name,
    contact_type: contactType,
    contact_detail: contact,
    message,
  } as never;

  const { error } = await supabase.from("message").insert(row);
  if (error) return redirect({ error: error.message });

  return redirect({ status: "ok" });
};
