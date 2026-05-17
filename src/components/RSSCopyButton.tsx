import { useState } from "react";

interface Props {
  url: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function RSSCopyButton({ url, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-violet-600 text-white font-medium py-3 w-full rounded-md"
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
