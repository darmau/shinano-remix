globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as reactExports } from './_@astro-renderers_BA3-2LID.mjs';

function EyeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(EyeIcon);

const isRecord = (value) => typeof value === "object" && value !== null;
const isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const isJsonValue = (value) => {
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true;
  }
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (isPlainObject(value)) {
    return Object.values(value).every((item) => item === void 0 || isJsonValue(item));
  }
  return false;
};
const normalizeArticles = (rows) => {
  if (!Array.isArray(rows)) return [];
  const normalized = [];
  rows.forEach((item) => {
    if (!isRecord(item)) return;
    const id = item["id"];
    const title = item["title"];
    const slug = item["slug"];
    if (typeof id !== "number" || typeof title !== "string" || typeof slug !== "string") return;
    const categoryValue = item["category"];
    const category = isRecord(categoryValue) ? {
      title: typeof categoryValue["title"] === "string" ? categoryValue["title"] : "",
      slug: typeof categoryValue["slug"] === "string" ? categoryValue["slug"] : ""
    } : { title: "", slug: "" };
    const coverValue = item["cover"];
    const cover = isRecord(coverValue) && typeof coverValue["storage_key"] === "string" ? {
      alt: typeof coverValue["alt"] === "string" ? coverValue["alt"] : null,
      storage_key: coverValue["storage_key"],
      width: typeof coverValue["width"] === "number" ? coverValue["width"] : 0,
      height: typeof coverValue["height"] === "number" ? coverValue["height"] : 0
    } : null;
    const commentsValue = item["comments"];
    const comments = Array.isArray(commentsValue) ? commentsValue.map((comment) => {
      if (!isRecord(comment)) return null;
      const count = comment["count"];
      return typeof count === "number" ? { count } : null;
    }).filter((c) => c !== null) : [];
    const topicValue = item["topic"];
    const contentJson = item["content_json"];
    normalized.push({
      id,
      title,
      slug,
      subtitle: typeof item["subtitle"] === "string" ? item["subtitle"] : null,
      abstract: typeof item["abstract"] === "string" ? item["abstract"] : null,
      is_featured: typeof item["is_featured"] === "boolean" ? item["is_featured"] : null,
      is_premium: typeof item["is_premium"] === "boolean" ? item["is_premium"] : null,
      topic: Array.isArray(topicValue) ? topicValue.filter((entry) => typeof entry === "string") : null,
      published_at: typeof item["published_at"] === "string" ? item["published_at"] : (/* @__PURE__ */ new Date(0)).toISOString(),
      page_view: typeof item["page_view"] === "number" ? item["page_view"] : 0,
      cover,
      category,
      comments: comments.length > 0 ? comments : [{ count: 0 }],
      content_json: isJsonValue(contentJson) ? contentJson : void 0
    });
  });
  return normalized;
};
const normalizeYearCounts = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (!isRecord(item)) return null;
    const yearValue = item["year"];
    const count = item["count"];
    let year;
    if (typeof yearValue === "number") {
      year = yearValue;
    } else if (typeof yearValue === "string") {
      const parsed = parseInt(yearValue, 10);
      if (isNaN(parsed)) return null;
      year = parsed;
    } else {
      return null;
    }
    if (typeof count !== "number") return null;
    return { year, count };
  }).filter((entry) => entry !== null);
};
const normalizeCategoryCounts = (value) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (!isRecord(item)) return null;
    const title = item["title"];
    const slug = item["slug"];
    const count = item["count"];
    if (typeof title !== "string" || typeof slug !== "string" || typeof count !== "number") return null;
    return { title, slug, count };
  }).filter((entry) => entry !== null);
};
const normalizeCategorySummary = (value) => {
  if (!isRecord(value)) return null;
  const title = value["title"];
  const slug = value["slug"];
  if (typeof title !== "string" || typeof slug !== "string") return null;
  const coverValue = value["cover"];
  const cover = isRecord(coverValue) && typeof coverValue["storage_key"] === "string" ? {
    alt: typeof coverValue["alt"] === "string" ? coverValue["alt"] : null,
    storage_key: coverValue["storage_key"],
    width: typeof coverValue["width"] === "number" ? coverValue["width"] : 0,
    height: typeof coverValue["height"] === "number" ? coverValue["height"] : 0
  } : null;
  return {
    title,
    slug,
    description: typeof value["description"] === "string" ? value["description"] : null,
    cover
  };
};

export { ForwardRef as F, normalizeCategoryCounts as a, normalizeCategorySummary as b, normalizeYearCounts as c, normalizeArticles as n };
