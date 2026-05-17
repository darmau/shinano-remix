globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead, _ as addAttribute } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { $ as $$Base } from '../../../chunks/Base_De4mBBde.mjs';
import { P as ProfileText } from '../../../chunks/profile_lCY9Ti2l.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { g as getTime } from '../../../chunks/getTime_CcDELrHl.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { r as reactExports } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';

function BellSlashIcon({
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
    d: "M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(BellSlashIcon);

function BellIcon({
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
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(BellIcon);

function TrashIcon({
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
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(TrashIcon);

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { lang, id } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  if (!id) {
    return new Response(null, { status: 404 });
  }
  const supabase = Astro2.locals.supabase;
  const session = Astro2.locals.session;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const label = getLanguageLabel(ProfileText, lang);
  const availableLangs = ["zh", "en", "jp"];
  if (!session) {
    return Astro2.redirect(`/${lang}/login?next=${encodeURIComponent(`/${lang}/profile/${id}`)}`);
  }
  const isOwnProfile = session.user.id === id;
  if (!isOwnProfile) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { data: publicUser } = await supabase.from("users").select("id, name, created_at, user_id").eq("user_id", id).maybeSingle();
  if (!publicUser) {
    return new Response("User not found", { status: 404 });
  }
  const userProfile = {
    id: publicUser.id,
    name: publicUser.name,
    email: session.user.email || null,
    created_at: publicUser.created_at
  };
  const { data: rawComments } = await supabase.from("comment").select(
    `id, content_text, created_at, receive_notification,
     to_article, to_photo, to_thought,
     reply_to:reply_to (id, content_text)`
  ).eq("user_id", publicUser.id).order("created_at", { ascending: false });
  const comments = await Promise.all(
    (rawComments ?? []).map(async (comment) => {
      let article = null;
      let photo = null;
      let thought = null;
      if (comment.to_article) {
        const { data } = await supabase.from("article").select("title, slug").eq("id", comment.to_article).maybeSingle();
        if (data && data.title && data.slug) {
          article = { title: data.title, slug: data.slug };
        }
      } else if (comment.to_photo) {
        const { data } = await supabase.from("photo").select("title, slug").eq("id", comment.to_photo).maybeSingle();
        if (data && data.title && data.slug) {
          photo = { title: data.title, slug: data.slug };
        }
      } else if (comment.to_thought) {
        const { data } = await supabase.from("thought").select("content_text, slug").eq("id", comment.to_thought).maybeSingle();
        if (data && data.content_text && data.slug) {
          thought = { content_text: data.content_text, slug: data.slug };
        }
      }
      return {
        ...comment,
        article,
        photo,
        thought
      };
    })
  );
  const url = new URL(Astro2.request.url);
  const status = url.searchParams.get("status");
  const errorMessage = url.searchParams.get("error");
  function commentLink(c) {
    if (c.article) return `/${lang}/article/${c.article.slug}#comment-${c.id}`;
    if (c.photo) return `/${lang}/album/${c.photo.slug}#comment-${c.id}`;
    if (c.thought) return `/${lang}/thought/${c.thought.slug}#comment-${c.id}`;
    return "#";
  }
  function commentTitle(c) {
    if (c.article) return c.article.title;
    if (c.photo) return c.photo.title;
    if (c.thought) return c.thought.content_text.slice(0, 30) + "...";
    return "";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": `${label.my_profile} - ${userProfile.name || "User"}`, "description": label.my_profile, "ogTitle": `${label.my_profile} - ${userProfile.name || "User"}`, "ogDescription": label.my_profile, "pathWithoutLang": `profile/${id}`, "availableLangs": availableLangs, "baseUrl": baseUrl }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8"> <div class="max-w-7xl mx-auto"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2 space-y-6"> <h2 class="text-2xl font-bold text-zinc-900">${label.my_comments}</h2> ${status === "ok" && renderTemplate`<div class="p-4 bg-green-50 border border-green-200 rounded-md"> <p class="text-sm text-green-700">${label.update_success}</p> </div>`} ${errorMessage && renderTemplate`<div class="p-4 bg-red-50 border border-red-200 rounded-md"> <p class="text-sm text-red-700">${errorMessage}</p> </div>`} ${comments.length === 0 ? renderTemplate`<div class="bg-white rounded-lg shadow-sm border border-zinc-200 p-12 text-center"> <p class="text-zinc-500">${label.no_comments}</p> </div>` : renderTemplate`<div class="space-y-4"> ${comments.map((c) => renderTemplate`<div class="bg-white rounded-lg shadow-sm border border-zinc-200 p-6 hover:shadow-md transition-shadow"> <div class="mb-3"> <a${addAttribute(commentLink(c), "href")} class="text-lg font-medium text-violet-700 hover:text-violet-800 hover:underline"> ${commentTitle(c)} </a> </div> ${c.reply_to && renderTemplate`<div class="mb-3 pl-4 border-l-2 border-zinc-200"> <p class="text-sm text-zinc-500 mb-1">${label.replied_to}:</p> <p class="text-sm text-zinc-600 line-clamp-2">${c.reply_to.content_text}</p> </div>`} <div class="mb-3"> <p class="text-zinc-700 whitespace-pre-wrap">${c.content_text}</p> </div> <div class="flex items-center justify-between pt-3 border-t border-zinc-100"> <time class="text-sm text-zinc-500">${getTime(c.created_at, lang)}</time> <div class="flex items-center gap-2"> <form method="post" action="/api/profile/comment" class="inline"> <input type="hidden" name="intent" value="toggle_notification"> <input type="hidden" name="commentId"${addAttribute(c.id, "value")}> <input type="hidden" name="currentValue"${addAttribute(String(c.receive_notification), "value")}> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <input type="hidden" name="userId"${addAttribute(id, "value")}> <button type="submit"${addAttribute(label.toggle_notification, "title")}${addAttribute([
    "p-2 rounded-md transition-colors",
    c.receive_notification ? "text-violet-600 hover:bg-violet-50" : "text-zinc-400 hover:bg-zinc-100"
  ], "class:list")}> ${c.receive_notification ? renderTemplate`${renderComponent($$result2, "BellIcon", ForwardRef$1, { "className": "h-5 w-5" })}` : renderTemplate`${renderComponent($$result2, "BellSlashIcon", ForwardRef$2, { "className": "h-5 w-5" })}`} </button> </form> <form method="post" action="/api/profile/comment" class="inline"${addAttribute(`return confirm(${JSON.stringify(label.delete_confirm)})`, "onsubmit")}> <input type="hidden" name="intent" value="delete"> <input type="hidden" name="commentId"${addAttribute(c.id, "value")}> <input type="hidden" name="lang"${addAttribute(lang, "value")}> <input type="hidden" name="userId"${addAttribute(id, "value")}> <button type="submit"${addAttribute(label.delete, "title")} class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"> ${renderComponent($$result2, "TrashIcon", ForwardRef, { "className": "h-5 w-5" })} </button> </form> </div> </div> </div>`)} </div>`} </div> <div class="lg:col-span-1"> <div class="bg-white rounded-lg shadow-sm border border-zinc-200 p-6 sticky top-8"> <h2 class="text-xl font-bold text-zinc-900 mb-6">${label.user_info}</h2> <div class="space-y-4"> <div> <span class="text-sm font-medium text-zinc-500">${label.user_info}</span> <p class="text-base text-zinc-900 mt-1">${userProfile.name || "\u672A\u8BBE\u7F6E"}</p> </div> <div> <span class="text-sm font-medium text-zinc-500">Email</span> <p class="text-base text-zinc-900 mt-1 break-all">${userProfile.email}</p> </div> <div> <span class="text-sm font-medium text-zinc-500">${label.my_comments}</span> <p class="text-base text-zinc-900 mt-1">${comments.length}</p> </div> ${userProfile.created_at && renderTemplate`<div> <span class="text-sm font-medium text-zinc-500">注册时间</span> <p class="text-base text-zinc-900 mt-1">${getTime(userProfile.created_at, lang)}</p> </div>`} </div> </div> </div> </div> </div> </div> `, "head": async ($$result2) => renderTemplate`<meta name="robots" content="noindex, nofollow">` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/profile/[id].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/profile/[id].astro";
const $$url = "/[lang]/profile/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
