globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, l as Fragment, _ as addAttribute } from '../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../chunks/Base_De4mBBde.mjs';
import { U as UnsubscribeText, v as verifyUnsubscribeToken } from '../../chunks/unsubscribeToken_AVXI0DPU.mjs';
import { g as getLanguageLabel } from '../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../chunks/getLang_DVpWAtTa.mjs';
import { r as reactExports } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../chunks/_@astro-renderers_BA3-2LID.mjs';

function CheckCircleIcon({
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
    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(CheckCircleIcon);

function ExclamationTriangleIcon({
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
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(ExclamationTriangleIcon);

function XCircleIcon({
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
    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(XCircleIcon);

const $$Astro = createAstro();
const prerender = false;
const $$Unsubscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Unsubscribe;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const labels = getLanguageLabel(UnsubscribeText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const url = new URL(Astro2.request.url);
  const token = url.searchParams.get("token");
  const status = url.searchParams.get("status");
  const submittedError = url.searchParams.get("error");
  let view;
  if (status === "ok") {
    view = { kind: "success" };
  } else if (!token) {
    view = { kind: "error", message: submittedError ?? labels.error_missing_token };
  } else {
    const secret = env.UNSUBSCRIBE_KEY;
    if (!secret) {
      view = { kind: "error", message: labels.error_config };
    } else {
      const commentId = await verifyUnsubscribeToken(token, secret);
      if (!commentId) {
        view = { kind: "error", message: labels.error_invalid_token };
      } else {
        const { data: comment, error } = await supabase.from("comment").select("id, receive_notification").eq("id", commentId).maybeSingle();
        if (error) {
          view = { kind: "error", message: labels.error_generic };
        } else if (!comment) {
          view = { kind: "error", message: labels.error_not_found };
        } else if (comment.receive_notification === false) {
          view = { kind: "already" };
        } else {
          view = { kind: "ready", token };
        }
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": labels.title, "description": labels.description, "ogTitle": labels.title, "ogDescription": labels.description, "pathWithoutLang": "unsubscribe", "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12"> <div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8"> ${view.kind === "error" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="flex items-center justify-center mb-4"> ${renderComponent($$result3, "XCircleIcon", ForwardRef, { "className": "h-12 w-12 text-red-500" })} </div> <h1 class="text-2xl font-bold text-zinc-900 text-center mb-4">${labels.error_title}</h1> <p class="text-zinc-600 text-center">${view.message}</p> ` })}`} ${(view.kind === "success" || view.kind === "already") && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="flex items-center justify-center mb-4"> ${renderComponent($$result3, "CheckCircleIcon", ForwardRef$2, { "className": "h-12 w-12 text-green-500" })} </div> <h1 class="text-2xl font-bold text-zinc-900 text-center mb-4"> ${view.kind === "already" ? labels.already_title : labels.success_title} </h1> <p class="text-zinc-600 text-center mb-6"> ${view.kind === "already" ? labels.already_description : labels.success_description} </p> <a${addAttribute(`/${lang}`, "href")} class="w-full inline-flex justify-center py-2.5 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"> ${labels.home_button} </a> ` })}`} ${view.kind === "ready" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="flex items-center justify-center mb-4"> ${renderComponent($$result3, "ExclamationTriangleIcon", ForwardRef$1, { "className": "h-12 w-12 text-amber-500" })} </div> <h1 class="text-2xl font-bold text-zinc-900 text-center mb-4">${labels.confirm_title}</h1> <p class="text-zinc-600 text-center mb-8">${labels.confirm_description}</p> ${submittedError && renderTemplate`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"> <p class="text-sm text-red-700">${submittedError}</p> </div>`}<form method="post" action="/api/unsubscribe"> <input type="hidden" name="token"${addAttribute(view.token, "value")}> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"> ${labels.confirm_button} </button> </form> ` })}`} </div> </div> `, "head": async ($$result2) => renderTemplate`<meta name="robots" content="noindex, nofollow">` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/unsubscribe.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/unsubscribe.astro";
const $$url = "/[lang]/unsubscribe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Unsubscribe,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
