globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, ae as renderComponent, al as renderTemplate, a1 as createAstro } from './astro/server_D3oA7eJe.mjs';
import { g as getTime } from './getTime_CcDELrHl.mjs';
import { r as reactExports } from './_@astro-renderers_BA3-2LID.mjs';
import { F as ForwardRef$1 } from './articles_BoEWakG5.mjs';
import { F as ForwardRef$2 } from './ChatBubbleOvalLeftIcon_DNbDi8Qu.mjs';

function LockClosedIcon({
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
    d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(LockClosedIcon);

const $$Astro = createAstro();
const $$NormalArticleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NormalArticleCard;
  const { article, lang, showAbstract = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(article.abstract ?? "", "title")} class="group"> <a${addAttribute(`/${lang}/article/${article.slug}`, "href")} class="flex flex-col gap-2"> <div class="text-zinc-400 text-sm"> <span class="text-violet-700 font-medium">${article.category.title}</span>
&nbsp;·&nbsp;
<span>${getTime(article.published_at, lang)}</span> </div> <div class="flex items-center gap-2 text-zinc-800 group-hover:text-violet-900"> ${article.is_premium && renderTemplate`${renderComponent($$result, "LockClosedIcon", ForwardRef, { "className": "h-5 w-5 text-violet-600 mt-0.5" })}`} <h3 class="text-2xl font-medium">${article.title}</h3> </div> <h4 class="text-base text-zinc-500 leading-7">${article.subtitle}</h4> ${article.topic && renderTemplate`<div class="flex flex-wrap gap-2 pt-2"> ${article.topic.map((topic) => renderTemplate`<span class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600"> ${topic} </span>`)} </div>`} ${showAbstract && article.abstract && renderTemplate`<div class="bg-zinc-100 p-2 text-sm text-zinc-700 mt-3 rounded-md md:p-4 leading-6"> ${article.abstract} </div>`} <div class="flex gap-3 justify-start items-center mt-2"> <div class="flex gap-1 items-center"> ${renderComponent($$result, "EyeIcon", ForwardRef$1, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.page_view}</span> </div> <div class="flex gap-1 items-center"> ${renderComponent($$result, "ChatBubbleOvalLeftIcon", ForwardRef$2, { "className": "h-4 w-4 inline-block text-zinc-400" })} <span class="text-zinc-500 text-sm">${article.comments[0].count}</span> </div> </div> </a> </article>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/NormalArticleCard.astro", void 0);

export { $$NormalArticleCard as $, ForwardRef as F };
