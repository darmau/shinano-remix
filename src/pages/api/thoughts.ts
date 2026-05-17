import type { APIRoute } from "astro";
import type { ThoughtSummary } from "~/components/ThoughtCard";

export const prerender = false;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

function normalize(rows: unknown): ThoughtSummary[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) => {
    if (!isRecord(row)) return [];
    const id = row["id"];
    const slug = row["slug"];
    const createdAt = row["created_at"];
    if (typeof id !== "number" || typeof slug !== "string" || typeof createdAt !== "string") {
      return [];
    }

    const commentsValue = row["comments"];
    const comments = Array.isArray(commentsValue)
      ? commentsValue
          .map((c) =>
            isRecord(c) && typeof c["count"] === "number" ? { count: c["count"] as number } : null,
          )
          .filter((c): c is { count: number } => c !== null)
      : [];

    const thoughtImagesValue = row["thought_image"];
    const thought_image = Array.isArray(thoughtImagesValue)
      ? thoughtImagesValue
          .map((entry) => {
            if (!isRecord(entry)) return null;
            const img = entry["image"];
            if (!isRecord(img)) return null;
            const imgId = img["id"];
            const storageKey = img["storage_key"];
            if (typeof imgId !== "number" || typeof storageKey !== "string") return null;
            return {
              image: {
                id: imgId,
                alt: typeof img["alt"] === "string" ? (img["alt"] as string) : null,
                storage_key: storageKey,
                width: typeof img["width"] === "number" ? (img["width"] as number) : 0,
                height: typeof img["height"] === "number" ? (img["height"] as number) : 0,
              },
            };
          })
          .filter((entry): entry is ThoughtSummary["thought_image"][number] => entry !== null)
      : [];

    return [
      {
        id,
        slug,
        content_text: typeof row["content_text"] === "string" ? (row["content_text"] as string) : "",
        created_at: createdAt,
        page_view: typeof row["page_view"] === "number" ? (row["page_view"] as number) : 0,
        comments: comments.length > 0 ? comments : [{ count: 0 }],
        thought_image,
      },
    ];
  });
}

export const GET: APIRoute = async (ctx) => {
  const url = new URL(ctx.request.url);
  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? 0));
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? 20)));

  const supabase = ctx.locals.supabase;
  const { data, error } = await supabase
    .from("thought")
    .select(
      `id, slug, content_text, created_at, page_view,
       comments:comment(count),
       thought_image ( image (id, alt, storage_key, width, height) )`,
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ items: normalize(data) }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    },
  });
};
