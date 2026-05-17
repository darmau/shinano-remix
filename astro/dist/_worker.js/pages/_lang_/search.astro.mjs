globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { j as jsxRuntimeExports, $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { r as reactExports } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';

const SearchText = {
  "zh": {
    "title": "搜索",
    "description": "除了关键词搜索，你也可以使用自然语言提问",
    "search_placeholder": "输入搜索关键词...",
    "search_button": "搜索",
    "results_heading": "搜索结果",
    "no_results": "未找到相关结果",
    "error": "搜索时发生错误",
    "loading": "搜索中...",
    "answer_heading": "AI 回答"
  },
  "en": {
    "title": "Search",
    "description": "Besides keyword search, you can also use natural language questions",
    "search_placeholder": "Enter search keywords...",
    "search_button": "Search",
    "results_heading": "Search Results",
    "no_results": "No results found",
    "error": "An error occurred while searching",
    "loading": "Searching...",
    "answer_heading": "AI Answer"
  },
  "jp": {
    "title": "検索",
    "description": "キーワード検索以外に、自然言語で質問することもできます",
    "search_placeholder": "検索キーワードを入力...",
    "search_button": "検索",
    "results_heading": "検索結果",
    "no_results": "結果が見つかりませんでした",
    "error": "検索中にエラーが発生しました",
    "loading": "検索中...",
    "answer_heading": "AI回答"
  }
};

function decodeRFC2047(encoded) {
  if (!encoded || typeof encoded !== "string") return encoded;
  const rfc2047Regex = /=\?([^?]+)\?([QB])\?([^?]+)\?=/gi;
  return encoded.replace(rfc2047Regex, (match, charset, encoding, body) => {
    try {
      if (encoding.toUpperCase() === "Q") return decodeQuotedPrintable(body, charset);
      if (encoding.toUpperCase() === "B") return decodeBase64(body, charset);
      return match;
    } catch (err) {
      console.error("decodeRFC2047 error:", err);
      return match;
    }
  });
}
function decodeQuotedPrintable(text, charset = "utf-8") {
  const bytes = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "=" && i + 2 < text.length) {
      const hex = text.substring(i + 1, i + 3).match(/^[0-9A-F]{2}$/i);
      if (hex) {
        bytes.push(parseInt(hex[0], 16));
        i += 3;
        continue;
      }
      if (text[i + 1] === "\r" && text[i + 2] === "\n") {
        i += 3;
        continue;
      }
      if (text[i + 1] === "\n") {
        i += 2;
        continue;
      }
    }
    if (text[i] === "_") bytes.push(32);
    else bytes.push(text.charCodeAt(i));
    i++;
  }
  try {
    return new TextDecoder(charset.toLowerCase()).decode(new Uint8Array(bytes));
  } catch {
    return String.fromCharCode(...bytes);
  }
}
function decodeBase64(text, charset = "utf-8") {
  try {
    const clean = text.replace(/\s/g, "");
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder(charset.toLowerCase()).decode(bytes);
  } catch (err) {
    console.error("decodeBase64 error:", err);
    return text;
  }
}

function getFileAttribute(attrs) {
  const file = attrs.file;
  if (file && typeof file === "object") return file;
  return void 0;
}
function SearchResult({ result }) {
  const file = getFileAttribute(result.attributes);
  const decodedTitle = file?.title ? decodeRFC2047(file.title) : "";
  const decodedDescription = file?.description ? decodeRFC2047(file.description) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: result.filename, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-medium text-violet-900", children: decodedTitle }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: decodedDescription })
    ] }),
    file?.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: file.image,
        alt: decodedTitle || result.filename,
        className: "rounded w-40 h-40 object-cover"
      }
    )
  ] });
}

function SearchForm({ labels, endpoint = "/api/search" }) {
  const [query, setQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [results, setResults] = reactExports.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append("query", query);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setResults(json.results ?? {});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "query",
            className: "block text-sm font-medium leading-6 text-gray-900 mb-2",
            children: labels.search_placeholder
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "query",
            name: "query",
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: labels.search_placeholder,
            required: true,
            disabled: loading,
            className: "block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-sm sm:leading-6"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed",
          children: loading ? labels.loading : labels.search_button
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 p-4 bg-red-50 border border-red-200 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-800 text-sm", children: [
      labels.error,
      ": ",
      error
    ] }) }),
    results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
      results.response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-gray-900 mb-3", children: labels.answer_heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap", children: results.response })
      ] }),
      results.data && results.data.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-gray-900 mb-4", children: labels.results_heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: results.data.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SearchResult, { result: r }, r.file_id)) })
      ] }) : results.data && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-gray-500", children: labels.no_results })
    ] })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Search = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const label = getLanguageLabel(SearchText, lang);
  const availableLangs = ["zh", "en", "jp"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.title, "description": label.description, "ogTitle": label.title, "ogDescription": label.description, "pathWithoutLang": "search", "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto my-8 lg:my-12 px-4 lg:p-0"> <header class="text-center space-y-4 mb-8"> <h1 class="font-medium text-3xl text-zinc-700">${label.title}</h1> <p class="text-zinc-500">${label.description}</p> </header> ${renderComponent($$result2, "SearchForm", SearchForm, { "client:load": true, "labels": {
    search_placeholder: label.search_placeholder,
    search_button: label.search_button,
    loading: label.loading,
    error: label.error,
    results_heading: label.results_heading,
    no_results: label.no_results,
    answer_heading: label.answer_heading
  }, "client:component-hydration": "load", "client:component-path": "~/components/SearchForm.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/search.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/search.astro";
const $$url = "/[lang]/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
