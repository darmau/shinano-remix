# shinano-remix → Astro 5 + React Islands 迁移设计

> 目标：以**性能**为首要优先，把现有 React Router v7（Cloudflare Pages）站点迁移到 Astro 6 + 选择性 React island，同时将部署平台从 Pages 切换到 Cloudflare Workers（`@astrojs/cloudflare` Workers 模式 + Workers Static Assets）。
>
> 硬性约束：
> 1. 所有现有 URL 不变（含 RSS / sitemap / robots / hreflang / canonical）。
> 2. `app/` 现有代码在用户人工验证前**不删不改**，新代码并行存在。
> 3. 平台 + 框架双轴变更只在 Step 1 PoC 里同时跑通；Step 3 才统一切换。
> 4. 不变更 wrangler 的 preview / production env 拆分。

---

## 0. 全局原则

- **新仓库布局**（与 `app/` 共存）：
  ```
  app/                  # 现有 RR7 代码（保留）
  astro/                # 新 Astro 项目（独立 package.json scripts、tsconfig path 别名 ~/）
    src/
      pages/[lang]/...
      pages/auth/...
      pages/api/...
      components/       # .astro + .tsx 混合
      layouts/
      lib/
        supabase/
        i18n/
        seo/
      middleware/
      content/          # 静态文本（about、terms-of-use 等迁过来）
    astro.config.mjs
    wrangler.jsonc      # 新 Workers 配置（Step 3 才合入主 wrangler.jsonc）
  ```
  并行期间根目录 `package.json` 增加 `dev:astro` / `build:astro` / `deploy:astro` 脚本，互不影响现有 `dev` / `build` / `deploy`。

- **Astro 配置基线**：
  ```js
  // astro/astro.config.mjs
  export default defineConfig({
    output: "server",                       // 默认 SSR；静态页用 export const prerender = true
    adapter: cloudflare({
      platformProxy: { enabled: true },
      imageService: "passthrough"          // 站点用 Cloudflare Images CDN，不走 Astro 内置
    }),
    i18n: {
      locales: ["zh", "en", "jp"],
      defaultLocale: "zh",
      routing: { prefixDefaultLocale: true } // 现状 /zh 总是出现在 URL
    },
    integrations: [react(), sitemap(/* 见 §7 */)],
    vite: {
      plugins: [tailwindcss()]
    }
  });
  ```

- **CSS**：Tailwind v4 走 `@tailwindcss/vite` 插件，比当前 PostCSS 模式构建更快、SSR 也兼容。当前的 `app/tailwind.css` 直接迁过来（Tailwind v4 是单文件 `@import "tailwindcss";`）。

- **TS 别名**：`~/` 复用，让组件迁移时改动最小。

---

## 1. 路由映射表

| 当前 RR7 路由 | Astro 路径 | 渲染模式 | 备注 |
|---|---|---|---|
| `$lang._index.tsx` | `pages/[lang]/index.astro` | **prerender** | 首页文章列表，按语言 SSG（`getStaticPaths` 返回三种 lang） |
| `$lang.about.tsx` | `pages/[lang]/about.astro` | **prerender** | 资料 + 静态结构化数据 |
| `$lang.terms-of-use.tsx` | `pages/[lang]/terms-of-use.astro` | **prerender** | Markdown 静态渲染 |
| `$lang.site.tsx` | `pages/[lang]/site.astro` | **prerender** | 技术栈说明，纯静态 |
| `$lang.book._index.tsx` | `pages/[lang]/book/index.astro` | **prerender + island** | 首屏 SSR 列表，"加载更多"用 island 走 Supabase browser client |
| `$lang.article.$slug.tsx` | `pages/[lang]/article/[slug].astro` | **hybrid** | 静态 prerender 文章 + 评论 island（POST 走单独 endpoint，见下方）+ premium 内容服务端判定 → Step 1 PoC |
| `$lang.articles.$page.tsx` | `pages/[lang]/articles/[page].astro` | **prerender** | `getStaticPaths` 枚举页数 |
| `$lang.articles.archive.$year.$page.tsx` | `pages/[lang]/articles/archive/[year]/[page].astro` | **prerender** | 同上 |
| `$lang.articles.category.$category.$page.tsx` | `pages/[lang]/articles/category/[category]/[page].astro` | **prerender** | 同上 |
| `$lang.articles.featured.$page.tsx` | `pages/[lang]/articles/featured/[page].astro` | **prerender** | 同上 |
| `$lang.album.$slug.tsx` | `pages/[lang]/album/[slug].astro` | **hybrid** | 同 article，含 lightbox / Mapbox island |
| `$lang.albums.all.$page.tsx` | `pages/[lang]/albums/all/[page].astro` | **prerender** | |
| `$lang.albums.featured.tsx` | `pages/[lang]/albums/featured.astro` | **prerender** | |
| `$lang.albums.map.tsx` | `pages/[lang]/albums/map.astro` | **server** | Mapbox island；GeoJSON RPC 在 SSR 取数（每次拉最新数据） |
| `$lang.thought.$slug.tsx` | `pages/[lang]/thought/[slug].astro` | **hybrid** | 同 article |
| `$lang.thoughts.tsx` | `pages/[lang]/thoughts.astro` | **prerender + island** | 首屏 SSR + "加载更多" island |
| `$lang.contact.tsx` | `pages/[lang]/contact.astro` + `pages/api/contact.ts` | **server** | 表单 POST 拆到独立 endpoint，session 验证 |
| `$lang.login.tsx` | `pages/[lang]/login.astro` + `pages/api/auth/email.ts` + `pages/api/auth/github.ts` | **server** | 表单 POST 拆 endpoint；已登录态在 page server 渲染时重定向 |
| `$lang.search.tsx` | `pages/[lang]/search.astro` + `pages/api/search.ts` | **server** | POST → AI 调用 → JSON 回填 |
| `$lang.profile.$id.tsx` | `pages/[lang]/profile/[id].astro` | **server** | 个人页可以预渲染但用户量低，先 server 简单实现 |
| `$lang.unsubscribe.tsx` | `pages/[lang]/unsubscribe.astro` + `pages/api/unsubscribe.ts` | **server** | token 校验 + POST 更新 |
| `unsubscribe.tsx`（顶层） | `pages/unsubscribe.astro` + 同上 endpoint | **server** | 非语言版本（兼容旧链接） |
| `auth.callback.tsx` | `pages/auth/callback.ts` | **endpoint** | 纯 `GET` exchangeCodeForSession，最后 `redirect()` |
| `auth.confirm.tsx` | `pages/auth/confirm.astro` + `pages/api/auth/confirm.ts` | **server** | magic link 校验 + 新用户用户名表单 |
| `auth.auth-code-error.tsx` | `pages/auth/auth-code-error.astro` | **server** | 错误显示 |
| `$lang.rss.tsx` | `pages/[lang]/rss.astro` | **prerender** | "可订阅列表"展示页 |
| `$lang.[rss.xml].tsx` | `pages/[lang]/rss.xml.ts` | **endpoint, prerender** | 见 §7 |
| `$lang.article.[rss.xml].tsx` | `pages/[lang]/article/rss.xml.ts` | **endpoint, prerender** | 同上 |
| `$lang.album.[rss.xml].tsx` | `pages/[lang]/album/rss.xml.ts` | **endpoint, prerender** | 同上 |
| `$lang.thought.[rss.xml].tsx` | `pages/[lang]/thought/rss.xml.ts` | **endpoint, prerender** | 同上 |
| `$lang.[sitemap.xml].tsx` | `pages/[lang]/sitemap.xml.ts` | **endpoint, prerender** | |
| `[sitemap-index.xml].tsx` | `pages/sitemap-index.xml.ts` | **endpoint, prerender** | |
| `[robots.txt].tsx` | `pages/robots.txt.ts` | **endpoint, prerender** | |
| `api.translate.ts` | `pages/api/translate.ts` | **endpoint, server** | AI 翻译 POST |

> RR7 路由的 `action` 在 Astro 里要么放进 page 的 `Astro.request.method === "POST"` 分支，要么独立成 `pages/api/*.ts`。我们统一**拆 endpoint**：static page 才能 prerender，POST 与 GET 解耦也更适合后期加 CDN 缓存。

---

## 2. 组件分类清单

> 来源：扫描 `app/components/*.tsx`，看是否有 useState/useEffect/useRef/事件处理/浏览器 API。

### A. 改写为 `.astro`（37 个里 17 个）

| 组件 | 理由 |
|---|---|
| `Breadcrumb` | 纯 Link 列表 |
| `CTA` | 静态营销区块 |
| `Catalog` | 文章目录，从 props 渲染锚链接 |
| `EXIF` | 纯数据展示 |
| `EmailLogin` | 表单标签，无 JS |
| `FeaturedArticle` | 卡片渲染 |
| `Footer` | 静态链接 |
| `GalleryCard` | 网格 + 懒加载 `<img>` |
| `GithubLogin` | 表单按钮 |
| `HomeTopArticle` | 卡片 |
| `NextAndPrev` | 上下篇 Link |
| `NormalArticleCard` | 卡片 |
| `Pagination` | Link 列表 |
| `Profile` | 条件渲染登录按钮 / 用户信息（基于 cookies 在 server 判定） |
| `RSSContainer` | 服务端字符串生成工具，无 client |
| `RateStars` | 数值→图标 |
| `SearchResult` | 单条搜索结果展示 |
| `ServerPhotoAlbum` | 把 `react-photo-album/server` 包一层即可 |
| `Subnav` | Tab Link |
| `ThoughtCard` 的**展示部分** | "翻译"按钮抽成 island |
| `Username` | 名字 + 图标 |

### B. React island（按指令分组）

| 指令 | 组件 | 理由 |
|---|---|---|
| `client:load` | `Navbar` | Headless UI Dialog/Popover + 移动端菜单，首屏可用性要求高 |
| `client:load` | `PendingNavigation` | Astro 不再需要（页面跳转是真正的 navigation），**可删除** |
| `client:load` | `CommentEditor` | 表单 + Turnstile widget 必须立即可点 |
| `client:load` | `Reaction` | localStorage + RPC，首屏需要立即响应点赞 |
| `client:load` | `Banners` | localStorage 控制关闭，首屏闪烁不可接受 |
| `client:load` | `ShareButton` | 立即可点 |
| `client:idle` | `MarkdownContent` | 评论用的 marked 渲染，可推迟 |
| `client:idle` | `ThoughtCardActions`（拆出来） | 翻译按钮 |
| `client:idle` | `ReadingProcess` | 阅读进度条，可推迟 |
| `client:visible` | `Mapbox` | 文章里的单点地图（已有 IntersectionObserver，Astro 的 visible 取代之） |
| `client:visible` | `MapGallery` | 相册地图聚合 |
| `client:visible` | `ContentContainer` | 文章主体 + highlight.js（推迟到滚动到该区域；高亮可以接受推迟） |
| `client:visible` | `GallerySlide` | lightbox 用户点击时才需要 |
| `client:visible` | `ArticleImage` / `GalleryImage` / `ResponsiveImage` | 渐进加载，进入视口才需要 hook |

### C. 拆分（mixed）

- `CommentBlock`：评论本身可 `.astro`，只把"回复"按钮抽成微 island（`<button>` + `dispatchEvent` 触发上层 `CommentEditor` 的回填逻辑）。

### D. 主入口组件

- `root.tsx` → 拆为：
  - `src/layouts/Base.astro`（HTML 骨架、`<Meta />` 等价物、JSON-LD `WebSite`）
  - `src/components/AuthProvider.tsx`（client:load island，承担 `onAuthStateChange` 与 cookie 同步）
  - `src/middleware.ts`（语言重定向 + Supabase session 注入到 `locals`）

---

## 3. i18n 策略

### 3.1 路由层

Astro 内置 i18n：`locales: ["zh", "en", "jp"]`，`prefixDefaultLocale: true`，与当前 URL 形态完全一致（`/zh`, `/en`, `/jp`）。所有页面都放 `pages/[lang]/...` 下。

> 注意：现有路由里 `lang` 段叫 `$lang`（即 RR7 参数），新 Astro 里我们直接用 `[lang]` 命名段，避免动一层 layout。Astro 也支持读取 `Astro.params.lang`。

### 3.2 Middleware 伪代码

```ts
// astro/src/middleware/index.ts
import { defineMiddleware, sequence } from "astro:middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const LOCALES = ["zh", "en", "jp"] as const;
const DEFAULT = "zh";
const MULTI_LANG_TOP_PATHS = new Set([
  "", "article", "articles", "album", "albums",
  "thoughts", "thought", "about", "contact", "site",
  "rss", "signup", "login", "book", "terms-of-use",
]);

const langRedirect = defineMiddleware(async ({ request, url }, next) => {
  const first = url.pathname.split("/")[1] ?? "";
  // 已经带语言前缀的、auth 顶层路径、xml/txt 资源等都放过
  if (LOCALES.includes(first as any)) return next();
  if (!MULTI_LANG_TOP_PATHS.has(first)) return next();

  const accept = request.headers.get("accept-language") ?? "";
  const langs = new Negotiator({ headers: { "accept-language": accept } }).languages();
  const target = match(langs, LOCALES as readonly string[], DEFAULT);
  return Response.redirect(new URL(`/${target}${url.pathname}`, url), 307);
});

// 见 §4，supabase middleware 共用
export const onRequest = sequence(langRedirect, supabaseMiddleware);
```

**关键点：** 把 root.tsx 里 `loader` 的语言判断逻辑外提到 middleware，这样静态 prerender 页面也能受益（middleware 在 SSR/edge 层运行，prerender 页面命中 Cloudflare cache 时根本不进 middleware，性能更佳）。

### 3.3 SEO（canonical + hreflang）

新建 `src/lib/seo/i18nLinks.ts`，**1:1 复刻** `app/utils/i18nLinks.ts`，返回值改成 Astro 友好的 `<link>` / `<meta>` 对象数组，再在 layout 里 `{links.map(l => …)}` 渲染。`langMap` 保持 `zh → zh-Hans`、`jp → ja`。

每个 page 顶部 `<Layout title=... description=... ogImage=... availableLangs={...} pathWithoutLang="article/foo"> ... </Layout>`，layout 内统一产出 canonical + alternate hreflang + og:locale:alternate，保证 SEO 标签输出顺序、字段完全等价。

---

## 4. Supabase Auth on Workers

### 4.1 共享 server client

```ts
// astro/src/lib/supabase/server.ts
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { APIContext } from "astro";

export function createSupabaseServer(ctx: APIContext) {
  const setCookies: string[] = [];
  const env = ctx.locals.runtime.env; // Cloudflare bindings
  const client = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookieOptions: { maxAge: 60 * 60 * 24 * 14, path: "/", sameSite: "lax" },
    cookies: {
      getAll() {
        return parseCookieHeader(ctx.request.headers.get("Cookie") ?? "")
          .map(c => ({ name: c.name, value: c.value ?? "" }));
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => {
          setCookies.push(serializeCookieHeader(name, value, options));
        });
      },
    },
  });
  return { client, setCookies };
}
```

### 4.2 Middleware 注入 session

```ts
// astro/src/middleware/supabase.ts
export const supabaseMiddleware = defineMiddleware(async (ctx, next) => {
  const { client, setCookies } = createSupabaseServer(ctx);
  ctx.locals.supabase = client;
  const { data: { session } } = await client.auth.getSession();
  ctx.locals.session = session;

  const response = await next();
  // 把 supabase 写入的 Set-Cookie 合并到响应
  for (const c of setCookies) response.headers.append("Set-Cookie", c);
  return response;
});
```

Page / endpoint 里直接 `Astro.locals.session` / `Astro.locals.supabase`，写法比 RR7 里手动 `createClient(request, context)` 更整洁。

### 4.3 Auth 路由代码骨架

```ts
// pages/auth/callback.ts ← 1:1 复刻 app/routes/auth.callback.tsx
export const GET: APIRoute = async (ctx) => {
  const code = new URL(ctx.request.url).searchParams.get("code");
  const next = new URL(ctx.request.url).searchParams.get("next") ?? "/";
  if (!code) return ctx.redirect(`/auth/auth-code-error?next=${encodeURIComponent(next)}`);
  const { error } = await ctx.locals.supabase.auth.exchangeCodeForSession(code);
  if (error) return ctx.redirect(`/auth/auth-code-error?reason=${encodeURIComponent(error.message)}`);
  return ctx.redirect(next);
  // setCookies 通过 middleware 自动 append（关键：middleware 在 next() 之后写 cookie）
};
```

```ts
// pages/api/auth/email.ts ← magic link
export const POST: APIRoute = async (ctx) => {
  const form = await ctx.request.formData();
  const email = (form.get("email") as string)?.trim();
  if (!email) return jsonError("email_required", 400);
  const origin = new URL(ctx.request.url).origin;
  const next = form.get("next") as string ?? "/zh";
  const { error } = await ctx.locals.supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      shouldCreateUser: true,
    },
  });
  return error ? jsonError(error.message, 400) : json({ success: true });
};
```

```ts
// pages/api/auth/github.ts
export const POST: APIRoute = async (ctx) => {
  const origin = new URL(ctx.request.url).origin;
  const next = (await ctx.request.formData()).get("next") as string ?? "/zh";
  const { data, error } = await ctx.locals.supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) return jsonError(error.message, 400);
  return ctx.redirect(data.url!, 302);
};
```

```ts
// pages/api/auth/confirm.ts — 复刻 auth.confirm.tsx 的 token 校验 + 新用户用户名
// pages/auth/confirm.astro — 渲染表单（needsUsername 分支）
```

### 4.4 客户端 onAuthStateChange

`<AuthProvider>` island（`client:load`）在浏览器侧 `createBrowserClient` + 监听 `onAuthStateChange`，**当 access token 与 server 不一致时**调用 `window.location.reload()` 触发 SSR 重新拿 session（取代 RR7 的 `useRevalidator`）。

---

## 5. 依赖与替代方案

| 现有依赖 | 处理方式 | 备注 |
|---|---|---|
| `react-router` / `@react-router/*` | **移除** | Astro 替代 |
| `@react-router/cloudflare` | **移除** | adapter 换 `@astrojs/cloudflare` |
| `@supabase/ssr` / `@supabase/supabase-js` | **保留** | 直接复用 |
| `@formatjs/intl-localematcher` / `negotiator` | **保留** | middleware 用 |
| `@headlessui/react` / `@heroicons/react` | **保留** | 只在 Navbar / Reaction 等 island 内 |
| `mapbox-gl` / `@mapbox/mapbox-gl-language` | **保留** | island only，确保只在 `client:visible` 后加载 |
| `@marsidev/react-turnstile` | **保留** | CommentEditor island |
| `react-turnstile` | **删除** | 与上面重复，二选一（看哪个被实际 import） |
| `react-photo-album` + `yet-another-react-lightbox` | **保留** | gallery island；`react-photo-album/server` 用法在 .astro 里也能用（SSR 字符串生成） |
| `marked` | **保留** | 评论内容渲染 |
| `highlight.js` | **保留** | `ContentContainer` 用，client island |
| `remix-utils` | **审查** | 若仅用于 Pages utilities，可移除；如果用于 csrf 等需要找替代 |
| `lodash` | **保留** | 单点替换为 `lodash-es` 以利 tree-shake（构建期间观察 bundle） |
| `isbot` | **保留** | 仍用于 SSR fallback 判断 |
| `react` / `react-dom` 19 | **保留** | Astro 5 + `@astrojs/react` 支持 React 19 |
| `tailwindcss` v4 + `@tailwindcss/postcss` | **改 vite 插件** | 换 `@tailwindcss/vite`，删 postcss.config |
| `@tailwindcss/forms` | **保留** | 在 `@import` 后追加 plugin（v4 写法） |

新增：
- `astro` `^5`
- `@astrojs/cloudflare` `^12`（含 Workers 模式）
- `@astrojs/react` `^4`
- `@astrojs/sitemap` `^3`（可选，我们自定义 sitemap 已能覆盖，但 integration 能自动给静态页加 hreflang）
- `@tailwindcss/vite` `^4`

---

## 6. RSS / Sitemap / Robots

**所有 XML/txt 端点都保留现有 URL 形态**：

- `/[lang]/rss.xml` → `pages/[lang]/rss.xml.ts`，`export const prerender = true`，`getStaticPaths` 返回三种 lang。内部直接调用 `getSupabaseAdmin()`（用 anon key 即可，按 RLS）查询 + 复用现有 `generateRss` 函数（搬到 `lib/feeds/`）。
- `/[lang]/article/rss.xml`、`/[lang]/album/rss.xml`、`/[lang]/thought/rss.xml` 同上。**TipTap → 内联样式 HTML** 的渲染逻辑（约 200 行）整体搬到 `lib/feeds/tiptap-to-html.ts`，纯函数迁移零风险。
- `/[lang]/sitemap.xml` → `pages/[lang]/sitemap.xml.ts`，`prerender = true`。
- `/sitemap-index.xml` → `pages/sitemap-index.xml.ts`，**静态字符串**（只列三种语言的 sitemap），可 prerender。
- `/robots.txt` → `pages/robots.txt.ts`，prerender。注意 `BASE_URL` 在构建期注入（用 `import.meta.env.BASE_URL` 或编译期变量）。

> 决定：**不**使用 `@astrojs/sitemap` integration 来生成，因为我们的 sitemap 是从 Supabase 取数据动态生成的（articles/albums/thoughts 的 slug + lastmod），integration 生成不出。

---

## 7. Cloudflare Workers 部署方案

### 7.1 wrangler.jsonc 改造（Step 3 才合并）

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "shinano-remix",
  "compatibility_date": "2025-11-07",
  "compatibility_flags": ["nodejs_compat"],
  "main": "./dist/_worker.js/index.js",        // Astro Cloudflare adapter 输出
  "assets": {
    "directory": "./dist",                     // Workers Static Assets
    "binding": "ASSETS",
    "not_found_handling": "single-page-application" // 让 SSR 处理 404；具体值参考 adapter 文档
  },
  "ai": { "binding": "AI", "remote": true },
  "env": {
    "preview": {
      "name": "shinano-remix-preview",
      "main": "./dist/_worker.js/index.js",
      "assets": { "directory": "./dist", "binding": "ASSETS" },
      "ai": { "binding": "AI", "remote": true }
    },
    "production": {
      "name": "shinano-remix",
      "main": "./dist/_worker.js/index.js",
      "assets": { "directory": "./dist", "binding": "ASSETS" },
      "ai": { "binding": "AI", "remote": true }
    }
  }
}
```

删除 `pages_build_output_dir`。

### 7.2 npm script 改造

```jsonc
{
  "dev": "astro dev",                            // 本地
  "dev:wrangler": "wrangler dev",                // 本地走 Workers runtime
  "build": "astro build",
  "preview": "wrangler dev",                     // 部署前手测
  "deploy": "astro build && wrangler deploy",
  "deploy:preview": "astro build && wrangler deploy --env preview",
  "deploy:production": "astro build && wrangler deploy --env production"
}
```

> 注意：`wrangler pages deploy` 命令全部替换为 `wrangler deploy`。

### 7.3 环境变量 / secrets 迁移清单

| 名称 | 现状 | Workers 迁移做法 |
|---|---|---|
| `SUPABASE_URL` | Pages dashboard | `wrangler secret put SUPABASE_URL --env production`（+ preview） |
| `SUPABASE_ANON_KEY` | Pages dashboard | 同上 |
| `BASE_URL` | Pages dashboard | 同上（preview/production 不同） |
| `IMG_PREFIX` | Pages dashboard | 同上 |
| `MAPBOX_TOKEN` | Pages dashboard | 同上 |
| `TURNSTILE_SITE_KEY` | Pages dashboard | 同上（公开值，可放 `[vars]` 而非 secret） |
| `TURNSTILE_SECRET_KEY` | Pages dashboard | secret put |
| `RESEND_KEY` | Pages dashboard (optional) | secret put（如果仍在用） |
| `AI` binding | wrangler.jsonc 已声明 | 保留 |
| 本地开发 | `.dev.vars` 已有？ | **检查现状**；如无，新建 `.dev.vars` 列出非 secret 的 var，把 secret 写 `.dev.vars`（git 忽略） |

### 7.4 回滚方案

1. **Pages 项目暂不删**。新 Worker 用临时 `*.workers.dev` 域名跑至少 7 天观察。
2. 切流量：在 Cloudflare dashboard 把自定义域 `darmau.co` 从 Pages 项目摘下，绑到新 Worker。若新 Worker 出问题，把自定义域**重新指回 Pages 项目**即可恢复（DNS proxy 立即生效）。
3. 7 天稳定后再考虑删除 Pages 项目。期间所有 secrets 同步双存。

### 7.5 Asset 服务

Astro Cloudflare Workers adapter 输出的 `dist/` 包含：
- `_worker.js/`（SSR 入口）
- 客户端 hashed JS/CSS chunks
- 预渲染的 HTML 文件
通过 Workers Static Assets 直接服务静态产物，命中静态文件不走 worker（计费友好，延迟低）。SSR 路由才进入 worker。

---

## 8. 风险登记册

| # | 风险 | 检测 | 缓解 / 回滚 |
|---|---|---|---|
| R1 | Astro 5 + React 19 + `@astrojs/react` 兼容性意外（peer dep / SSR 双渲染问题） | PoC build 时立即暴露 | 锁定 `@astrojs/react@^4.x`；若仍冲突，临时降到 React 18.3 + types |
| R2 | `@supabase/ssr` 在 Workers runtime 的 cookie 处理与 Pages 行为差异 | PoC 登录全流程（email magic link + GitHub OAuth + onAuthStateChange）人工跑一遍 | middleware 写法照搬 RR7 的，若失败，临时 fallback：每个需要 session 的页面手动 `createSupabaseServer(ctx)` 而非依赖 middleware |
| R3 | `mapbox-gl` 在 Astro 的 `client:visible` 下首次出现的样式/字体加载顺序异常 | albums/map 页面手动验证（移动 + 桌面） | island 顶部 `import "mapbox-gl/dist/mapbox-gl.css"` 不变；Astro 会把它注入 |
| R4 | TipTap → HTML 的 RSS 渲染输出与现有 feed 字节不一致，被 RSS 阅读器视为大量"新内容" | 旧/新 feed 对 diff（脚本：拉两份 XML，规范化空白后 diff） | 直接搬代码、不做格式化变更；若 diff 出现，固化为快照测试 |
| R5 | `prerender = true` 的页面无法读取 cookies/session → 个性化失效 | PoC：评论区在未登录态/已登录态都要测 | 个性化部分（已登录用户名展示、premium 内容显隐）走 island 或 SSR；列表 prerender 不动 |
| R6 | Cloudflare Workers Static Assets 单 worker 大小或上传超限 | `wrangler deploy --dry-run` 先看输出 | 把 highlight.js languages 按需 import；只加载必要 mapbox style；图片不放 dist |
| R7 | Sitemap / RSS 在 prerender 模式下数据陈旧（构建期 snapshot） | 上线后 24h 内人工触发 deploy 验证 | 加 cron trigger 定时 redeploy；或把数据敏感的 RSS 改 server 模式（计算开销小） |
| R8 | URL 变化导致 SEO 回归 | Step 1 PoC 完成后做"路由清单 diff" + 上线后 Search Console 抓取诊断 | 任何变化必须用 301 重定向兜底；本计划目标是 0 变化 |
| R9 | i18n middleware 误判把 `/robots.txt` `/sitemap-index.xml` 当成需要语言重定向的路径 | 单元测试 + 手动 curl | middleware 白名单显式排除非 `MULTI_LANG_TOP_PATHS` 的顶层段 |
| R10 | 自定义域切流量瞬间 cookie domain 冲突导致用户登出 | DNS 切换前 staging 验证 | 切换前后保持 cookie domain 一致（`darmau.co`） |
| R11 | Headless UI v2 在 Astro `client:load` 下 SSR mismatch | PoC Navbar 测试 | 如出现，改 `client:only="react"` |
| R12 | Page view 计数（localStorage + RPC）在 `client:visible` 下首屏没触发 | 文章页人工验证：浏览后 24h 内重复访问不重复计数 | 改 `client:load` 或在 Astro 页面顶部直接放 `<script>` 跑 |
| R13 | Cloudflare AI binding 在 Workers 模式行为变化 | `api.translate` + `albums.map`（如果用到 AI）测试 | `context.cloudflare.env.AI` → Astro `locals.runtime.env.AI`，否则一致 |
| R14 | 双轴变更难以归因故障（Astro bug? Workers bug?） | 任何阶段保留"先回滚一轴"的能力 | Step 3 切换前确保 Astro on Pages 也跑通过一次（mental check，不必真部署） |

---

## 9. PoC 选型

**选 `$lang.article.$slug` 作为 Step 1 垂直切片**，因为它一次性覆盖了：

- **i18n**：`[lang]` 动态段 + canonical/hreflang/og:locale:alternate（`i18nLinks` 函数）
- **SEO**：复杂 meta（OG/Twitter/article schema）+ 三种 JSON-LD（Article、Breadcrumb、Comment）
- **Supabase 数据获取**：5 个并行查询、`!inner` join、分页评论
- **Supabase 会话**：premium 文章访问控制（已登录可读全文，否则展示锁屏 + 隐藏 plain text fallback）
- **服务端 action**：评论提交（含 Turnstile 校验）— 借此跑通 endpoint 写法
- **多个 island**：`Reaction`（client:load + localStorage + RPC）、`ReadingProcess`（client:load）、`CommentEditor`（client:load + Turnstile）、`ContentContainer`（client:visible + highlight.js）
- **客户端 RPC**：`trackPageView` localStorage + 限流
- **结构化数据混合输出**：服务端生成 JSON-LD + client-only RPC 调用

跑通这一个页面，意味着上述每一类机制都验证过；后续静态页（about / site / terms-of-use）、列表页、其他详情页都是相同 pattern 的减法。

PoC 成功标准（必须人工在浏览器里验证）：
1. `/zh/article/<某 slug>` 视觉上与现有页面无差异（自带 diff 工具截图比对）
2. 评论提交：未登录 + 登录两种路径都成功；Turnstile 通过；新评论出现在列表
3. premium 文章未登录时显示锁屏；登录后看到全文
4. 阅读量 24h 内不重复增加；首次访问 +1 立即更新
5. `<head>` 输出的 canonical/hreflang/og 与旧版**字符串等价**（diff 工具）
6. JSON-LD（Article + Breadcrumb + 至少 1 条 Comment）格式正确，rich result test 通过
7. Lighthouse Performance：移动端 ≥ 95（旧版基线 + Δ 在 §10）

---

## 10. 性能基线与目标（参考用）

> 这一节不是 Step 0 必交付，但放在这里方便 Step 1 PoC 完成后立即对比。

| 指标 | 旧版（RR7 on Pages） | 目标（Astro on Workers） |
|---|---|---|
| article 页 HTML 体积 | _Step 1 实测_ | -30% 以上 |
| article 页首屏 JS（hydration）体积 | _Step 1 实测_ | -50% 以上 |
| TTFB（Workers cold） | _Step 1 实测_ | ≤ 旧版 |
| LCP（移动 4G slow） | _Step 1 实测_ | -200ms 以上 |

---

## 11. 不在本计划范围内（明确不做）

- 不动 `app/`、不动现有 Pages 部署，直到 Step 3 切换。
- 不改 Supabase schema、不动 RPC 函数定义。
- 不变更图片 CDN（仍 `cdn-cgi/image/...`）。
- 不引入额外的状态管理库（zustand / jotai 等），现状只用 React hooks + Supabase RPC 即可。
- 不引入 PWA / Service Worker（不在性能目标里）。
- 不重构 i18n 文案文件，复用 `app/locales/` 全部内容（直接 `import` 跨目录使用）。

---

> **Step 0 至此结束**。请审阅本计划，特别关注：
> 1. 第 1 节的路由 / 渲染模式划分是否同意（尤其哪些走 `prerender`，会影响构建速度与数据新鲜度）；
> 2. 第 5 节的依赖去留判定（特别是 `react-turnstile` vs `@marsidev/react-turnstile` 是否需要保留两个）；
> 3. 第 7.4 节的回滚策略（DNS 切换窗口期接受度）；
> 4. 第 9 节的 PoC 选型（是否同意先做 `article` 详情页）。
>
> 用户确认后再进入 Step 1 PoC 实施。
