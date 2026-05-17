globalThis.process ??= {}; globalThis.process.env ??= {};
const UnsubscribeText = {
  zh: {
    title: "取消评论通知",
    description: "确认后将不再接收该评论的回复邮件通知。",
    confirm_title: "确认取消订阅",
    confirm_description: "确认后，当有人回复您的评论时，您将不会再收到邮件提醒。",
    confirm_button: "确认取消订阅",
    success_title: "取消订阅成功",
    success_description: "您已成功取消该评论的回复通知。",
    already_title: "已经取消订阅",
    already_description: "您已经关闭了该评论的回复提醒。",
    error_title: "无法取消订阅",
    error_missing_token: "链接缺少取消订阅令牌。",
    error_invalid_token: "链接无效或已过期，请重新打开邮件中的取消订阅链接。",
    error_not_found: "评论不存在或已被删除。",
    error_config: "服务配置缺失，暂时无法取消订阅，请稍后再试。",
    error_generic: "取消订阅失败，请稍后重试。",
    home_button: "返回主页",
    pending: "处理中…"
  },
  en: {
    title: "Unsubscribe From Reply Emails",
    description: "Confirm to stop receiving email notifications for replies to this comment.",
    confirm_title: "Confirm Unsubscribe",
    confirm_description: "After unsubscribing, you will no longer receive email alerts when someone replies to this comment.",
    confirm_button: "Confirm Unsubscribe",
    success_title: "Unsubscribed",
    success_description: "You will no longer receive reply notifications for this comment.",
    already_title: "Already Unsubscribed",
    already_description: "Email notifications for this comment are already disabled.",
    error_title: "Unable to Unsubscribe",
    error_missing_token: "The unsubscribe token is missing from the link.",
    error_invalid_token: "The link is invalid or has expired. Please open the unsubscribe link from your email again.",
    error_not_found: "The comment no longer exists.",
    error_config: "The service is missing configuration, so we cannot complete this request right now.",
    error_generic: "We couldn't unsubscribe you just now. Please try again later.",
    home_button: "Back to Homepage",
    pending: "Processing…"
  },
  jp: {
    title: "返信メール通知を停止",
    description: "確定すると、このコメントへの返信メール通知は届かなくなります。",
    confirm_title: "購読解除を確認",
    confirm_description: "解除後は、このコメントに返信があってもメール通知は届きません。",
    confirm_button: "購読解除を確定する",
    success_title: "購読解除が完了しました",
    success_description: "このコメントへの返信通知は今後届きません。",
    already_title: "すでに解除されています",
    already_description: "このコメントのメール通知はすでに停止されています。",
    error_title: "購読解除に失敗しました",
    error_missing_token: "リンクに購読解除トークンが含まれていません。",
    error_invalid_token: "リンクが無効か期限切れです。メールの解除リンクをもう一度開いてください。",
    error_not_found: "コメントが見つかりません。",
    error_config: "現在この処理を完了できません。しばらく待ってからお試しください。",
    error_generic: "購読解除に失敗しました。時間をおいて再度お試しください。",
    home_button: "ホームに戻る",
    pending: "処理中…"
  }
};

const MAX_TOKEN_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
async function verifyUnsubscribeToken(token, secret, maxAgeMs = MAX_TOKEN_AGE_MS) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const headerJson = base64UrlDecodeToString(encodedHeader);
    const header = JSON.parse(headerJson);
    if (header?.alg !== "HS256") return null;
    const key = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expected = new Uint8Array(
      await crypto.subtle.sign("HMAC", key, textEncoder.encode(signingInput))
    );
    const provided = base64UrlDecode(encodedSignature);
    if (!timingSafeEqual(expected, provided)) return null;
    const payload = JSON.parse(base64UrlDecodeToString(encodedPayload));
    const commentId = typeof payload.comment_id === "number" ? payload.comment_id : Number.parseInt(payload.comment_id, 10);
    const issuedAt = typeof payload.timestamp === "number" ? payload.timestamp : Number.parseInt(payload.timestamp, 10);
    if (!Number.isFinite(commentId) || !Number.isFinite(issuedAt)) return null;
    if (Date.now() - issuedAt > maxAgeMs) return null;
    return commentId;
  } catch (err) {
    console.error("verifyUnsubscribeToken error:", err);
    return null;
  }
}
function base64UrlDecode(input) {
  let normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - normalized.length % 4) % 4;
  if (pad) normalized += "=".repeat(pad);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
function base64UrlDecodeToString(input) {
  return textDecoder.decode(base64UrlDecode(input));
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export { UnsubscribeText as U, verifyUnsubscribeToken as v };
