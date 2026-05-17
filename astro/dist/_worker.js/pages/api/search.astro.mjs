globalThis.process ??= {}; globalThis.process.env ??= {};
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

const prerender = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const POST = async (ctx) => {
  try {
    const formData = await ctx.request.formData();
    const query = formData.get("query");
    if (!query || typeof query !== "string" || query.trim() === "") {
      return json({ error: "Query is required", results: null }, 400);
    }
    const ai = ctx.locals.runtime.env.AI;
    if (!ai) return json({ error: "AI service is not available", results: null }, 503);
    const autorag = ai.autorag("blog-ai");
    const response = await autorag.aiSearch({
      query: query.trim(),
      model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      rewrite_query: true,
      max_num_results: 10,
      retrieval_options: { enabled: true, model: "@cf/qwen/qwen3-30b-a3b-fp8" },
      ranking_options: { score_threshold: 0.3 },
      reranking: { enabled: true, model: "@cf/baai/bge-reranker-base" },
      stream: false
    });
    return json({ error: null, results: response });
  } catch (err) {
    console.error("Search error:", err);
    return json(
      {
        error: err instanceof Error ? err.message : "An unknown error occurred",
        results: null
      },
      500
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
