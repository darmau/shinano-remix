globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, _ as addAttribute, ae as renderComponent, al as renderTemplate, a1 as createAstro, aq as unescapeHTML } from './astro/server_D3oA7eJe.mjs';
import { r as reactExports } from './_@astro-renderers_BA3-2LID.mjs';
import { g as getTime } from './getTime_CcDELrHl.mjs';
import { g as getLanguageLabel } from './getLanguageLabel_D4hYx-hS.mjs';
import { g as g$1 } from './marked.esm_BvvH-1Q_.mjs';
import { j as jsxRuntimeExports, c as createSupabaseBrowser } from './Base_De4mBBde.mjs';

const CommentText = {
  "zh": {
    "submit": "提交",
    "set_anonymous": "前台匿名。需等待审核通过后显示",
    "anonymous": "匿名用户",
    "add_comment": "本评论框支持markdown语法",
    "login_comment": "请登录后发表评论",
    "signup": "注册",
    "login": "登录",
    "moderation_notice": "未登录用户的评论需要等待审核。您填写的邮箱将不会被公开。",
    "author": "作者",
    "reply": "回复",
    "cancel_reply": "取消回复",
    "receive_notification": "有人回复时邮件提醒我",
    "name_placeholder": "你的名字",
    "email_placeholder": "邮箱",
    "website_placeholder": "网站"
  },
  "en": {
    "submit": "Submit",
    "set_anonymous": "This comment will be displayed as anonymous, and will be reviewed before it is displayed",
    "anonymous": "Anonymous",
    "add_comment": "This comment box supports markdown syntax",
    "login_comment": "Please login to comment",
    "signup": "Sign up",
    "login": "Log in",
    "moderation_notice": "Guest comments are held for review before appearing. Your email will not be publicly displayed.",
    "author": "Author",
    "reply": "Reply",
    "cancel_reply": "Cancel reply",
    "receive_notification": "Email me when someone replies",
    "name_placeholder": "Your name",
    "email_placeholder": "Email",
    "website_placeholder": "Website"
  },
  "jp": {
    "submit": "提出",
    "set_anonymous": "このコメントは匿名で表示され、表示される前に審査されます",
    "anonymous": "匿名",
    "add_comment": "このコメントボックスはmarkdown構文をサポートしています",
    "login_comment": "コメントするにはログインして",
    "signup": "サインアップ",
    "login": "ログイン",
    "moderation_notice": "未ログインのコメントは承認後に表示されます。メールアドレスは公開されません。",
    "author": "著者",
    "reply": "返信",
    "cancel_reply": "返信をキャンセル",
    "receive_notification": "返信があったらメールで知らせる",
    "name_placeholder": "お名前",
    "email_placeholder": "メールアドレス",
    "website_placeholder": "ウェブサイト"
  }
};

function CheckBadgeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$3 = /*#__PURE__*/ reactExports.forwardRef(CheckBadgeIcon);

function IdentificationIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(IdentificationIcon);

function InformationCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(InformationCircleIcon);

function HomeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/reactExports.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/reactExports.createElement("path", {
    d: "M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
  }), /*#__PURE__*/reactExports.createElement("path", {
    d: "m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(HomeIcon);

const $$Astro$3 = createAstro();
const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { lang, pages } = Astro2.props;
  const homeLabel = lang === "zh" ? "\u9996\u9875" : lang === "jp" ? "\u30DB\u30FC\u30E0" : "Home";
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb" class="flex my-4"> <ol class="flex items-center space-x-4"> <li> <div> <a${addAttribute(`/${lang}`, "href")} class="text-gray-400 hover:text-gray-500"${addAttribute(homeLabel, "aria-label")}> ${renderComponent($$result, "HomeIcon", ForwardRef, { "aria-hidden": "true", "className": "h-5 w-5 shrink-0" })} </a> </div> </li> ${pages.map((page) => renderTemplate`<li> <div class="flex items-center"> <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 shrink-0 text-gray-300"> <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path> </svg> <a${addAttribute(`/${lang}/${page.to}`, "href")}${addAttribute(page.current ? "page" : void 0, "aria-current")} class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"> ${page.name} </a> </div> </li>`)} </ol> </nav>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Breadcrumb.astro", void 0);

const $$Astro$2 = createAstro();
const $$Username = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Username;
  const { comment } = Astro2.props;
  return renderTemplate`${comment.is_anonymous ? renderTemplate`${maybeRenderHead()}<h4 class="flex items-center font-medium text-zinc-800 mb-2 hover:text-violet-700">${comment.website ? renderTemplate`<a class="text-violet-700 hover:text-violet-500"${addAttribute(comment.website, "href")} target="_blank" rel="noreferrer">${comment.name}</a>` : renderTemplate`<span>${comment.name}</span>`}</h4>` : renderTemplate`<h4 class="flex items-center gap-1 font-medium text-zinc-800 mb-2">${comment.users && comment.users.website ? renderTemplate`<a class="text-violet-700 hover:text-violet-500"${addAttribute(comment.users.website, "href")} target="_blank" rel="noreferrer">${comment.users.name}</a>` : renderTemplate`<span>${comment.users?.name}</span>`}${comment.users?.role === "admin" ? renderTemplate`${renderComponent($$result, "IdentificationIcon", ForwardRef$2, { "className": "w-4 h-4 inline-block text-violet-700" })}` : renderTemplate`${renderComponent($$result, "CheckBadgeIcon", ForwardRef$3, { "className": "w-4 h-4 inline-block text-violet-700" })}`}</h4>`}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Username.astro", void 0);

const $$Astro$1 = createAstro();
const $$MarkdownContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MarkdownContent;
  const { content } = Astro2.props;
  function escapeHtml(input) {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  const escaped = escapeHtml(content);
  const rendered = g$1.parse(escaped, { gfm: true, breaks: true });
  const html = typeof rendered === "string" ? rendered : "";
  return renderTemplate`${maybeRenderHead()}<div class="comment-markdown">${unescapeHTML(html)}</div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/MarkdownContent.astro", void 0);

function CommentReplyButton({
  comment,
  label
}) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("comment:reply", { detail: comment }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleClick,
      className: "text-sm text-violet-700 hover:text-violet-500",
      children: label
    }
  );
}

const $$Astro = createAstro();
const $$CommentBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CommentBlock;
  const { comment, lang } = Astro2.props;
  const label = getLanguageLabel(CommentText, lang);
  return renderTemplate`${maybeRenderHead()}<div class="pt-8"> ${renderComponent($$result, "Username", $$Username, { "comment": comment })} <div class="text-sm text-zinc-500">${getTime(comment.created_at, lang)}</div> ${comment.reply_to && renderTemplate`<div class="mt-2"> <p class="p-4 bg-zinc-100 text-sm text text-zinc-700 mb-4"> ${`\u56DE\u590D ${comment.reply_to.is_anonymous ? comment.reply_to.name : comment.reply_to.users.name}: ${comment.reply_to.content_text.substring(0, 120)}...`} </p> </div>`} <div class="my-4 text-base text-zinc-700 space-y-2"> ${renderComponent($$result, "MarkdownContent", $$MarkdownContent, { "content": comment.content_text })} </div> ${renderComponent($$result, "CommentReplyButton", CommentReplyButton, { "client:load": true, "comment": comment, "label": label.reply, "client:component-hydration": "load", "client:component-path": "~/components/CommentReplyButton.tsx", "client:component-export": "default" })} </div>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/CommentBlock.astro", void 0);

function ArticleImage({ attrs }) {
  const { prefix } = attrs;
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const imgRef = reactExports.useRef(null);
  const highResSrc = `${prefix}/cdn-cgi/image/format=auto,width=740/${attrs.storage_key}`;
  const highResSrcSet = `${highResSrc} 1x, ${prefix}/cdn-cgi/image/format=auto,width=1280/${attrs.storage_key} 2x`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "my-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-md", id: `image-${attrs.id}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          className: `brightness-110 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`,
          src: `${prefix}/cdn-cgi/image/format=auto,width=24/${attrs.storage_key}`,
          alt: attrs.alt ?? "",
          width: "740",
          style: { filter: "blur(36px)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "picture",
        {
          className: `transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("source", { media: "(max-width: 639px)", srcSet: highResSrc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("source", { media: "(min-width: 640px)", srcSet: highResSrcSet }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                ref: imgRef,
                className: "group-hover:scale-105 w-full h-full object-cover transition-all duration-300",
                src: highResSrc,
                srcSet: highResSrcSet,
                sizes: "(max-width: 720px) 100vw, 2x",
                alt: attrs.alt ?? "",
                width: "740",
                onLoad: () => setImageLoaded(true)
              }
            )
          ]
        }
      )
    ] }),
    attrs.caption && /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "my-3 flex justify-start items-start gap-2 text-zinc-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "mt-0.5 w-5 h-5 inline-block text-zinc-400" }),
      attrs.caption
    ] })
  ] });
}

function isContentStructure(content) {
  return typeof content === "object" && content !== null && "content" in content && Array.isArray(content.content);
}
function ContentContainer({
  content,
  prefix
}) {
  if (!content || !isContentStructure(content)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "没有内容" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: content.content.map((node, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node, prefix }, index)) });
}
const hasImageAttrs = (attrs) => Boolean(
  attrs && (typeof attrs.id === "number" || typeof attrs.id === "string") && typeof attrs.storage_key === "string"
);
const Node = ({ node, prefix }) => {
  switch (node.type) {
    case "paragraph":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { content: node.content, prefix });
    case "heading":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { attrs: node.attrs, content: node.content, prefix });
    case "blockquote":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Blockquote, { content: node.content, prefix });
    case "customCodeBlock":
    case "codeBlock":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { attrs: node.attrs, content: node.content });
    case "horizontalRule":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Horizontal, {});
    case "image":
      return hasImageAttrs(node.attrs) ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImage, { attrs: { ...node.attrs, prefix } }) : null;
    case "table":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { content: node.content, prefix });
    case "bulletList":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { content: node.content, prefix });
    case "orderedList":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(OrderedList, { attrs: node.attrs, content: node.content, prefix });
    case "embed":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Iframe, { attrs: node.attrs });
    default:
      return null;
  }
};
const Paragraph = ({ content }) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-4 text-zinc-800 leading-8", children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextNode, { node: item }, index)) });
const Heading = ({ attrs, content }) => {
  const headingId = attrs?.id !== void 0 ? String(attrs.id) : void 0;
  switch (attrs?.level) {
    case 2:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-16 font-bold text-3xl text-zinc-800", id: headingId, children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextNode, { node: item }, index)) });
    case 3:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-12 mb-4 font-bold text-2xl text-zinc-700", id: headingId, children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextNode, { node: item }, index)) });
    case 4:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-8 mb-4 font-bold text-xl text-zinc-600", id: headingId, children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextNode, { node: item }, index)) });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-bold text-3xl text-zinc-800", id: headingId, children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TextNode, { node: item }, index)) });
  }
};
const Blockquote = ({ content, prefix }) => /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "my-4 py-1 pl-4 border-l-2 border-violet-800 text-lg font-medium", children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node: item, prefix }, index)) });
const CodeBlock = ({ attrs, content }) => {
  const language = attrs?.language ?? "";
  const codeContent = content?.[0]?.text ?? "";
  const [highlightedCode, setHighlightedCode] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        await Promise.resolve({                     });
        const hljs = await import('./index_C-O1k9yh.mjs');
        const hljsModule = hljs.default || hljs;
        const result = hljsModule.highlight(codeContent, { language });
        if (!cancelled) {
          setHighlightedCode(result.value);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load highlight.js:", error);
        if (!cancelled) {
          setHighlightedCode(codeContent);
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [codeContent, language]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "hljs rounded-xl overflow-hidden p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-yellow-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-green-500" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: language })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: language ? `language-${language}` : "", children: codeContent }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "code",
      {
        className: language ? `language-${language}` : "",
        dangerouslySetInnerHTML: { __html: highlightedCode }
      }
    )
  ] });
};
const Horizontal = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-8", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-gray-300" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white px-2 text-sm text-gray-500", children: "Continue" }) })
] });
const Iframe = ({ attrs }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "iframe-container", dangerouslySetInnerHTML: { __html: attrs.code } });
const Table = ({ content, prefix }) => {
  const headerRow = content?.[0];
  const bodyRows = content?.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-300 mt-8 border border-gray-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: headerRow && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: headerRow.content?.map((cell, cellIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-4 py-1 text-left text-sm font-bold text-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node: cell.content?.[0], prefix }) }, cellIndex)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bodyRows?.map((row, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "even:bg-gray-50", children: row.content?.map((cell, cellIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "whitespace-nowrap px-4 py-1 text-sm text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node: cell.content?.[0], prefix }) }, cellIndex)) }, rowIndex)) })
  ] });
};
const BulletList = ({ content, prefix }) => /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-4", children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item.content?.map((node, nodeIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node, prefix }, nodeIndex)) }, index)) });
const OrderedList = ({ attrs, content, prefix }) => /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { start: attrs?.start, className: "list-decimal pl-4", children: content?.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item.content?.map((node, nodeIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { node, prefix }, nodeIndex)) }, index)) });
const TextNode = ({ node }) => {
  if (node.type === "hardBreak") return /* @__PURE__ */ jsxRuntimeExports.jsx("br", {});
  let content = node.text;
  if (node.marks) {
    node.marks.forEach((mark) => {
      switch (mark.type) {
        case "link":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              className: "text-violet-700 after:content-['_↗'] hover:underline hover:decoration-2 hover:underline-offset-4",
              href: mark.attrs?.href,
              target: mark.attrs?.target,
              rel: mark.attrs?.rel,
              children: content
            }
          );
          break;
        case "bold":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-medium", children: content });
          break;
        case "italic":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: content });
          break;
        case "strike":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("del", { className: "line-through decoration-red-400", children: content });
          break;
        case "highlight":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { className: "bg-yellow-300", children: content });
          break;
        case "code":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono px-2", children: content });
          break;
        case "superscript":
          content = /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { className: "text-sm", children: content });
          break;
      }
    });
  }
  return content;
};

const REACTION_CONFIG = [
  { key: "like", emoji: "👍", label: "Like" },
  { key: "love", emoji: "❤️", label: "Love" },
  { key: "haha", emoji: "😂", label: "Haha" },
  { key: "wow", emoji: "😮", label: "Wow" },
  { key: "sad", emoji: "😢", label: "Sad" },
  { key: "think", emoji: "🤔", label: "Think" }
];
const STORAGE_PREFIX = "reaction_";
const STORAGE_TTL = 1e3 * 60 * 60 * 24 * 14;
const normalizeCounts = (value, fallback) => {
  if (!value || typeof value !== "object") return fallback;
  const record = value;
  return REACTION_CONFIG.reduce((acc, item) => {
    const raw = record[item.key];
    acc[item.key] = typeof raw === "number" ? raw : fallback[item.key];
    return acc;
  }, { ...fallback });
};
const getStorageKey$1 = (pathname, reaction) => `${STORAGE_PREFIX}${pathname}_${reaction}`;
const readStoredReactions = (pathname) => {
  if (typeof window === "undefined") return /* @__PURE__ */ new Set();
  const now = Date.now();
  const selected = /* @__PURE__ */ new Set();
  REACTION_CONFIG.forEach(({ key }) => {
    const itemKey = getStorageKey$1(pathname, key);
    const raw = window.localStorage.getItem(itemKey);
    if (!raw) return;
    const timestamp = Number(raw);
    if (Number.isFinite(timestamp) && now - timestamp < STORAGE_TTL) {
      selected.add(key);
    } else {
      window.localStorage.removeItem(itemKey);
    }
  });
  return selected;
};
const storeReaction = (pathname, reaction) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getStorageKey$1(pathname, reaction), String(Date.now()));
};
function Reaction({
  contentType,
  contentId,
  reactions,
  className = "",
  pathname,
  supabaseUrl,
  supabaseAnonKey
}) {
  const [supabase] = reactExports.useState(() => createSupabaseBrowser(supabaseUrl, supabaseAnonKey));
  const [counts, setCounts] = reactExports.useState(() => ({
    like: reactions?.like ?? 0,
    love: reactions?.love ?? 0,
    haha: reactions?.haha ?? 0,
    wow: reactions?.wow ?? 0,
    sad: reactions?.sad ?? 0,
    think: reactions?.think ?? 0
  }));
  const [active, setActive] = reactExports.useState(/* @__PURE__ */ new Set());
  const [pending, setPending] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setActive(readStoredReactions(pathname));
  }, [pathname]);
  const handleReaction = reactExports.useCallback(
    async (reaction) => {
      if (pending || active.has(reaction)) return;
      setPending(reaction);
      setError(null);
      const fallback = {
        ...counts,
        [reaction]: (counts[reaction] ?? 0) + 1
      };
      const { data, error: rpcError } = await supabase.rpc("add_reaction", {
        content_type: contentType,
        content_id: contentId,
        reaction_type: reaction
      });
      if (rpcError) {
        console.error(rpcError);
        setError("提交失败，请稍后重试。");
        setPending(null);
        return;
      }
      const nextCounts = normalizeCounts(data, fallback);
      setCounts(nextCounts);
      setActive((prev) => {
        const updated = new Set(prev);
        updated.add(reaction);
        storeReaction(pathname, reaction);
        return updated;
      });
      setPending(null);
    },
    [active, contentId, contentType, counts, pathname, supabase, pending]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `my-4 rounded-xl flex flex-col gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: REACTION_CONFIG.map(({ key, emoji }) => {
      const isActive = active.has(key);
      const isLoading = pending === key;
      const count = counts[key] ?? 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "aria-pressed": isActive,
          disabled: isLoading,
          onClick: () => handleReaction(key),
          className: `flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition
              ${isActive ? "border-violet-600 bg-violet-50 text-violet-700 shadow-inner" : "border-zinc-200 bg-white text-zinc-700 hover:border-violet-200 hover:text-violet-700"}
              ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", "aria-hidden": "true", children: emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-500", children: [
              "· ",
              count
            ] })
          ]
        },
        key
      );
    }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 px-1", children: error })
  ] });
}

var c=reactExports.forwardRef(({as:e=`div`,...t},n)=>jsxRuntimeExports.jsx(e,{...t,ref:n}));const l=`https://challenges.cloudflare.com/turnstile/v0/api.js`,u=`cf-turnstile-script`,f=`onloadTurnstileCallback`,p=e=>!!document.getElementById(e),m=({render:e=`explicit`,onLoadCallbackName:t=f,scriptOptions:{nonce:n=``,defer:r=true,async:i=true,id:a=``,appendTo:o,onError:s,crossOrigin:c=``}={}})=>{let u=a||`cf-turnstile-script`;if(p(u))return;let d=document.createElement(`script`);d.id=u,d.src=`${l}?onload=${t}&render=${e}`,!document.querySelector(`script[src="${d.src}"]`)&&(d.defer=!!r,d.async=!!i,n&&(d.nonce=n),c&&(d.crossOrigin=c),s&&(d.onerror=s,delete window[t]),(o===`body`?document.body:document.getElementsByTagName(`head`)[0]).appendChild(d));},h={normal:{width:300,height:65},compact:{width:150,height:140},invisible:{width:0,height:0,overflow:`hidden`},flexible:{minWidth:300,width:`100%`,height:65},interactionOnly:{width:`fit-content`,height:`auto`,display:`flex`}};function g(e){if(e!==`invisible`&&e!==`interactionOnly`)return e}function _(e=u){let[t,r]=reactExports.useState(false);return reactExports.useEffect(()=>{let t=()=>{p(e)&&r(true);},n=new MutationObserver(t);return n.observe(document,{childList:true,subtree:true}),t(),()=>{n.disconnect();}},[e]),t}let v=`unloaded`,y;const b=new Promise((e,t)=>{y={resolve:e,reject:t},v===`ready`&&e(void 0);}),x=(e=f)=>(v===`unloaded`&&(v=`loading`,window[e]=()=>{y.resolve(),v=`ready`,delete window[e];}),b),S=reactExports.forwardRef((e,l)=>{let{scriptOptions:u,options:d={},siteKey:f,onWidgetLoad:p,onSuccess:y,onExpire:b,onError:S,onBeforeInteractive:C,onAfterInteractive:w,onUnsupported:T,onTimeout:E,onLoadScript:D,id:O,style:k,as:A=`div`,injectScript:j=true,rerenderOnCallbackChange:M=false,...N}=e,P=d.size,F=reactExports.useCallback(()=>P===void 0?{}:d.execution===`execute`?h.invisible:d.appearance===`interaction-only`?h.interactionOnly:h[P],[d.execution,P,d.appearance]),[I,L]=reactExports.useState(F()),R=reactExports.useRef(null),[z,B]=reactExports.useState(false),V=reactExports.useRef(void 0),H=reactExports.useRef(false),U=O||`cf-turnstile`,W=reactExports.useRef({onSuccess:y,onError:S,onExpire:b,onBeforeInteractive:C,onAfterInteractive:w,onUnsupported:T,onTimeout:E});reactExports.useEffect(()=>{M||(W.current={onSuccess:y,onError:S,onExpire:b,onBeforeInteractive:C,onAfterInteractive:w,onUnsupported:T,onTimeout:E});});let G=u?.id||`cf-turnstile-script`,K=_(G),q=u?.onLoadCallbackName||`onloadTurnstileCallback`,J=d.appearance||`always`,Y=reactExports.useMemo(()=>({sitekey:f,action:d.action,cData:d.cData,theme:d.theme||`auto`,language:d.language||`auto`,tabindex:d.tabIndex,"response-field":d.responseField,"response-field-name":d.responseFieldName,size:g(P),retry:d.retry||`auto`,"retry-interval":d.retryInterval||8e3,"refresh-expired":d.refreshExpired||`auto`,"refresh-timeout":d.refreshTimeout||`auto`,execution:d.execution||`render`,appearance:d.appearance||`always`,"feedback-enabled":d.feedbackEnabled??true,callback:e=>{H.current=true,M?y?.(e):W.current.onSuccess?.(e);},"error-callback":M?S:(...e)=>W.current.onError?.(...e),"expired-callback":M?b:(...e)=>W.current.onExpire?.(...e),"before-interactive-callback":M?C:(...e)=>W.current.onBeforeInteractive?.(...e),"after-interactive-callback":M?w:(...e)=>W.current.onAfterInteractive?.(...e),"unsupported-callback":M?T:(...e)=>W.current.onUnsupported?.(...e),"timeout-callback":M?E:(...e)=>W.current.onTimeout?.(...e)}),[d.action,d.appearance,d.cData,d.execution,d.language,d.refreshExpired,d.responseField,d.responseFieldName,d.retry,d.retryInterval,d.tabIndex,d.theme,d.feedbackEnabled,d.refreshTimeout,f,P,M,M?y:null,M?S:null,M?b:null,M?C:null,M?w:null,M?T:null,M?E:null]),X=reactExports.useCallback(()=>typeof window<`u`&&!!window.turnstile,[]);return reactExports.useEffect(function(){j&&!z&&(x(q),m({onLoadCallbackName:q,scriptOptions:{...u,id:G}}));},[j,z,u,G,q]),reactExports.useEffect(function(){v!==`ready`&&x(q).then(()=>B(true)).catch(console.error);},[q]),reactExports.useEffect(function(){if(!R.current||!z)return;let e=false;return (async()=>{e||!R.current||(V.current=window.turnstile.render(R.current,Y),V.current&&p?.(V.current));})(),()=>{e=true,V.current&&(window.turnstile.remove(V.current),H.current=false);}},[U,z,Y]),reactExports.useImperativeHandle(l,()=>{let{turnstile:e}=window;return {getResponse(){if(!e?.getResponse||!V.current||!X()){console.warn(`Turnstile has not been loaded`);return}return e.getResponse(V.current)},async getResponsePromise(e=3e4,t=100){return new Promise((n,r)=>{let i,a=async()=>{if(H.current&&window.turnstile&&V.current)try{let e=window.turnstile.getResponse(V.current);return i&&clearTimeout(i),e?n(e):r(Error(`No response received`))}catch(e){return i&&clearTimeout(i),console.warn(`Failed to get response`,e),r(Error(`Failed to get response`))}i||=setTimeout(()=>{i&&clearTimeout(i),r(Error(`Timeout`));},e),await new Promise(e=>setTimeout(e,t)),await a();};a();})},reset(){if(!e?.reset||!V.current||!X()){console.warn(`Turnstile has not been loaded`);return}d.execution===`execute`&&L(h.invisible);try{H.current=!1,e.reset(V.current);}catch(e){console.warn(`Failed to reset Turnstile widget ${V.current}`,e);}},remove(){if(!e?.remove||!V.current||!X()){console.warn(`Turnstile has not been loaded`);return}L(h.invisible),H.current=false,e.remove(V.current),V.current=null;},render(){if(!e?.render||!R.current||!X()||V.current){console.warn(`Turnstile has not been loaded or container not found`);return}let t=e.render(R.current,Y);return V.current=t,V.current&&p?.(V.current),d.execution!==`execute`&&L(P?h[P]:{}),t},execute(){if(d.execution!==`execute`){console.warn(`Execution mode is not set to "execute"`);return}if(!e?.execute||!R.current||!V.current||!X()){console.warn(`Turnstile has not been loaded or container not found`);return}e.execute(R.current),L(P?h[P]:{});},isExpired(){return !e?.isExpired||!V.current||!X()?(console.warn(`Turnstile has not been loaded`),false):e.isExpired(V.current)}}},[V,d.execution,P,Y,R,X,z,p]),reactExports.useEffect(()=>{if(z||!K)return;if(window.turnstile){B(true);return}let e=setInterval(()=>{window.turnstile&&(B(true),clearInterval(e));},50);return ()=>{clearInterval(e);}},[z,K]),reactExports.useEffect(()=>{L(F());},[d.execution,P,J]),reactExports.useEffect(()=>{!K||typeof D!=`function`||D();},[K]),jsxRuntimeExports.jsx(c,{ref:R,as:A,id:U,style:{...I,...k},...N})});S.displayName=`Turnstile`;

function CommentEditor({
  contentTable,
  contentId,
  session,
  lang,
  turnstileSiteKey,
  endpoint
}) {
  const label = getLanguageLabel(CommentText, lang);
  const [replyingTo, setReplyingTo] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [response, setResponse] = reactExports.useState(null);
  const formRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (event) => {
      const detail = event.detail;
      if (!detail) return;
      setReplyingTo(detail);
      document.getElementById("comment-editor")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("comment:reply", handler);
    return () => window.removeEventListener("comment:reply", handler);
  }, []);
  const handleCancelReply = () => setReplyingTo(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResponse(null);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const json = await res.json();
      setResponse(json);
      if (json.success && !json.error) {
        formRef.current?.reset();
        setReplyingTo(null);
        setTimeout(() => window.location.reload(), 800);
      }
    } catch (error) {
      console.error(error);
      setResponse({ error: "提交失败，请稍后重试。" });
    } finally {
      setSubmitting(false);
    }
  };
  const replyPreview = replyingTo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-zinc-100 text-sm text text-zinc-700 mb-4", children: `${label.reply} ${replyingTo.is_anonymous ? replyingTo.name : replyingTo.users?.name}: ${replyingTo.content_text.substring(0, 100)}...` });
  if (!session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        ref: formRef,
        method: "post",
        action: endpoint,
        id: "comment-editor",
        onSubmit: handleSubmit,
        className: "border border-gray-200 rounded-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: contentTable, type: "hidden", value: contentId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "reply_to", type: "hidden", value: replyingTo ? replyingTo.id : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                  name: "name",
                  type: "text",
                  placeholder: "*" + label.name_placeholder,
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                  name: "email",
                  type: "email",
                  placeholder: "*" + label.email_placeholder,
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full border-0 border-b border-b-gray-200 p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                  name: "website",
                  type: "url",
                  placeholder: label.website_placeholder
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "comment", className: "sr-only", children: "Add your comment" }),
              replyPreview,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  rows: 5,
                  name: "content_text",
                  required: true,
                  placeholder: label.add_comment,
                  className: "block w-full resize-y border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-violet-600 focus:ring-0 sm:text-sm sm:leading-6"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 justify-start p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-zinc-500", children: [
              label.moderation_notice,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/${lang}/login`, className: "font-medium text-violet-600 hover:text-violet-500", children: label.login })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(S, { siteKey: turnstileSiteKey }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-sm text-zinc-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "receive_notification",
                    value: "true",
                    defaultChecked: false,
                    className: "rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                  }
                ),
                label.receive_notification
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: submitting,
                    className: "break-keep inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60",
                    children: submitting ? "…" : label.submit
                  }
                ),
                replyingTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleCancelReply,
                    className: "text-sm font-medium text-red-400",
                    children: label.cancel_reply
                  }
                )
              ] })
            ] }),
            response?.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-red-500", children: response.error }),
            response?.success && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-green-600", children: typeof response.success === "string" ? response.success : "Submitted." })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      ref: formRef,
      method: "post",
      action: endpoint,
      id: "comment-editor",
      onSubmit: handleSubmit,
      className: "border border-gray-200 rounded-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: contentTable, type: "hidden", value: contentId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "reply_to", type: "hidden", value: replyingTo ? replyingTo.id : "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "comment", className: "sr-only", children: "Add your comment" }),
          replyPreview,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 5,
              name: "content_text",
              required: true,
              placeholder: label.add_comment,
              className: "block w-full resize-y border-0 border-b border-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:border-violet-600 focus:ring-0 sm:text-sm sm:leading-6"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-sm text-zinc-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                name: "receive_notification",
                value: "true",
                defaultChecked: true,
                className: "rounded border-gray-300 text-violet-600 focus:ring-violet-600"
              }
            ),
            label.receive_notification
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 sm:justify-end", children: [
            replyingTo && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCancelReply,
                className: "text-sm font-medium text-red-400",
                children: label.cancel_reply
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: submitting,
                className: "inline-flex items-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-60",
                children: submitting ? "…" : label.submit
              }
            )
          ] })
        ] }),
        response?.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pb-2 text-sm text-red-500", children: response.error }),
        response?.success && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pb-2 text-sm text-green-600", children: typeof response.success === "string" ? response.success : "Submitted." })
      ]
    }
  );
}

const STORAGE_KEY_PREFIX = "page_view_";
const VIEW_EXPIRY_HOURS = 24;
function getStorageKey(contentType, contentId) {
  return `${STORAGE_KEY_PREFIX}${contentType}_${contentId}`;
}
function getRpcFunctionName(contentType) {
  const map = {
    article: "article_page_view",
    album: "photo_page_view",
    thought: "thought_page_view"
  };
  return map[contentType];
}
function getRpcParamName(contentType) {
  const map = {
    article: "article_id",
    album: "photo_id",
    thought: "thought_id"
  };
  return map[contentType];
}
function hasViewedRecently(contentType, contentId) {
  if (typeof window === "undefined") return false;
  try {
    const storageKey = getStorageKey(contentType, contentId);
    const recordStr = localStorage.getItem(storageKey);
    if (!recordStr) return false;
    const record = JSON.parse(recordStr);
    const now = Date.now();
    const expiryTime = VIEW_EXPIRY_HOURS * 60 * 60 * 1e3;
    if (record.contentId === contentId && record.contentType === contentType && now - record.timestamp < expiryTime) {
      return true;
    }
    localStorage.removeItem(storageKey);
    return false;
  } catch (error) {
    console.error("读取访问记录失败:", error);
    return false;
  }
}
function recordView(contentType, contentId) {
  if (typeof window === "undefined") return;
  try {
    const record = {
      contentId,
      timestamp: Date.now(),
      contentType
    };
    localStorage.setItem(
      getStorageKey(contentType, contentId),
      JSON.stringify(record)
    );
  } catch (error) {
    console.error("保存访问记录失败:", error);
  }
}
async function trackPageView(contentType, contentId, supabase, onSuccess) {
  if (hasViewedRecently(contentType, contentId)) return false;
  try {
    const rpcFunctionName = getRpcFunctionName(contentType);
    const rpcParamName = getRpcParamName(contentType);
    const { data, error } = await supabase.rpc(rpcFunctionName, {
      [rpcParamName]: contentId
    });
    if (error) {
      console.error("阅读量增加失败:", error);
      return false;
    }
    if (data !== null && typeof data === "number") {
      recordView(contentType, contentId);
      if (onSuccess) onSuccess(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error("跟踪页面访问失败:", error);
    return false;
  }
}

function PageViewTracker({
  contentType,
  contentId,
  countNodeId,
  supabaseUrl,
  supabaseAnonKey
}) {
  reactExports.useEffect(() => {
    const supabase = createSupabaseBrowser(supabaseUrl, supabaseAnonKey);
    trackPageView(contentType, contentId, supabase, (newPageView) => {
      const el = document.getElementById(countNodeId);
      if (el) el.textContent = String(newPageView);
    }).catch((error) => console.error(error));
  }, [contentType, contentId, countNodeId, supabaseUrl, supabaseAnonKey]);
  return null;
}

export { $$Breadcrumb as $, CommentEditor as C, PageViewTracker as P, Reaction as R, $$CommentBlock as a, ContentContainer as b };
