globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const isTurnstileOutcome = (value) => typeof value === "object" && value !== null && typeof value.success === "boolean";
const parseTurnstileOutcome = (value) => {
  if (!isTurnstileOutcome(value)) {
    throw new Error("Invalid Turnstile response");
  }
  return value;
};

function getClientIp(request) {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp && cfConnectingIp.trim() !== "") {
    return cfConnectingIp.trim();
  }
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (!xForwardedFor) return null;
  const firstIp = xForwardedFor.split(",")[0]?.trim();
  return firstIp && firstIp !== "" ? firstIp : null;
}

const prerender = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const errorJson = (error, status = 400) => json({ success: false, error, comment: null }, status);
const CONTENT_COLUMNS = /* @__PURE__ */ new Set(["to_article", "to_album", "to_thought"]);
const POST = async (ctx) => {
  const supabase = ctx.locals.supabase;
  const env = ctx.locals.runtime.env;
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const formData = await ctx.request.formData();
  const content_text = formData.get("content_text")?.trim();
  if (!content_text) return errorJson("Empty comment", 400);
  let contentColumn = null;
  let contentId = null;
  for (const col of CONTENT_COLUMNS) {
    const raw = formData.get(col);
    if (typeof raw === "string" && raw.trim() !== "") {
      contentColumn = col;
      contentId = parseInt(raw, 10);
      break;
    }
  }
  if (!contentColumn || !contentId || Number.isNaN(contentId)) {
    return errorJson("Missing content reference", 400);
  }
  const replyToRaw = formData.get("reply_to");
  const reply_to = typeof replyToRaw === "string" && replyToRaw.trim() !== "" ? parseInt(replyToRaw, 10) : null;
  const receiveNotification = formData.get("receive_notification") === "true";
  const ipAddress = getClientIp(ctx.request);
  if (!session) {
    const turnstileToken = formData.get("cf-turnstile-response");
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken
        })
      }
    );
    const outcome = parseTurnstileOutcome(await turnstileResponse.json());
    if (!outcome.success) return errorJson("验证失败,请重试。", 400);
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const website = formData.get("website")?.trim() || null;
    if (!name || !email) return errorJson("Missing name or email", 400);
    const anonRow = {
      name,
      email,
      website,
      content_text,
      [contentColumn]: contentId,
      is_anonymous: true,
      reply_to,
      receive_notification: receiveNotification,
      ip: ipAddress
    };
    const { data: newComment2, error: error2 } = await supabase.from("comment").insert(anonRow).select(
      `id, name, content_text, created_at, is_anonymous,
         reply_to (id, content_text, is_anonymous)`
    ).single();
    if (error2) return errorJson(error2.message, 500);
    return json({
      success: "提交成功，请等待审核。Please wait for review.",
      error: null,
      comment: newComment2
    });
  }
  const { data: userProfile } = await supabase.from("users").select("id, user_id, name").eq("user_id", session.user.id).single();
  if (!userProfile) return errorJson("User not exists", 400);
  const userRow = {
    user_id: userProfile.id,
    content_text,
    [contentColumn]: contentId,
    is_anonymous: false,
    reply_to,
    receive_notification: receiveNotification,
    ip: ipAddress
  };
  const { data: newComment, error } = await supabase.from("comment").insert(userRow).select(
    `id, user_id, content_text, created_at, is_anonymous,
       users (id, name),
       reply_to (id, content_text, users (id, name))`
  ).single();
  if (error) return errorJson(error.message, 500);
  return json({
    success: "评论成功。Comment success.",
    error: null,
    comment: newComment
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
