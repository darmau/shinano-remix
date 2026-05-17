globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports, T as TwitterIcon } from './Base_De4mBBde.mjs';
import { r as reactExports } from './_@astro-renderers_BA3-2LID.mjs';
import { g as getLanguageLabel } from './getLanguageLabel_D4hYx-hS.mjs';
import { U as UtilsText } from './utils_kdxsUltM.mjs';

function CopyIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
        }
      )
    }
  );
}

const ZarazEvents = {
  COPY_LINK: "copy_link",
  SHARE_X: "share_x"};
function trackZarazEvent(eventName, properties) {
  if (typeof window === "undefined" || !window.zaraz) return;
  window.zaraz.track(eventName, properties);
}
function trackCopyLink(title, contentType) {
  trackZarazEvent(ZarazEvents.COPY_LINK, { title, content_type: contentType });
}
function trackShareX(title, contentType) {
  trackZarazEvent(ZarazEvents.SHARE_X, { title, content_type: contentType });
}

function ShareButton({ url, title, lang, contentType }) {
  const label = getLanguageLabel(UtilsText, lang);
  const [showMessage, setShowMessage] = reactExports.useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      trackCopyLink(title, contentType);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3e3);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };
  const handleShareX = () => trackShareX(title, contentType);
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=darmau8964`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-3 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: copyToClipboard,
        className: "group flex gap-2 border border-gray-200 rounded-md shadow-sm p-2 justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyIcon, { className: "h-5 w-5 group-hover:text-zinc-900" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm group-hover:font-medium ${showMessage ? "text-green-600" : "text-zinc-700"}`, children: showMessage ? label.coppied : label.copy_link })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "twitter-share-button border border-gray-200 rounded-md shadow-sm p-2 group",
        href: twitterUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: handleShareX,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TwitterIcon, { className: "h-5 w-5 text-zinc-600 group-hover:text-zinc-900" })
      }
    )
  ] });
}

export { ShareButton as S };
