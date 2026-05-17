globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as renderers } from './chunks/_@astro-renderers_BA3-2LID.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DsAqrbvd.mjs';
import { manifest } from './manifest_BAigKZow.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/confirm.astro.mjs');
const _page2 = () => import('./pages/api/auth/email.astro.mjs');
const _page3 = () => import('./pages/api/auth/github.astro.mjs');
const _page4 = () => import('./pages/api/comments.astro.mjs');
const _page5 = () => import('./pages/api/contact.astro.mjs');
const _page6 = () => import('./pages/api/profile/comment.astro.mjs');
const _page7 = () => import('./pages/api/search.astro.mjs');
const _page8 = () => import('./pages/api/translate.astro.mjs');
const _page9 = () => import('./pages/api/unsubscribe.astro.mjs');
const _page10 = () => import('./pages/auth/auth-code-error.astro.mjs');
const _page11 = () => import('./pages/auth/callback.astro.mjs');
const _page12 = () => import('./pages/auth/confirm.astro.mjs');
const _page13 = () => import('./pages/robots.txt.astro.mjs');
const _page14 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page15 = () => import('./pages/_lang_/about.astro.mjs');
const _page16 = () => import('./pages/_lang_/album/rss.xml.astro.mjs');
const _page17 = () => import('./pages/_lang_/album/_slug_.astro.mjs');
const _page18 = () => import('./pages/_lang_/albums/all/_page_.astro.mjs');
const _page19 = () => import('./pages/_lang_/albums/featured.astro.mjs');
const _page20 = () => import('./pages/_lang_/albums/map.astro.mjs');
const _page21 = () => import('./pages/_lang_/article/rss.xml.astro.mjs');
const _page22 = () => import('./pages/_lang_/article/_slug_.astro.mjs');
const _page23 = () => import('./pages/_lang_/articles/archive/_year_/_page_.astro.mjs');
const _page24 = () => import('./pages/_lang_/articles/category/_category_/_page_.astro.mjs');
const _page25 = () => import('./pages/_lang_/articles/featured/_page_.astro.mjs');
const _page26 = () => import('./pages/_lang_/articles/_page_.astro.mjs');
const _page27 = () => import('./pages/_lang_/book.astro.mjs');
const _page28 = () => import('./pages/_lang_/contact.astro.mjs');
const _page29 = () => import('./pages/_lang_/login.astro.mjs');
const _page30 = () => import('./pages/_lang_/profile/_id_.astro.mjs');
const _page31 = () => import('./pages/_lang_/rss.astro.mjs');
const _page32 = () => import('./pages/_lang_/rss.xml.astro.mjs');
const _page33 = () => import('./pages/_lang_/search.astro.mjs');
const _page34 = () => import('./pages/_lang_/site.astro.mjs');
const _page35 = () => import('./pages/_lang_/sitemap.xml.astro.mjs');
const _page36 = () => import('./pages/_lang_/terms-of-use.astro.mjs');
const _page37 = () => import('./pages/_lang_/thought/rss.xml.astro.mjs');
const _page38 = () => import('./pages/_lang_/thought/_slug_.astro.mjs');
const _page39 = () => import('./pages/_lang_/thoughts.astro.mjs');
const _page40 = () => import('./pages/_lang_/unsubscribe.astro.mjs');
const _page41 = () => import('./pages/_lang_.astro.mjs');
const _page42 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../node_modules/.pnpm/astro@5.18.1_jiti@2.7.0_lightningcss@1.32.0_rollup@4.60.4_typescript@5.9.3_yaml@2.9.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/auth/confirm.ts", _page1],
    ["src/pages/api/auth/email.ts", _page2],
    ["src/pages/api/auth/github.ts", _page3],
    ["src/pages/api/comments.ts", _page4],
    ["src/pages/api/contact.ts", _page5],
    ["src/pages/api/profile/comment.ts", _page6],
    ["src/pages/api/search.ts", _page7],
    ["src/pages/api/translate.ts", _page8],
    ["src/pages/api/unsubscribe.ts", _page9],
    ["src/pages/auth/auth-code-error.ts", _page10],
    ["src/pages/auth/callback.ts", _page11],
    ["src/pages/auth/confirm.ts", _page12],
    ["src/pages/robots.txt.ts", _page13],
    ["src/pages/sitemap-index.xml.ts", _page14],
    ["src/pages/[lang]/about.astro", _page15],
    ["src/pages/[lang]/album/rss.xml.ts", _page16],
    ["src/pages/[lang]/album/[slug].astro", _page17],
    ["src/pages/[lang]/albums/all/[page].astro", _page18],
    ["src/pages/[lang]/albums/featured.astro", _page19],
    ["src/pages/[lang]/albums/map.astro", _page20],
    ["src/pages/[lang]/article/rss.xml.ts", _page21],
    ["src/pages/[lang]/article/[slug].astro", _page22],
    ["src/pages/[lang]/articles/archive/[year]/[page].astro", _page23],
    ["src/pages/[lang]/articles/category/[category]/[page].astro", _page24],
    ["src/pages/[lang]/articles/featured/[page].astro", _page25],
    ["src/pages/[lang]/articles/[page].astro", _page26],
    ["src/pages/[lang]/book/index.astro", _page27],
    ["src/pages/[lang]/contact.astro", _page28],
    ["src/pages/[lang]/login.astro", _page29],
    ["src/pages/[lang]/profile/[id].astro", _page30],
    ["src/pages/[lang]/rss.astro", _page31],
    ["src/pages/[lang]/rss.xml.ts", _page32],
    ["src/pages/[lang]/search.astro", _page33],
    ["src/pages/[lang]/site.astro", _page34],
    ["src/pages/[lang]/sitemap.xml.ts", _page35],
    ["src/pages/[lang]/terms-of-use.astro", _page36],
    ["src/pages/[lang]/thought/rss.xml.ts", _page37],
    ["src/pages/[lang]/thought/[slug].astro", _page38],
    ["src/pages/[lang]/thoughts.astro", _page39],
    ["src/pages/[lang]/unsubscribe.astro", _page40],
    ["src/pages/[lang]/index.astro", _page41],
    ["src/pages/index.astro", _page42]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
