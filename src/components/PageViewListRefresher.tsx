import { useEffect } from "react";
import { createSupabaseBrowser } from "~/lib/supabase/browser";

interface Props {
  supabaseUrl: string;
  supabaseAnonKey: string;
  articleIds?: number[];
  thoughtIds?: number[];
  photoIds?: number[];
}

// Mounted on prerendered list pages. After hydration it does at most one
// supabase select per content type, then overwrites the textContent of the
// matching `<span id="${type}-${id}-page-view">` baked into the static HTML.
// The DOM node is owned by the SSR-rendered span (not React) so there's no
// hydration mismatch — the static count just gets corrected once.
export default function PageViewListRefresher({
  supabaseUrl,
  supabaseAnonKey,
  articleIds,
  thoughtIds,
  photoIds,
}: Props) {
  useEffect(() => {
    const supabase = createSupabaseBrowser(supabaseUrl, supabaseAnonKey);
    const apply = (type: "article" | "thought" | "photo", rows: { id: number; page_view: number | null }[]) => {
      for (const row of rows) {
        const el = document.getElementById(`${type === "photo" ? "album" : type}-${row.id}-page-view`);
        if (el && typeof row.page_view === "number") {
          el.textContent = String(row.page_view);
        }
      }
    };

    const tasks: Promise<unknown>[] = [];
    if (articleIds && articleIds.length > 0) {
      tasks.push(
        supabase
          .from("article")
          .select("id, page_view")
          .in("id", articleIds)
          .then(({ data }) => data && apply("article", data as { id: number; page_view: number | null }[])),
      );
    }
    if (thoughtIds && thoughtIds.length > 0) {
      tasks.push(
        supabase
          .from("thought")
          .select("id, page_view")
          .in("id", thoughtIds)
          .then(({ data }) => data && apply("thought", data as { id: number; page_view: number | null }[])),
      );
    }
    if (photoIds && photoIds.length > 0) {
      tasks.push(
        supabase
          .from("photo")
          .select("id, page_view")
          .in("id", photoIds)
          .then(({ data }) => data && apply("photo", data as { id: number; page_view: number | null }[])),
      );
    }
    Promise.all(tasks).catch((err) => console.error("PageViewListRefresher", err));
  }, [supabaseUrl, supabaseAnonKey, articleIds?.join(","), thoughtIds?.join(","), photoIds?.join(",")]);

  return null;
}
