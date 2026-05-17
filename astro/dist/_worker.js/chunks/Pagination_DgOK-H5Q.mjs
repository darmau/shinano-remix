globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, al as renderTemplate, _ as addAttribute, a1 as createAstro } from './astro/server_D3oA7eJe.mjs';
import { U as UtilsText } from './utils_kdxsUltM.mjs';
import { g as getLanguageLabel } from './getLanguageLabel_D4hYx-hS.mjs';

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { count, limit, page, path, lang } = Astro2.props;
  const label = getLanguageLabel(UtilsText, lang);
  const total = Math.ceil(count / limit);
  function generatePages() {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (page <= 3) return [1, 2, 3, 4, 5, "...", total];
    if (page >= total - 2) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  }
  const pages = generatePages();
  const isFirst = page === 1;
  const isLast = page === total || total === 0;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between flex-wrap gap-4 items-center"> <div class="text-sm text-zinc-500">${label.total}: ${count}</div> <nav class="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination"> ${isFirst ? renderTemplate`<div class="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-300 ring-1 ring-inset ring-zinc-300 bg-zinc-50"> <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"></path> </svg> </div>` : renderTemplate`<a${addAttribute(`${path}/${page - 1}`, "href")} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"> <span class="sr-only">${label.prev_page}</span> <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd"></path> </svg> </a>`} ${pages.map(
    (p) => p === "..." ? renderTemplate`<span class="relative inline-flex items-center px-4 py-2 -ml-px text-zinc-700 ring-1 ring-inset ring-zinc-300">
...
</span>` : renderTemplate`<a${addAttribute(`${path}/${p}`, "href")} class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 hover:text-violet-600 focus:z-20 focus:outline-offset-0"> ${p} </a>`
  )} ${isLast ? renderTemplate`<div class="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-300 ring-1 ring-inset ring-zinc-300 bg-zinc-50"> <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path> </svg> </div>` : renderTemplate`<a${addAttribute(`${path}/${page + 1}`, "href")} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"> <span class="sr-only">${label.next_page}</span> <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path> </svg> </a>`} </nav> </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
