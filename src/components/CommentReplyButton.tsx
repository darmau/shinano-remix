import type { CommentProps } from "~/types/Comment";

// Micro-island: dispatches a window event the CommentEditor island listens for.
// Keeps the comment list itself fully .astro / server-rendered.
export default function CommentReplyButton({
  comment,
  label,
}: {
  comment: CommentProps;
  label: string;
}) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("comment:reply", { detail: comment }));
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm text-violet-700 hover:text-violet-500"
    >
      {label}
    </button>
  );
}
