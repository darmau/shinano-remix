globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, al as renderTemplate, a1 as createAstro } from './astro/server_D3oA7eJe.mjs';

const ArticlesText = {
  "zh": {
    "year": "按发布时间",
    "category": "按分类",
    "no_articles": "没有文章",
    "published_at": "发布于",
    "belong_to": "属于"
  },
  "en": {
    "year": "By Year",
    "category": "By Category",
    "no_articles": "No articles",
    "published_at": "Published at",
    "belong_to": "Belong to"
  },
  "jp": {
    "year": "発表日で",
    "category": "カテゴリーで",
    "no_articles": "記事がありません",
    "published_at": "発表日",
    "belong_to": "属する"
  }
};

const $$Astro = createAstro();
const $$ArticleListSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleListSidebar;
  const { lang, countByYear, countByCategory, yearLabel, categoryLabel } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="pb-4 space-y-8 md:col-span-1"> <div class="space-y-4"> <h3 class="text-sm font-semibold text-violet-600">${yearLabel}</h3> <ol> ${countByYear && countByYear.length > 0 ? countByYear.map((year) => renderTemplate`<li class="p-2 rounded-md hover:bg-zinc-50 cursor-pointer"> <a${addAttribute(`/${lang}/articles/archive/${year.year}/1`, "href")} class="text-base text-zinc-500 block"> ${year.year} (${year.count})
</a> </li>`) : renderTemplate`<li class="text-sm text-zinc-400 p-2">暂无数据</li>`} </ol> </div> <div class="space-y-4"> <h3 class="text-sm font-semibold text-violet-600">${categoryLabel}</h3> <ol> ${countByCategory.map(
    (category) => category.count === 0 ? null : renderTemplate`<li class="p-2 rounded-md hover:bg-zinc-50 cursor-pointer"> <a${addAttribute(`/${lang}/articles/category/${category.slug}/1`, "href")} class="text-base text-zinc-500 block"> ${category.title} (${category.count})
</a> </li>`
  )} </ol> </div> </aside>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/ArticleListSidebar.astro", void 0);

export { $$ArticleListSidebar as $, ArticlesText as A };
