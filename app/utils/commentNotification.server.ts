import {Resend} from "resend";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "~/types/supabase";

type CommentRow = Database["public"]["Tables"]["comment"]["Row"];

type ContentType = "article" | "photo" | "thought";

interface ContentContext {
  type: ContentType;
  id: number;
  lang: string;
  slug: string;
}

interface NotificationEnv {
  RESEND_KEY: string;
  BASE_URL: string;
  [key: string]: unknown;
}

interface SendCommentReplyNotificationOptions {
  supabase: SupabaseClient<Database>;
  env: NotificationEnv;
  replyToId: number;
  newCommentAuthorName: string;
  newCommentContent: string;
  content: ContentContext;
}

type CommentWithUser = CommentRow & {
  users: {
    id: number;
    name: string | null;
  } | null;
};

const FROM_ADDRESS = "积薪评论通知 <no_reply@auth.darmau.co>";

export async function sendCommentReplyNotification({
  supabase,
  env,
  replyToId,
  newCommentAuthorName,
  newCommentContent,
  content
}: SendCommentReplyNotificationOptions) {
  if (!replyToId) {
    return;
  }

  if (!env.RESEND_KEY) {
    console.warn("RESEND_KEY is not configured; skipping comment reply notification.");
    return;
  }

  const parentCommentResponse = await supabase
    .from("comment")
    .select(`
      id,
      content_text,
      name,
      email,
      is_anonymous,
      receive_notification,
      user_id,
      users (id, name)
    `)
    .eq("id", replyToId)
    .maybeSingle();

  if (parentCommentResponse.error) {
    console.error("Failed to load parent comment for notification:", parentCommentResponse.error);
    return;
  }

  const parentComment = parentCommentResponse.data as CommentWithUser | null;

  if (!parentComment || parentComment.receive_notification !== true) {
    return;
  }

  const recipientEmail = await resolveRecipientEmail(supabase, parentComment);

  if (!recipientEmail) {
    console.warn("Unable to resolve recipient email for comment notification", {replyToId});
    return;
  }

  const recipientName = parentComment.is_anonymous
    ? parentComment.name ?? undefined
    : parentComment.users?.name ?? undefined;

  const {title, url} = await buildContentMetadata(supabase, env, content, replyToId);

  const subject = `你的评论收到了新的回复：${title}`;
  const html = renderHtmlEmail({
    recipientName,
    contentTitle: title,
    contentUrl: url,
    originalComment: parentComment.content_text ?? "",
    replyAuthorName: newCommentAuthorName,
    replyContent: newCommentContent
  });
  const text = renderTextEmail({
    recipientName,
    contentTitle: title,
    contentUrl: url,
    originalComment: parentComment.content_text ?? "",
    replyAuthorName: newCommentAuthorName,
    replyContent: newCommentContent
  });

  const resend = new Resend(env.RESEND_KEY);

  try {
    const {error} = await resend.emails.send({
      from: FROM_ADDRESS,
      to: recipientEmail,
      subject,
      html,
      text
    });

    if (error) {
      console.error("Failed to send comment reply notification email:", error);
    }
  } catch (error) {
    console.error("Unexpected error when sending comment reply notification:", error);
  }
}

async function resolveRecipientEmail(
  supabase: SupabaseClient<Database>,
  comment: CommentWithUser
): Promise<string | null> {
  if (comment.is_anonymous) {
    return comment.email ?? null;
  }

  if (!comment.user_id) {
    return null;
  }

  // 从 public.users 表获取 user_id (这是 auth.users 的 uuid)
  const registeredUserResponse = await supabase
    .from("users")
    .select("user_id")
    .eq("id", comment.user_id)
    .maybeSingle();

  if (registeredUserResponse.error) {
    console.error("Failed to fetch registered user for comment notification:", registeredUserResponse.error);
    return null;
  }

  const registeredUser = registeredUserResponse.data;
  
  if (!registeredUser?.user_id) {
    return null;
  }

  // 从 auth.users 表获取 email
  const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(registeredUser.user_id);

  if (authError) {
    console.error("Failed to fetch auth user for comment notification:", authError);
    return null;
  }

  return authUser?.user?.email ?? null;
}

async function buildContentMetadata(
  supabase: SupabaseClient<Database>,
  env: NotificationEnv,
  content: ContentContext,
  replyToId: number
): Promise<{ title: string; url: string }> {
  const tableName = content.type === "article" ? "article" : content.type === "photo" ? "photo" : "thought";
  const titleResponse = await supabase
    .from(tableName)
    .select("title, slug")
    .eq("id", content.id)
    .maybeSingle();

  if (titleResponse.error) {
    console.error("Failed to fetch content metadata for comment notification:", titleResponse.error);
  }

  const defaultTitleMap: Record<ContentType, string> = {
    article: "文章更新",
    photo: "摄影作品更新",
    thought: "想法更新"
  };

  const titleData = titleResponse.data as { title?: string | null; slug?: string | null } | null;
  const title = titleData?.title ?? defaultTitleMap[content.type];
  const slug = titleData?.slug ?? content.slug;
  const pathSegment = content.type === "photo" ? "album" : content.type;
  const url = `${env.BASE_URL}/${content.lang}/${pathSegment}/${slug}#comment-${replyToId}`;

  return {title, url};
}

function renderHtmlEmail(args: {
  recipientName?: string;
  contentTitle: string;
  contentUrl: string;
  originalComment: string;
  replyAuthorName: string;
  replyContent: string;
}): string {
  const greetingName = args.recipientName ? escapeHtml(args.recipientName) : "朋友";
  const replyAuthor = escapeHtml(args.replyAuthorName || "访客");
  const originalComment = formatCommentHtml(args.originalComment);
  const replyContent = formatCommentHtml(args.replyContent);
  const safeTitle = escapeHtml(args.contentTitle);
  const safeUrl = escapeHtml(args.contentUrl);

  return [
    `<div style="font-family: Arial, 'Helvetica Neue', sans-serif; line-height: 1.6; color: #1f2937;">`,
    `<p>你好，${greetingName}。</p>`,
    `<p>你在《<strong>${safeTitle}</strong>》下的评论收到了新的回复。</p>`,
    `<p style="margin-top: 16px; margin-bottom: 8px; color: #6b7280;">你的评论</p>`,
    `<blockquote style="border-left: 4px solid #d1d5db; margin: 0; padding-left: 12px;">${originalComment}</blockquote>`,
    `<p style="margin-top: 16px; margin-bottom: 8px; color: #6b7280;">来自 ${replyAuthor} 的回复</p>`,
    `<blockquote style="border-left: 4px solid #d1d5db; margin: 0; padding-left: 12px;">${replyContent}</blockquote>`,
    `<p style="margin-top: 16px;">点击查看完整讨论：<a href="${safeUrl}" style="color: #7c3aed; text-decoration: underline;">${safeUrl}</a></p>`,
    `<p style="margin-top: 24px; font-size: 0.875rem; color: #9ca3af;">如果不想再收到类似提醒，请在评论时取消勾选“有人回复通知我”。</p>`,
    `</div>`
  ].join("");
}

function renderTextEmail(args: {
  recipientName?: string;
  contentTitle: string;
  contentUrl: string;
  originalComment: string;
  replyAuthorName: string;
  replyContent: string;
}): string {
  const greetingName = args.recipientName ? args.recipientName : "朋友";

  return [
    `你好，${greetingName}。`,
    ``,
    `你在《${args.contentTitle}》下的评论收到了新的回复。`,
    ``,
    `你的评论：`,
    `${args.originalComment}`,
    ``,
    `${args.replyAuthorName || "访客"} 的回复：`,
    `${args.replyContent}`,
    ``,
    `查看完整讨论：${args.contentUrl}`,
    ``,
    `如果你不想再收到类似提醒，请在评论时取消勾选“有人回复通知我”。`
  ].join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCommentHtml(text: string): string {
  return escapeHtml(text).replace(/\r?\n/g, "<br />");
}

