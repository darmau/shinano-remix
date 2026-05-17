import type { APIRoute } from "astro";

export const prerender = false;

const SUPPORTED_TARGET_LANGS = new Set(["en", "jp"]);

const json = (body: { translation?: string; error?: string }, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async (ctx) => {
  const formData = await ctx.request.formData();
  const text = formData.get("text");
  const targetLang = formData.get("targetLang");

  if (typeof text !== "string" || text.trim().length === 0) {
    return json({ error: "Text is required" }, 400);
  }
  if (typeof targetLang !== "string" || !SUPPORTED_TARGET_LANGS.has(targetLang)) {
    return json({ error: "Unsupported target language" }, 400);
  }

  const ai = ctx.locals.runtime.env.AI;
  if (!ai) return json({ error: "AI service unavailable" }, 503);

  const normalizedTargetLang = targetLang === "jp" ? "ja" : targetLang;

  try {
    const result = await ai.run(
      "@cf/meta/m2m100-1.2b",
      {
        text: text.trim(),
        source_lang: "zh",
        target_lang: normalizedTargetLang,
      },
      { gateway: { id: "shinano" } },
    );

    let translation = "";
    if (typeof result === "string") {
      translation = result;
    } else if (result && typeof result === "object") {
      const candidate = result as {
        response?: unknown;
        result?: unknown;
        output?: unknown;
        translated_text?: unknown;
        outputs?: { output_text?: unknown }[];
      };
      const direct =
        candidate.translated_text ??
        candidate.response ??
        candidate.result ??
        candidate.output ??
        (Array.isArray(candidate.outputs) ? candidate.outputs[0]?.output_text : undefined);
      if (typeof direct === "string") translation = direct;
    }

    if (!translation || translation.trim().length === 0) {
      translation =
        typeof result === "object" ? JSON.stringify(result) : String(result ?? "");
    }

    return json({ translation: translation.trim() });
  } catch (err) {
    console.error("Translation error:", err);
    return json({ error: "Translation failed" }, 500);
  }
};
