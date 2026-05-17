import { useState } from "react";
import ThoughtCard, { type ThoughtSummary } from "~/components/ThoughtCard";

interface Props {
  lang: string;
  imgPrefix: string;
  initialOffset: number;
  totalCount: number;
  pageSize?: number;
  loadMoreLabel: string;
  loadingLabel: string;
}

export default function ThoughtListMore({
  lang,
  imgPrefix,
  initialOffset,
  totalCount,
  pageSize = 20,
  loadMoreLabel,
  loadingLabel,
}: Props) {
  const [items, setItems] = useState<ThoughtSummary[]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = offset < totalCount;
  if (!hasMore && items.length === 0) return null;

  const handleClick = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/thoughts?offset=${offset}&limit=${pageSize}`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { items?: ThoughtSummary[]; error?: string };
      if (json.error) throw new Error(json.error);
      const newItems = json.items ?? [];
      setItems((prev) => [...prev, ...newItems]);
      setOffset((prev) => prev + newItems.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {items.map((thought) => (
        <ThoughtCard
          key={thought.id}
          thought={thought}
          lang={lang}
          imgPrefix={imgPrefix}
        />
      ))}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 disabled:opacity-60"
          >
            {loading ? loadingLabel : loadMoreLabel}
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </>
  );
}
