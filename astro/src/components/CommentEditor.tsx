import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Turnstile } from "@marsidev/react-turnstile";
import type { CommentProps } from "~/types/Comment";
import getLanguageLabel from "~/lib/i18n/getLanguageLabel";
import CommentText from "../../../app/locales/comment";

type CommentEditorProps = {
  contentTable: string;
  contentId: number;
  session: Session | null;
  lang: string;
  turnstileSiteKey: string;
  endpoint: string;
};

type ServerResponse = {
  success?: string | boolean;
  error?: string | null;
};

export default function CommentEditor({
  contentTable,
  contentId,
  session,
  lang,
  turnstileSiteKey,
  endpoint,
}: CommentEditorProps) {
  const label = getLanguageLabel(CommentText, lang);
  const [replyingTo, setReplyingTo] = useState<CommentProps | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState<ServerResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Sibling .astro CommentBlock buttons dispatch `comment:reply` with the full
  // CommentProps; we listen here so the editor can prefill / scroll itself.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CommentProps>).detail;
      if (!detail) return;
      setReplyingTo(detail);
      document.getElementById("comment-editor")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("comment:reply", handler as EventListener);
    return () => window.removeEventListener("comment:reply", handler as EventListener);
  }, []);

  const handleCancelReply = () => setReplyingTo(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResponse(null);

    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const json = (await res.json()) as ServerResponse;
      setResponse(json);
      if (json.success && !json.error) {
        formRef.current?.reset();
        setReplyingTo(null);
        // Server-rendered comment list will refresh on full reload (cheapest
        // way to keep moderation rules — anonymous comments are held — honest).
        setTimeout(() => window.location.reload(), 800);
      }
    } catch (error) {
      console.error(error);
      setResponse({ error: "提交失败，请稍后重试。" });
    } finally {
      setSubmitting(false);
    }
  };

  const replyPreview = replyingTo && (
    <div className="p-4 bg-zinc-100 text-sm text text-zinc-700 mb-4">
      {`${label.reply} ${
        replyingTo.is_anonymous ? replyingTo.name : replyingTo.users?.name
      }: ${replyingTo.content_text.substring(0, 100)}...`}
    </div>
  );

  if (!session) {
    return (
      <form
        ref={formRef}
        method="post"
        action={endpoint}
        id="comment-editor"
        onSubmit={handleSubmit}
        className="border border-gray-200 rounded-md"
      >
        <input name={contentTable} type="hidden" value={contentId} />
        <input name="reply_to" type="hidden" value={replyingTo ? replyingTo.id : ""} />

        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <input
              className="w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              name="name"
              type="text"
              placeholder={"*" + label.name_placeholder}
              required
            />
            <input
              className="w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              name="email"
              type="email"
              placeholder={"*" + label.email_placeholder}
              required
            />
            <input
              className="w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              name="website"
              type="url"
              placeholder={label.website_placeholder}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="comment" className="sr-only">Add your comment</label>
            {replyPreview}
            <textarea
              rows={5}
              name="content_text"
              required
              placeholder={label.add_comment}
              className="block w-full resize-y border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-violet-600 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-start p-4">
          <p className="text-sm text-zinc-500">
            {label.moderation_notice}{" "}
            <a href={`/${lang}/login`} className="font-medium text-violet-600 hover:text-violet-500">
              {label.login}
            </a>
          </p>
          <Turnstile siteKey={turnstileSiteKey} />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-zinc-600">
              <input
                type="checkbox"
                name="receive_notification"
                value="true"
                defaultChecked={false}
                className="rounded border-gray-300 text-violet-600 focus:ring-violet-600"
              />
              {label.receive_notification}
            </label>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="break-keep inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60"
              >
                {submitting ? "…" : label.submit}
              </button>
              {replyingTo && (
                <button
                  type="button"
                  onClick={handleCancelReply}
                  className="text-sm font-medium text-red-400"
                >
                  {label.cancel_reply}
                </button>
              )}
            </div>
          </div>
          {response?.error && <p className="mt-2 text-sm text-red-500">{response.error}</p>}
          {response?.success && (
            <p className="mt-2 text-sm text-green-600">
              {typeof response.success === "string" ? response.success : "Submitted."}
            </p>
          )}
        </div>
      </form>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      action={endpoint}
      id="comment-editor"
      onSubmit={handleSubmit}
      className="border border-gray-200 rounded-md"
    >
      <input name={contentTable} type="hidden" value={contentId} />
      <input name="reply_to" type="hidden" value={replyingTo ? replyingTo.id : ""} />
      <div className="p-4 border-b border-gray-200">
        <label htmlFor="comment" className="sr-only">Add your comment</label>
        {replyPreview}
        <textarea
          rows={5}
          name="content_text"
          required
          placeholder={label.add_comment}
          className="block w-full resize-y border-0 border-b border-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:border-violet-600 focus:ring-0 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            name="receive_notification"
            value="true"
            defaultChecked
            className="rounded border-gray-300 text-violet-600 focus:ring-violet-600"
          />
          {label.receive_notification}
        </label>
        <div className="flex items-center gap-4 sm:justify-end">
          {replyingTo && (
            <button
              type="button"
              onClick={handleCancelReply}
              className="text-sm font-medium text-red-400"
            >
              {label.cancel_reply}
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60"
          >
            {submitting ? "…" : label.submit}
          </button>
        </div>
      </div>
      {response?.error && <p className="px-4 pb-2 text-sm text-red-500">{response.error}</p>}
      {response?.success && (
        <p className="px-4 pb-2 text-sm text-green-600">
          {typeof response.success === "string" ? response.success : "Submitted."}
        </p>
      )}
    </form>
  );
}
