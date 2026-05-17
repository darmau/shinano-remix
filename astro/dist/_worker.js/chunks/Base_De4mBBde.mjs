globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ac as maybeRenderHead, al as renderTemplate, _ as addAttribute, ae as renderComponent, a1 as createAstro, aj as renderSlot, ag as renderHead, aq as unescapeHTML } from './astro/server_D3oA7eJe.mjs';
/* empty css                         */
import { G as G$2, r as reactExports, c as requireReactDom, b as requireReact, t as t$5 } from './_@astro-renderers_BA3-2LID.mjs';
import { b as createStorageFromOptions, c as createClient, V as VERSION, i as isBrowser } from './index_BiJjDeYY.mjs';
import { P as ProfileText } from './profile_lCY9Ti2l.mjs';
import { g as getLanguageLabel } from './getLanguageLabel_D4hYx-hS.mjs';

let cachedBrowserClient;
function createBrowserClient(supabaseUrl, supabaseKey, options) {
    // singleton client is created only if isSingleton is set to true, or if isSingleton is not defined and we detect a browser
    const shouldUseSingleton = options?.isSingleton === true ||
        ((!options || !("isSingleton" in options)) && isBrowser());
    if (shouldUseSingleton && cachedBrowserClient) {
        return cachedBrowserClient;
    }
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`@supabase/ssr: Your project's URL and API key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api`);
    }
    const { storage } = createStorageFromOptions({
        ...options,
        cookieEncoding: options?.cookieEncoding ?? "base64url",
    }, false);
    const client = createClient(supabaseUrl, supabaseKey, {
        // TODO: resolve type error
        ...options,
        global: {
            ...options?.global,
            headers: {
                ...options?.global?.headers,
                "X-Client-Info": `supabase-ssr/${VERSION} createBrowserClient`,
            },
        },
        auth: {
            ...options?.auth,
            ...(options?.cookieOptions?.name
                ? { storageKey: options.cookieOptions.name }
                : null),
            flowType: "pkce",
            autoRefreshToken: isBrowser(),
            detectSessionInUrl: isBrowser(),
            persistSession: true,
            storage,
            ...(options?.cookies &&
                "encode" in options.cookies &&
                options.cookies.encode === "tokens-only"
                ? {
                    userStorage: options?.auth?.userStorage ?? window.localStorage,
                }
                : null),
        },
    });
    if (shouldUseSingleton) {
        cachedBrowserClient = client;
    }
    return client;
}

const Navbar$1 = {
  "zh": [
    {
      "name": "文章",
      "link": "/zh",
      "type": "article"
    },
    {
      "name": "摄影",
      "link": "/zh/albums/featured",
      "type": "album"
    },
    {
      "name": "其他",
      "link": "/zh/thoughts",
      "type": "thought"
    },
    {
      "name": "关于",
      "link": "/zh/about",
      "type": "about"
    }
  ],
  "en": [
    {
      "name": "Articles",
      "link": "/en",
      "type": "article"
    },
    {
      "name": "Photography",
      "link": "/en/albums/featured",
      "type": "album"
    },
    {
      "name": "Others",
      "link": "/en/thoughts",
      "type": "thought"
    },
    {
      "name": "About",
      "link": "/en/about",
      "type": "about"
    }
  ],
  "jp": [
    {
      "name": "記事",
      "link": "/jp",
      "type": "article"
    },
    {
      "name": "写真",
      "link": "/jp/albums/featured",
      "type": "album"
    },
    {
      "name": "その他",
      "link": "/jp/thoughts",
      "type": "thought"
    },
    {
      "name": "について",
      "link": "/jp/about",
      "type": "about"
    }
  ]
};
function NavbarItems(lang) {
  if (!Navbar$1[lang]) {
    return Navbar$1["zh"];
  }
  return Navbar$1[lang];
}

const FooterText = {
  "zh": [
    {
      "name": "文章",
      "items": [
        {
          "name": "推荐",
          "href": "/zh/articles/featured/1"
        },
        {
          "name": "最新",
          "href": "/zh/articles/1"
        }
      ]
    },
    {
      "name": "摄影",
      items: [
        {
          "name": "推荐",
          "href": "/zh/albums/featured"
        },
        {
          "name": "最新",
          "href": "/zh/albums/all/1"
        },
        {
          "name": "地图",
          "href": "/zh/albums/map"
        }
      ]
    },
    {
      "name": "其他",
      items: [
        {
          "name": "想法",
          "href": "/zh/thoughts"
        },
        {
          "name": "读书",
          "href": "/zh/book"
        }
      ]
    },
    {
      "name": "关于",
      "items": [
        {
          "name": "作者",
          "href": "/zh/about"
        },
        {
          "name": "本站",
          "href": "/zh/site"
        },
        {
          "name": "联系我",
          "href": "/zh/contact"
        },
        {
          "name": "RSS",
          "href": "/zh/rss"
        },
        {
          "name": "Terms of Use",
          "href": "/zh/terms-of-use"
        }
      ]
    }
  ],
  "en": [
    {
      "name": "Article",
      "items": [
        {
          "name": "Featured",
          "href": "/en/articles/featured/1"
        },
        {
          "name": "All",
          "href": "/en/articles/1"
        }
      ]
    },
    {
      "name": "Photography",
      items: [
        {
          "name": "Featured",
          "href": "/en/albums/featured"
        },
        {
          "name": "All",
          "href": "/en/albums/all/1"
        },
        {
          "name": "Map",
          "href": "/en/albums/map"
        }
      ]
    },
    {
      "name": "Others",
      items: [
        {
          "name": "All",
          "href": "/en/thoughts"
        },
        {
          "name": "Books",
          "href": "/en/book"
        }
      ]
    },
    {
      "name": "About",
      "items": [
        {
          "name": "Author",
          "href": "/en/about"
        },
        {
          "name": "Site",
          "href": "/en/site"
        },
        {
          "name": "Contact",
          "href": "/en/contact"
        },
        {
          "name": "RSS",
          "href": "/en/rss"
        },
        {
          "name": "Terms of Use",
          "href": "/en/terms-of-use"
        }
      ]
    }
  ],
  "jp": [
    {
      "name": "記事",
      "items": [
        {
          "name": "おすすめ",
          "href": "/jp/articles/featured/1"
        },
        {
          "name": "すべて",
          "href": "/jp/articles/1"
        }
      ]
    },
    {
      "name": "写真",
      items: [
        {
          "name": "おすすめ",
          "href": "/jp/albums/featured"
        },
        {
          "name": "すべて",
          "href": "/jp/albums/all/1"
        },
        {
          "name": "地図",
          "href": "/jp/albums/map"
        }
      ]
    },
    {
      "name": "その他",
      items: [
        {
          "name": "すべて",
          "href": "/jp/thoughts"
        },
        {
          "name": "読書記録",
          "href": "/jp/book"
        }
      ]
    },
    {
      "name": "について",
      "items": [
        {
          "name": "著者",
          "href": "/jp/about"
        },
        {
          "name": "サイト",
          "href": "/jp/site"
        },
        {
          "name": "連絡先",
          "href": "/jp/contact"
        },
        {
          "name": "RSS",
          "href": "/jp/rss"
        },
        {
          "name": "利用規約",
          "href": "/jp/terms-of-use"
        }
      ]
    }
  ]
};

const bannerCopy = {
  zh: {
    body: "你的评论对我持续更新非常重要。"
  },
  en: {
    body: "Your feedback keeps the updates coming."
  },
  jp: {
    body: "あなたのコメントが更新の励みになります。"
  }
};
const isBannerLang = (lang) => {
  return lang === "zh" || lang === "en" || lang === "jp";
};
const getBannerCopy = (lang) => {
  if (isBannerLang(lang)) {
    return bannerCopy[lang];
  }
  return bannerCopy.en;
};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const $d447af545b77c9f1$export$b204af158042fbac = (el)=>{
    return el?.ownerDocument ?? document;
};
const $d447af545b77c9f1$export$f21a1ffae260145a = (el)=>{
    if (el && 'window' in el && el.window === el) return el;
    const doc = $d447af545b77c9f1$export$b204af158042fbac(el);
    return doc.defaultView || window;
};
/**
 * Type guard that checks if a value is a Node. Verifies the presence and type of the nodeType property.
 */ function $d447af545b77c9f1$var$isNode(value) {
    return value !== null && typeof value === 'object' && 'nodeType' in value && typeof value.nodeType === 'number';
}
function $d447af545b77c9f1$export$af51f0f06c0f328a(node) {
    return $d447af545b77c9f1$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && 'host' in node;
}

let $6a20a7989e6c817a$var$_shadowDOM = false;
function $6a20a7989e6c817a$export$98658e8c59125e6a() {
    return $6a20a7989e6c817a$var$_shadowDOM;
}

// Source: https://github.com/microsoft/tabster/blob/a89fc5d7e332d48f68d03b1ca6e344489d1c3898/src/Shadowdomize/DOMFunctions.ts#L16
/* eslint-disable rsp-rules/no-non-shadow-contains, rsp-rules/safe-event-target */ 

function $23f2114a1b82827e$export$4282f70798064fe0(node, otherNode) {
    if (!($6a20a7989e6c817a$export$98658e8c59125e6a)()) return otherNode && node ? node.contains(otherNode) : false;
    if (!node || !otherNode) return false;
    let currentNode = otherNode;
    while(currentNode !== null){
        if (currentNode === node) return true;
        if (currentNode.tagName === 'SLOT' && currentNode.assignedSlot) // Element is slotted
        currentNode = currentNode.assignedSlot.parentNode;
        else if (($d447af545b77c9f1$export$af51f0f06c0f328a)(currentNode)) // Element is in shadow root
        currentNode = currentNode.host;
        else currentNode = currentNode.parentNode;
    }
    return false;
}
const $23f2114a1b82827e$export$cd4e5573fbe2b576 = (doc = document)=>{
    if (!($6a20a7989e6c817a$export$98658e8c59125e6a)()) return doc.activeElement;
    let activeElement = doc.activeElement;
    while(activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement)activeElement = activeElement.shadowRoot.activeElement;
    return activeElement;
};
function $23f2114a1b82827e$export$e58f029f0fbfdb29(event) {
    if (($6a20a7989e6c817a$export$98658e8c59125e6a)() && event.target instanceof Element && event.target.shadowRoot) {
        if ('composedPath' in event) return event.composedPath()[0] ?? null;
        else if ('composedPath' in event.nativeEvent) return event.nativeEvent.composedPath()[0] ?? null;
    }
    return event.target;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $1969ac565cfec8d0$export$de79e2c695e052f3(element) {
    if ($1969ac565cfec8d0$var$supportsPreventScroll()) element.focus({
        preventScroll: true
    });
    else {
        let scrollableElements = $1969ac565cfec8d0$var$getScrollableElements(element);
        element.focus();
        $1969ac565cfec8d0$var$restoreScrollPosition(scrollableElements);
    }
}
let $1969ac565cfec8d0$var$supportsPreventScrollCached = null;
function $1969ac565cfec8d0$var$supportsPreventScroll() {
    if ($1969ac565cfec8d0$var$supportsPreventScrollCached == null) {
        $1969ac565cfec8d0$var$supportsPreventScrollCached = false;
        try {
            let focusElem = document.createElement('div');
            focusElem.focus({
                get preventScroll () {
                    $1969ac565cfec8d0$var$supportsPreventScrollCached = true;
                    return true;
                }
            });
        } catch  {
        // Ignore
        }
    }
    return $1969ac565cfec8d0$var$supportsPreventScrollCached;
}
function $1969ac565cfec8d0$var$getScrollableElements(element) {
    let parent = element.parentNode;
    let scrollableElements = [];
    let rootScrollingElement = document.scrollingElement || document.documentElement;
    while(parent instanceof HTMLElement && parent !== rootScrollingElement){
        if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) scrollableElements.push({
            element: parent,
            scrollTop: parent.scrollTop,
            scrollLeft: parent.scrollLeft
        });
        parent = parent.parentNode;
    }
    if (rootScrollingElement instanceof HTMLElement) scrollableElements.push({
        element: rootScrollingElement,
        scrollTop: rootScrollingElement.scrollTop,
        scrollLeft: rootScrollingElement.scrollLeft
    });
    return scrollableElements;
}
function $1969ac565cfec8d0$var$restoreScrollPosition(scrollableElements) {
    for (let { element: element, scrollTop: scrollTop, scrollLeft: scrollLeft } of scrollableElements){
        element.scrollTop = scrollTop;
        element.scrollLeft = scrollLeft;
    }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
const $c4867b2f328c2698$export$e5c5a5f917a5871c = typeof document !== 'undefined' ? (G$2).useLayoutEffect : ()=>{};

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 





function $a92dc41f639950be$export$525bc4921d56d4a(nativeEvent) {
    let event = nativeEvent;
    event.nativeEvent = nativeEvent;
    event.isDefaultPrevented = ()=>event.defaultPrevented;
    // cancelBubble is technically deprecated in the spec, but still supported in all browsers.
    event.isPropagationStopped = ()=>event.cancelBubble;
    event.persist = ()=>{};
    return event;
}
function $a92dc41f639950be$export$c2b7abe5d61ec696(event, target) {
    Object.defineProperty(event, 'target', {
        value: target
    });
    Object.defineProperty(event, 'currentTarget', {
        value: target
    });
}
function $a92dc41f639950be$export$715c682d09d639cc(onBlur) {
    let stateRef = (reactExports.useRef)({
        isFocused: false,
        observer: null
    });
    // Clean up MutationObserver on unmount. See below.
    ($c4867b2f328c2698$export$e5c5a5f917a5871c)(()=>{
        const state = stateRef.current;
        return ()=>{
            if (state.observer) {
                state.observer.disconnect();
                state.observer = null;
            }
        };
    }, []);
    // This function is called during a React onFocus event.
    return (reactExports.useCallback)((e)=>{
        // React does not fire onBlur when an element is disabled. https://github.com/facebook/react/issues/9142
        // Most browsers fire a native focusout event in this case, except for Firefox. In that case, we use a
        // MutationObserver to watch for the disabled attribute, and dispatch these events ourselves.
        // For browsers that do, focusout fires before the MutationObserver, so onBlur should not fire twice.
        let eventTarget = ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e);
        if (eventTarget instanceof HTMLButtonElement || eventTarget instanceof HTMLInputElement || eventTarget instanceof HTMLTextAreaElement || eventTarget instanceof HTMLSelectElement) {
            stateRef.current.isFocused = true;
            let target = eventTarget;
            let onBlurHandler = (e)=>{
                stateRef.current.isFocused = false;
                if (target.disabled) {
                    // For backward compatibility, dispatch a (fake) React synthetic event.
                    let event = $a92dc41f639950be$export$525bc4921d56d4a(e);
                    onBlur?.(event);
                }
                // We no longer need the MutationObserver once the target is blurred.
                if (stateRef.current.observer) {
                    stateRef.current.observer.disconnect();
                    stateRef.current.observer = null;
                }
            };
            target.addEventListener('focusout', onBlurHandler, {
                once: true
            });
            stateRef.current.observer = new MutationObserver(()=>{
                if (stateRef.current.isFocused && target.disabled) {
                    stateRef.current.observer?.disconnect();
                    let relatedTargetEl = target === ($23f2114a1b82827e$export$cd4e5573fbe2b576)() ? null : ($23f2114a1b82827e$export$cd4e5573fbe2b576)();
                    target.dispatchEvent(new FocusEvent('blur', {
                        relatedTarget: relatedTargetEl
                    }));
                    target.dispatchEvent(new FocusEvent('focusout', {
                        bubbles: true,
                        relatedTarget: relatedTargetEl
                    }));
                }
            });
            stateRef.current.observer.observe(target, {
                attributes: true,
                attributeFilter: [
                    'disabled'
                ]
            });
        }
    }, [
        onBlur
    ]);
}
let $a92dc41f639950be$export$fda7da73ab5d4c48 = false;

function $2add3ce32c6007eb$var$testUserAgent(re) {
  if (typeof window === "undefined" || window.navigator == null) return false;
  let brands = window.navigator["userAgentData"]?.brands;
  return Array.isArray(brands) && brands.some((brand) => re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $2add3ce32c6007eb$var$testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator["userAgentData"]?.platform || window.navigator.platform) : false;
}
function $2add3ce32c6007eb$var$cached(fn) {
  let res = null;
  return () => {
    if (res == null) res = fn();
    return res;
  };
}
const $2add3ce32c6007eb$export$9ac100e40613ea10 = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testPlatform(/^Mac/i);
});
const $2add3ce32c6007eb$export$7bef049ce92e4224 = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  $2add3ce32c6007eb$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $2add3ce32c6007eb$export$78551043582a6a98 = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testUserAgent(/AppleWebKit/i) && !$2add3ce32c6007eb$export$6446a186d09e379e();
});
const $2add3ce32c6007eb$export$6446a186d09e379e = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testUserAgent(/Chrome/i);
});
const $2add3ce32c6007eb$export$a11b0059900ceec8 = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testUserAgent(/Android/i);
});
const $2add3ce32c6007eb$export$b7d78993b74f766d = $2add3ce32c6007eb$var$cached(function() {
  return $2add3ce32c6007eb$var$testUserAgent(/Firefox/i);
});

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
function $b5c62b033c25b96d$export$60278871457622de(event) {
    // JAWS/NVDA with Firefox.
    if (event.pointerType === '' && event.isTrusted) return true;
    // Android TalkBack's detail value varies depending on the event listener providing the event so we have specific logic here instead
    // If pointerType is defined, event is from a click listener. For events from mousedown listener, detail === 0 is a sufficient check
    // to detect TalkBack virtual clicks.
    if (($2add3ce32c6007eb$export$a11b0059900ceec8)() && event.pointerType) return event.type === 'click' && event.buttons === 1;
    return event.detail === 0 && !event.pointerType;
}

function $caaf0dd3060ed57c$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
  let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
  if (($2add3ce32c6007eb$export$b7d78993b74f766d)() && window.event?.type?.startsWith("key") && target.target === "_blank") {
    if (($2add3ce32c6007eb$export$9ac100e40613ea10)()) metaKey = true;
    else ctrlKey = true;
  }
  let event = ($2add3ce32c6007eb$export$78551043582a6a98)() && ($2add3ce32c6007eb$export$9ac100e40613ea10)() && !($2add3ce32c6007eb$export$7bef049ce92e4224)() && true ? new KeyboardEvent("keydown", {
    keyIdentifier: "Enter",
    metaKey,
    ctrlKey,
    altKey,
    shiftKey
  }) : new MouseEvent("click", {
    metaKey,
    ctrlKey,
    altKey,
    shiftKey,
    detail: 1,
    bubbles: true,
    cancelable: true
  });
  $caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = setOpening;
  ($1969ac565cfec8d0$export$de79e2c695e052f3)(target);
  target.dispatchEvent(event);
  $caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = false;
}
$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = false;

let $8f5a2122b0992be3$var$currentModality = null;
const $8f5a2122b0992be3$export$901e90a13c50a14e = /* @__PURE__ */ new Set();
let $8f5a2122b0992be3$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
let $8f5a2122b0992be3$var$hasEventBeforeFocus = false;
let $8f5a2122b0992be3$var$hasBlurredWindowRecently = false;
const $8f5a2122b0992be3$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};
function $8f5a2122b0992be3$var$triggerChangeHandlers(modality, e) {
  for (let handler of $8f5a2122b0992be3$export$901e90a13c50a14e) handler(modality, e);
}
function $8f5a2122b0992be3$var$isValidKey(e) {
  return !(e.metaKey || !($2add3ce32c6007eb$export$9ac100e40613ea10)() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $8f5a2122b0992be3$var$handleKeyboardEvent(e) {
  $8f5a2122b0992be3$var$hasEventBeforeFocus = true;
  if (!($caaf0dd3060ed57c$export$95185d699e05d4d7).isOpening && $8f5a2122b0992be3$var$isValidKey(e)) {
    $8f5a2122b0992be3$var$currentModality = "keyboard";
    $8f5a2122b0992be3$var$triggerChangeHandlers("keyboard", e);
  }
}
function $8f5a2122b0992be3$var$handlePointerEvent(e) {
  $8f5a2122b0992be3$var$currentModality = "pointer";
  "pointerType" in e ? e.pointerType : "mouse";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    $8f5a2122b0992be3$var$hasEventBeforeFocus = true;
    $8f5a2122b0992be3$var$triggerChangeHandlers("pointer", e);
  }
}
function $8f5a2122b0992be3$var$handleClickEvent(e) {
  if (!($caaf0dd3060ed57c$export$95185d699e05d4d7).isOpening && ($b5c62b033c25b96d$export$60278871457622de)(e)) {
    $8f5a2122b0992be3$var$hasEventBeforeFocus = true;
    $8f5a2122b0992be3$var$currentModality = "virtual";
  }
}
function $8f5a2122b0992be3$var$handleFocusEvent(e) {
  let ownerWindow = ($d447af545b77c9f1$export$f21a1ffae260145a)(($23f2114a1b82827e$export$e58f029f0fbfdb29)(e));
  let ownerDocument = ($d447af545b77c9f1$export$b204af158042fbac)(($23f2114a1b82827e$export$e58f029f0fbfdb29)(e));
  if (($23f2114a1b82827e$export$e58f029f0fbfdb29)(e) === ownerWindow || ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e) === ownerDocument || ($a92dc41f639950be$export$fda7da73ab5d4c48) || !e.isTrusted) return;
  if (!$8f5a2122b0992be3$var$hasEventBeforeFocus && !$8f5a2122b0992be3$var$hasBlurredWindowRecently) {
    $8f5a2122b0992be3$var$currentModality = "virtual";
    $8f5a2122b0992be3$var$triggerChangeHandlers("virtual", e);
  }
  $8f5a2122b0992be3$var$hasEventBeforeFocus = false;
  $8f5a2122b0992be3$var$hasBlurredWindowRecently = false;
}
function $8f5a2122b0992be3$var$handleWindowBlur() {
  $8f5a2122b0992be3$var$hasEventBeforeFocus = false;
  $8f5a2122b0992be3$var$hasBlurredWindowRecently = true;
}
function $8f5a2122b0992be3$var$setupGlobalFocusEvents(element) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const windowObject = ($d447af545b77c9f1$export$f21a1ffae260145a)(element);
  const documentObject = ($d447af545b77c9f1$export$b204af158042fbac)(element);
  if ($8f5a2122b0992be3$export$d90243b58daecda7.get(windowObject)) return;
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function() {
    $8f5a2122b0992be3$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  documentObject.addEventListener("keydown", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
  documentObject.addEventListener("keyup", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
  documentObject.addEventListener("click", $8f5a2122b0992be3$var$handleClickEvent, true);
  windowObject.addEventListener("focus", $8f5a2122b0992be3$var$handleFocusEvent, true);
  windowObject.addEventListener("blur", $8f5a2122b0992be3$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.addEventListener("pointerdown", $8f5a2122b0992be3$var$handlePointerEvent, true);
    documentObject.addEventListener("pointermove", $8f5a2122b0992be3$var$handlePointerEvent, true);
    documentObject.addEventListener("pointerup", $8f5a2122b0992be3$var$handlePointerEvent, true);
  }
  windowObject.addEventListener("beforeunload", () => {
    $8f5a2122b0992be3$var$tearDownWindowFocusTracking(element);
  }, {
    once: true
  });
  $8f5a2122b0992be3$export$d90243b58daecda7.set(windowObject, {
    focus
  });
}
const $8f5a2122b0992be3$var$tearDownWindowFocusTracking = (element, loadListener) => {
  const windowObject = ($d447af545b77c9f1$export$f21a1ffae260145a)(element);
  const documentObject = ($d447af545b77c9f1$export$b204af158042fbac)(element);
  if (loadListener) documentObject.removeEventListener("DOMContentLoaded", loadListener);
  if (!$8f5a2122b0992be3$export$d90243b58daecda7.has(windowObject)) return;
  windowObject.HTMLElement.prototype.focus = $8f5a2122b0992be3$export$d90243b58daecda7.get(windowObject).focus;
  documentObject.removeEventListener("keydown", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("keyup", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("click", $8f5a2122b0992be3$var$handleClickEvent, true);
  windowObject.removeEventListener("focus", $8f5a2122b0992be3$var$handleFocusEvent, true);
  windowObject.removeEventListener("blur", $8f5a2122b0992be3$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.removeEventListener("pointerdown", $8f5a2122b0992be3$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointermove", $8f5a2122b0992be3$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointerup", $8f5a2122b0992be3$var$handlePointerEvent, true);
  }
  $8f5a2122b0992be3$export$d90243b58daecda7.delete(windowObject);
};
function $8f5a2122b0992be3$export$2f1888112f558a7d(element) {
  const documentObject = ($d447af545b77c9f1$export$b204af158042fbac)(element);
  let loadListener;
  if (documentObject.readyState !== "loading") $8f5a2122b0992be3$var$setupGlobalFocusEvents(element);
  else {
    loadListener = () => {
      $8f5a2122b0992be3$var$setupGlobalFocusEvents(element);
    };
    documentObject.addEventListener("DOMContentLoaded", loadListener);
  }
  return () => $8f5a2122b0992be3$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined") $8f5a2122b0992be3$export$2f1888112f558a7d();
function $8f5a2122b0992be3$export$b9b3dfddab17db27() {
  return $8f5a2122b0992be3$var$currentModality !== "pointer";
}
const $8f5a2122b0992be3$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $8f5a2122b0992be3$var$isKeyboardFocusEvent(isTextInput, modality, e) {
  let eventTarget = e ? ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e) : void 0;
  let document1 = ($d447af545b77c9f1$export$b204af158042fbac)(eventTarget);
  let ownerWindow = ($d447af545b77c9f1$export$f21a1ffae260145a)(eventTarget);
  const IHTMLInputElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLInputElement : HTMLInputElement;
  const IHTMLTextAreaElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLTextAreaElement : HTMLTextAreaElement;
  const IHTMLElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLElement : HTMLElement;
  const IKeyboardEvent = typeof ownerWindow !== "undefined" ? ownerWindow.KeyboardEvent : KeyboardEvent;
  let activeElement = ($23f2114a1b82827e$export$cd4e5573fbe2b576)(document1);
  isTextInput = isTextInput || activeElement instanceof IHTMLInputElement && !$8f5a2122b0992be3$var$nonTextInputTypes.has(activeElement.type) || activeElement instanceof IHTMLTextAreaElement || activeElement instanceof IHTMLElement && activeElement.isContentEditable;
  return !(isTextInput && modality === "keyboard" && e instanceof IKeyboardEvent && !$8f5a2122b0992be3$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $8f5a2122b0992be3$export$ec71b4b83ac08ec3(fn, deps, opts) {
  $8f5a2122b0992be3$var$setupGlobalFocusEvents();
  (reactExports.useEffect)(() => {
    if (opts?.enabled === false) return;
    let handler = (modality, e) => {
      if (!$8f5a2122b0992be3$var$isKeyboardFocusEvent(!!opts?.isTextInput, modality, e)) return;
      fn($8f5a2122b0992be3$export$b9b3dfddab17db27());
    };
    $8f5a2122b0992be3$export$901e90a13c50a14e.add(handler);
    return () => {
      $8f5a2122b0992be3$export$901e90a13c50a14e.delete(handler);
    };
  }, deps);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions




function $1e74c67db218ce67$export$f8168d8dd8fd66e6(props) {
    let { isDisabled: isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange: onFocusChange } = props;
    const onBlur = (reactExports.useCallback)((e)=>{
        if (($23f2114a1b82827e$export$e58f029f0fbfdb29)(e) === e.currentTarget) {
            if (onBlurProp) onBlurProp(e);
            if (onFocusChange) onFocusChange(false);
            return true;
        }
    }, [
        onBlurProp,
        onFocusChange
    ]);
    const onSyntheticFocus = ($a92dc41f639950be$export$715c682d09d639cc)(onBlur);
    const onFocus = (reactExports.useCallback)((e)=>{
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        let eventTarget = ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e);
        const ownerDocument = ($d447af545b77c9f1$export$b204af158042fbac)(eventTarget);
        const activeElement = ownerDocument ? ($23f2114a1b82827e$export$cd4e5573fbe2b576)(ownerDocument) : ($23f2114a1b82827e$export$cd4e5573fbe2b576)();
        if (eventTarget === e.currentTarget && eventTarget === activeElement) {
            if (onFocusProp) onFocusProp(e);
            if (onFocusChange) onFocusChange(true);
            onSyntheticFocus(e);
        }
    }, [
        onFocusChange,
        onFocusProp,
        onSyntheticFocus
    ]);
    return {
        focusProps: {
            onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : undefined,
            onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : undefined
        }
    };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
function $48a7d519b337145d$export$4eaf04e54aa8eed6() {
    let globalListeners = (reactExports.useRef)(new Map());
    let addGlobalListener = (reactExports.useCallback)((eventTarget, type, listener, options)=>{
        // Make sure we remove the listener after it is called with the `once` option.
        let fn = options?.once ? (...args)=>{
            globalListeners.current.delete(listener);
            listener(...args);
        } : listener;
        globalListeners.current.set(listener, {
            type: type,
            eventTarget: eventTarget,
            fn: fn,
            options: options
        });
        eventTarget.addEventListener(type, fn, options);
    }, []);
    let removeGlobalListener = (reactExports.useCallback)((eventTarget, type, listener, options)=>{
        let fn = globalListeners.current.get(listener)?.fn || listener;
        eventTarget.removeEventListener(type, fn, options);
        globalListeners.current.delete(listener);
    }, []);
    let removeAllGlobalListeners = (reactExports.useCallback)(()=>{
        globalListeners.current.forEach((value, key)=>{
            removeGlobalListener(value.eventTarget, value.type, key, value.options);
        });
    }, [
        removeGlobalListener
    ]);
    (reactExports.useEffect)(()=>{
        return removeAllGlobalListeners;
    }, [
        removeAllGlobalListeners
    ]);
    return {
        addGlobalListener: addGlobalListener,
        removeGlobalListener: removeGlobalListener,
        removeAllGlobalListeners: removeAllGlobalListeners
    };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions





function $2c9edc598a03d523$export$420e68273165f4ec(props) {
    let { isDisabled: isDisabled, onBlurWithin: onBlurWithin, onFocusWithin: onFocusWithin, onFocusWithinChange: onFocusWithinChange } = props;
    let state = (reactExports.useRef)({
        isFocusWithin: false
    });
    let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } = ($48a7d519b337145d$export$4eaf04e54aa8eed6)();
    let onBlur = (reactExports.useCallback)((e)=>{
        // Ignore events bubbling through portals.
        if (!($23f2114a1b82827e$export$4282f70798064fe0)(e.currentTarget, ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e))) return;
        // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
        // when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where focus is moving).
        if (state.current.isFocusWithin && !($23f2114a1b82827e$export$4282f70798064fe0)(e.currentTarget, e.relatedTarget)) {
            state.current.isFocusWithin = false;
            removeAllGlobalListeners();
            if (onBlurWithin) onBlurWithin(e);
            if (onFocusWithinChange) onFocusWithinChange(false);
        }
    }, [
        onBlurWithin,
        onFocusWithinChange,
        state,
        removeAllGlobalListeners
    ]);
    let onSyntheticFocus = ($a92dc41f639950be$export$715c682d09d639cc)(onBlur);
    let onFocus = (reactExports.useCallback)((e)=>{
        // Ignore events bubbling through portals.
        if (!($23f2114a1b82827e$export$4282f70798064fe0)(e.currentTarget, ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e))) return;
        // Double check that document.activeElement actually matches e.target in case a previously chained
        // focus handler already moved focus somewhere else.
        let eventTarget = ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e);
        const ownerDocument = ($d447af545b77c9f1$export$b204af158042fbac)(eventTarget);
        const activeElement = ($23f2114a1b82827e$export$cd4e5573fbe2b576)(ownerDocument);
        if (!state.current.isFocusWithin && activeElement === eventTarget) {
            if (onFocusWithin) onFocusWithin(e);
            if (onFocusWithinChange) onFocusWithinChange(true);
            state.current.isFocusWithin = true;
            onSyntheticFocus(e);
            // Browsers don't fire blur events when elements are removed from the DOM.
            // However, if a focus event occurs outside the element we're tracking, we
            // can manually fire onBlur.
            let currentTarget = e.currentTarget;
            addGlobalListener(ownerDocument, 'focus', (e)=>{
                let eventTarget = ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e);
                if (state.current.isFocusWithin && !($23f2114a1b82827e$export$4282f70798064fe0)(currentTarget, eventTarget)) {
                    let nativeEvent = new ownerDocument.defaultView.FocusEvent('blur', {
                        relatedTarget: eventTarget
                    });
                    ($a92dc41f639950be$export$c2b7abe5d61ec696)(nativeEvent, currentTarget);
                    let event = ($a92dc41f639950be$export$525bc4921d56d4a)(nativeEvent);
                    onBlur(event);
                }
            }, {
                capture: true
            });
        }
    }, [
        onFocusWithin,
        onFocusWithinChange,
        onSyntheticFocus,
        addGlobalListener,
        onBlur
    ]);
    if (isDisabled) return {
        focusWithinProps: {
            // These cannot be null, that would conflict in mergeProps
            onFocus: undefined,
            onBlur: undefined
        }
    };
    return {
        focusWithinProps: {
            onFocus: onFocus,
            onBlur: onBlur
        }
    };
}

function $0c4a58759813079a$export$4e328f61c538687f(props = {}) {
    let { autoFocus: autoFocus = false, isTextInput: isTextInput, within: within } = props;
    let state = (reactExports.useRef)({
        isFocused: false,
        isFocusVisible: autoFocus || ($8f5a2122b0992be3$export$b9b3dfddab17db27)()
    });
    let [isFocused, setFocused] = (reactExports.useState)(false);
    let [isFocusVisibleState, setFocusVisible] = (reactExports.useState)(()=>state.current.isFocused && state.current.isFocusVisible);
    let updateState = (reactExports.useCallback)(()=>setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []);
    let onFocusChange = (reactExports.useCallback)((isFocused)=>{
        state.current.isFocused = isFocused;
        state.current.isFocusVisible = ($8f5a2122b0992be3$export$b9b3dfddab17db27)();
        setFocused(isFocused);
        updateState();
    }, [
        updateState
    ]);
    ($8f5a2122b0992be3$export$ec71b4b83ac08ec3)((isFocusVisible)=>{
        state.current.isFocusVisible = isFocusVisible;
        updateState();
    }, [
        isTextInput,
        isFocused
    ], {
        enabled: isFocused,
        isTextInput: isTextInput
    });
    let { focusProps: focusProps } = ($1e74c67db218ce67$export$f8168d8dd8fd66e6)({
        isDisabled: within,
        onFocusChange: onFocusChange
    });
    let { focusWithinProps: focusWithinProps } = ($2c9edc598a03d523$export$420e68273165f4ec)({
        isDisabled: !within,
        onFocusWithinChange: onFocusChange
    });
    return {
        isFocused: isFocused,
        isFocusVisible: isFocusVisibleState,
        focusProps: within ? focusWithinProps : focusProps
    };
}

var reactDomExports = requireReactDom();

let $e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = false;
let $e969f22b6713ca4a$var$hoverCount = 0;
function $e969f22b6713ca4a$var$setGlobalIgnoreEmulatedMouseEvents() {
  $e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = true;
  setTimeout(() => {
    $e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = false;
  }, 500);
}
function $e969f22b6713ca4a$var$handleGlobalPointerEvent(e) {
  if (e.pointerType === "touch") $e969f22b6713ca4a$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $e969f22b6713ca4a$var$setupGlobalTouchEvents() {
  let ownerDocument = ($d447af545b77c9f1$export$b204af158042fbac)(null);
  if (typeof ownerDocument === "undefined") return;
  if ($e969f22b6713ca4a$var$hoverCount === 0) {
    if (typeof PointerEvent !== "undefined") ownerDocument.addEventListener("pointerup", $e969f22b6713ca4a$var$handleGlobalPointerEvent);
  }
  $e969f22b6713ca4a$var$hoverCount++;
  return () => {
    $e969f22b6713ca4a$var$hoverCount--;
    if ($e969f22b6713ca4a$var$hoverCount > 0) return;
    if (typeof PointerEvent !== "undefined") ownerDocument.removeEventListener("pointerup", $e969f22b6713ca4a$var$handleGlobalPointerEvent);
  };
}
function $e969f22b6713ca4a$export$ae780daf29e6d456(props) {
  let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props;
  let [isHovered, setHovered] = (reactExports.useState)(false);
  let state = (reactExports.useRef)({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: "",
    target: null
  }).current;
  (reactExports.useEffect)($e969f22b6713ca4a$var$setupGlobalTouchEvents, []);
  let { addGlobalListener, removeAllGlobalListeners } = ($48a7d519b337145d$export$4eaf04e54aa8eed6)();
  let { hoverProps, triggerHoverEnd } = (reactExports.useMemo)(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;
      if (isDisabled || pointerType === "touch" || state.isHovered || !($23f2114a1b82827e$export$4282f70798064fe0)(event.currentTarget, ($23f2114a1b82827e$export$e58f029f0fbfdb29)(event))) return;
      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;
      addGlobalListener(($d447af545b77c9f1$export$b204af158042fbac)(($23f2114a1b82827e$export$e58f029f0fbfdb29)(event)), "pointerover", (e) => {
        if (state.isHovered && state.target && !($23f2114a1b82827e$export$4282f70798064fe0)(state.target, ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e))) triggerHoverEnd2(e, e.pointerType);
      }, {
        capture: true
      });
      if (onHoverStart) onHoverStart({
        type: "hoverstart",
        target,
        pointerType
      });
      if (onHoverChange) onHoverChange(true);
      setHovered(true);
    };
    let triggerHoverEnd2 = (event, pointerType) => {
      let target = state.target;
      state.pointerType = "";
      state.target = null;
      if (pointerType === "touch" || !state.isHovered || !target) return;
      state.isHovered = false;
      removeAllGlobalListeners();
      if (onHoverEnd) onHoverEnd({
        type: "hoverend",
        target,
        pointerType
      });
      if (onHoverChange) onHoverChange(false);
      setHovered(false);
    };
    let hoverProps2 = {};
    if (typeof PointerEvent !== "undefined") {
      hoverProps2.onPointerEnter = (e) => {
        if ($e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents && e.pointerType === "mouse") return;
        triggerHoverStart(e, e.pointerType);
      };
      hoverProps2.onPointerLeave = (e) => {
        if (!isDisabled && ($23f2114a1b82827e$export$4282f70798064fe0)(e.currentTarget, ($23f2114a1b82827e$export$e58f029f0fbfdb29)(e))) triggerHoverEnd2(e, e.pointerType);
      };
    }
    return {
      hoverProps: hoverProps2,
      triggerHoverEnd: triggerHoverEnd2
    };
  }, [
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled,
    state,
    addGlobalListener,
    removeAllGlobalListeners
  ]);
  (reactExports.useEffect)(() => {
    if (isDisabled) triggerHoverEnd({
      currentTarget: state.target
    }, state.pointerType);
  }, [
    isDisabled
  ]);
  return {
    hoverProps,
    isHovered
  };
}

var i$5=Object.defineProperty;var d$4=(t,e,n)=>e in t?i$5(t,e,{enumerable:true,configurable:true,writable:true,value:n}):t[e]=n;var r$6=(t,e,n)=>(d$4(t,typeof e!="symbol"?e+"":e,n),n);let o$7 = class o{constructor(){r$6(this,"current",this.detect());r$6(this,"handoffState","pending");r$6(this,"currentId",0);}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e);}reset(){this.set(this.detect());}nextId(){return ++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window=="undefined"||typeof document=="undefined"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete");}get isHandoffComplete(){return this.handoffState==="complete"}};let s$7=new o$7;

function l$4(n){var u;return s$7.isServer?null:n==null?document:(u=n==null?void 0:n.ownerDocument)!=null?u:document}function r$5(n){var u,o;return s$7.isServer?null:n==null?document:(o=(u=n==null?void 0:n.getRootNode)==null?void 0:u.call(n))!=null?o:document}function e$4(n){var u,o;return (o=(u=r$5(n))==null?void 0:u.activeElement)!=null?o:null}function d$3(n){return e$4(n)===n}

function t$4(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(o=>setTimeout(()=>{throw o}));}

function o$6(){let s=[],r={addEventListener(e,t,n,i){return e.addEventListener(t,n,i),r.add(()=>e.removeEventListener(t,n,i))},requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return r.add(()=>cancelAnimationFrame(t))},nextFrame(...e){return r.requestAnimationFrame(()=>r.requestAnimationFrame(...e))},setTimeout(...e){let t=setTimeout(...e);return r.add(()=>clearTimeout(t))},microTask(...e){let t={current:true};return t$4(()=>{t.current&&e[0]();}),r.add(()=>{t.current=false;})},style(e,t,n){let i=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:i});})},group(e){let t=o$6();return e(t),this.add(()=>t.dispose())},add(e){return s.includes(e)||s.push(e),()=>{let t=s.indexOf(e);if(t>=0)for(let n of s.splice(t,1))n();}},dispose(){for(let e of s.splice(0))e();}};return r}

function p$4(){let[e]=reactExports.useState(o$6);return reactExports.useEffect(()=>()=>e.dispose(),[e]),e}

let n$6=(e,t)=>{s$7.isServer?reactExports.useEffect(e,t):reactExports.useLayoutEffect(e,t);};

function s$6(e){let r=reactExports.useRef(e);return n$6(()=>{r.current=e;},[e]),r}

let o$5=function(t){let e=s$6(t);return G$2.useCallback((...r)=>e.current(...r),[e])};

function E$5(e){let t=e.width/2,n=e.height/2;return {top:e.clientY-n,right:e.clientX+t,bottom:e.clientY+n,left:e.clientX-t}}function P$2(e,t){return !(!e||!t||e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom)}function w$6({disabled:e=false}={}){let t=reactExports.useRef(null),[n,l]=reactExports.useState(false),r=p$4(),o=o$5(()=>{t.current=null,l(false),r.dispose();}),f=o$5(s=>{if(r.dispose(),t.current===null){t.current=s.currentTarget,l(true);{let i=l$4(s.currentTarget);r.addEventListener(i,"pointerup",o,false),r.addEventListener(i,"pointermove",c=>{if(t.current){let p=E$5(c);l(P$2(p,t.current.getBoundingClientRect()));}},false),r.addEventListener(i,"pointercancel",o,false);}}});return {pressed:n,pressProps:e?{}:{onPointerDown:f,onPointerUp:o,onClick:o}}}

function n$5(e){return reactExports.useMemo(()=>e,Object.values(e))}

let e$3=reactExports.createContext(void 0);function a$c(){return reactExports.useContext(e$3)}

function t$3(...r){return Array.from(new Set(r.flatMap(n=>typeof n=="string"?n.split(" "):[]))).filter(Boolean).join(" ")}

function u$8(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,u$8),t}

var A$2=(a=>(a[a.None=0]="None",a[a.RenderStrategy=1]="RenderStrategy",a[a.Static=2]="Static",a))(A$2||{}),C$4=(t=>(t[t.Unmount=0]="Unmount",t[t.Hidden=1]="Hidden",t))(C$4||{});function K(){let e=I$5();return reactExports.useCallback(r=>U({mergeRefs:e,...r}),[e])}function U({ourProps:e,theirProps:r,slot:t,defaultTag:a,features:o,visible:n=true,name:i,mergeRefs:l}){l=l!=null?l:H$2;let s=P$1(r,e);if(n)return F(s,t,a,i,l);let y=o!=null?o:0;if(y&2){let{static:f=false,...u}=s;if(f)return F(u,t,a,i,l)}if(y&1){let{unmount:f=true,...u}=s;return u$8(f?0:1,{[0](){return null},[1](){return F({...u,hidden:true,style:{display:"none"}},t,a,i,l)}})}return F(s,t,a,i,l)}function F(e,r={},t,a,o){let{as:n=t,children:i,refName:l="ref",...s}=h$5(e,["unmount","static"]),y=e.ref!==void 0?{[l]:e.ref}:{},f=typeof i=="function"?i(r):i;f=E$4(f),"className"in s&&s.className&&typeof s.className=="function"&&(s.className=s.className(r)),s["aria-labelledby"]&&s["aria-labelledby"]===s.id&&(s["aria-labelledby"]=void 0);let u={};if(r){let d=false,p=[];for(let[c,T]of Object.entries(r))typeof T=="boolean"&&(d=true),T===true&&p.push(c.replace(/([A-Z])/g,g=>`-${g.toLowerCase()}`));if(d){u["data-headlessui-state"]=p.join(" ");for(let c of p)u[`data-${c}`]="";}}if(b$2(n)&&(Object.keys(m$3(s)).length>0||Object.keys(m$3(u)).length>0))if(!reactExports.isValidElement(f)||Array.isArray(f)&&f.length>1||L(f)){if(Object.keys(m$3(s)).length>0)throw new Error(['Passing props on "Fragment"!',"",`The current component <${a} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(m$3(s)).concat(Object.keys(m$3(u))).map(d=>`  - ${d}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(d=>`  - ${d}`).join(`
`)].join(`
`))}else {let d=f.props,p=d==null?void 0:d.className,c=typeof p=="function"?(...R)=>t$3(p(...R),s.className):t$3(p,s.className),T=c?{className:c}:{},g=P$1(f.props,m$3(h$5(s,["ref"])));for(let R in u)R in g&&delete u[R];return reactExports.cloneElement(f,Object.assign({},g,u,y,{ref:o(D$3(f),y.ref)},T))}return reactExports.createElement(n,Object.assign({},h$5(s,["ref"]),!b$2(n)&&y,!b$2(n)&&u),f)}function I$5(){let e=reactExports.useRef([]),r=reactExports.useCallback(t=>{for(let a of e.current)a!=null&&(typeof a=="function"?a(t):a.current=t);},[]);return (...t)=>{if(!t.every(a=>a==null))return e.current=t,r}}function H$2(...e){return e.every(r=>r==null)?void 0:r=>{for(let t of e)t!=null&&(typeof t=="function"?t(r):t.current=r);}}function P$1(...e){if(e.length===0)return {};if(e.length===1)return e[0];let r={},t={};for(let o of e)for(let n in o)n.startsWith("on")&&typeof o[n]=="function"?((t[n])!=null||(t[n]=[]),t[n].push(o[n])):r[n]=o[n];if(r.disabled||r["aria-disabled"])for(let o in t)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(o)&&(t[o]=[n=>{var i;return (i=n==null?void 0:n.preventDefault)==null?void 0:i.call(n)}]);for(let o in t)Object.assign(r,{[o](n,...i){let l=t[o];for(let s of l){if((n instanceof Event||(n==null?void 0:n.nativeEvent)instanceof Event)&&n.defaultPrevented)return;s(n,...i);}}});return r}function V$1(...e){if(e.length===0)return {};if(e.length===1)return e[0];let r={},t={};for(let o of e)for(let n in o)n.startsWith("on")&&typeof o[n]=="function"?((t[n])!=null||(t[n]=[]),t[n].push(o[n])):r[n]=o[n];for(let o in t)Object.assign(r,{[o](...n){let i=t[o];for(let l of i)l==null||l(...n);}});return r}function Y(e){var r;return Object.assign(reactExports.forwardRef(e),{displayName:(r=e.displayName)!=null?r:e.name})}function m$3(e){let r=Object.assign({},e);for(let t in r)r[t]===void 0&&delete r[t];return r}function h$5(e,r=[]){let t=Object.assign({},e);for(let a of r)a in t&&delete t[a];return t}function D$3(e){return G$2.version.split(".")[0]>="19"?e.props.ref:e.ref}function E$4(e){if(e!=null&&e.$$typeof===Symbol.for("react.lazy")){let r=e._payload;if(r!=null&&r.status==="fulfilled")return E$4(r.value)}return e}function b$2(e){return e===reactExports.Fragment||e===Symbol.for("react.fragment")}function L(e){return b$2(e.type)}

let a$b="span";var s$5=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(s$5||{});function l$3(t,r){var n;let{features:d=1,...e}=t,o={ref:r,"aria-hidden":(d&2)===2?true:(n=e["aria-hidden"])!=null?n:void 0,hidden:(d&4)===4?true:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(d&4)===4&&(d&2)!==2&&{display:"none"}}};return K()({ourProps:o,theirProps:e,slot:{},defaultTag:a$b,name:"Hidden"})}let f$8=Y(l$3);

function o$4(e){return typeof e!="object"||e===null?false:"nodeType"in e}function t$2(e){return o$4(e)&&"tagName"in e}function n$4(e){return t$2(e)&&"accessKey"in e}function i$4(e){return t$2(e)&&"tabIndex"in e}function r$4(e){return t$2(e)&&"style"in e}function u$7(e){return n$4(e)&&e.nodeName==="IFRAME"}function l$2(e){return n$4(e)&&e.nodeName==="INPUT"}function a$a(e){return n$4(e)&&e.nodeName==="FIELDSET"}function E$3(e){return n$4(e)&&e.nodeName==="LEGEND"}

function s$4(l){let e=l.parentElement,t=null;for(;e&&!a$a(e);)E$3(e)&&(t=e),e=e.parentElement;let i=(e==null?void 0:e.getAttribute("disabled"))==="";return i&&r$3(t)?false:i}function r$3(l){if(!l)return  false;let e=l.previousElementSibling;for(;e!==null;){if(E$3(e))return  false;e=e.previousElementSibling;}return  true}

let u$6=Symbol();function T$3(t,n=true){return Object.assign(t,{[u$6]:n})}function y$3(...t){let n=reactExports.useRef(t);reactExports.useEffect(()=>{n.current=t;},[t]);let c=o$5(e=>{for(let o of n.current)o!=null&&(typeof o=="function"?o(e):o.current=e);});return t.every(e=>e==null||(e==null?void 0:e[u$6]))?void 0:c}

let a$9=reactExports.createContext(null);a$9.displayName="DescriptionContext";function f$7(){let r=reactExports.useContext(a$9);if(r===null){let e=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(e,f$7),e}return r}function H$1(){let[r,e]=reactExports.useState([]);return [r.length>0?r.join(" "):void 0,reactExports.useMemo(()=>function(t){let i=o$5(n=>(e(o=>[...o,n]),()=>e(o=>{let s=o.slice(),p=s.indexOf(n);return p!==-1&&s.splice(p,1),s}))),l=reactExports.useMemo(()=>({register:i,slot:t.slot,name:t.name,props:t.props,value:t.value}),[i,t.slot,t.name,t.props,t.value]);return G$2.createElement(a$9.Provider,{value:l},t.children)},[e])]}let I$4="p";function C$3(r,e){let c=reactExports.useId(),t=a$c(),{id:i=`headlessui-description-${c}`,...l}=r,n=f$7(),o=y$3(e);n$6(()=>n.register(i),[i,n.register]);let s=n$5({...n.slot,disabled:t||false}),p={ref:o,...n.props,id:i};return K()({ourProps:p,theirProps:l,slot:s,defaultTag:I$4,name:n.name||"Description"})}let _$2=Y(C$3),M$2=Object.assign(_$2,{});

var o$3=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(o$3||{});

let e$2=reactExports.createContext(()=>{});function C$2({value:t,children:o}){return G$2.createElement(e$2.Provider,{value:t},o)}

function h$4(i){if(i===null)return {width:0,height:0};let{width:t,height:e}=i.getBoundingClientRect();return {width:t,height:e}}function w$5(i,t,e=false){let[r,f]=reactExports.useState(()=>h$4(t));return n$6(()=>{if(!t||!i)return;let n=o$6();return n.requestAnimationFrame(function s(){n.requestAnimationFrame(s),f(u=>{let o=h$4(t);return o.width===u.width&&o.height===u.height?u:o});}),()=>{n.dispose();}},[t,i]),e?{width:`${r.width}px`,height:`${r.height}px`}:r}

let a$8 = class a extends Map{constructor(t){super();this.factory=t;}get(t){let e=super.get(t);return e===void 0&&(e=this.factory(t),this.set(t,e)),e}};

var h$3=Object.defineProperty;var v$2=(t,e,r)=>e in t?h$3(t,e,{enumerable:true,configurable:true,writable:true,value:r}):t[e]=r;var S$4=(t,e,r)=>(v$2(t,e+"",r),r),b$1=(t,e,r)=>{if(!e.has(t))throw TypeError("Cannot "+r)};var i$3=(t,e,r)=>(b$1(t,e,"read from private field"),r?r.call(t):e.get(t)),c$6=(t,e,r)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,r);},u$5=(t,e,r,s)=>(b$1(t,e,"write to private field"),e.set(t,r),r);var n$3,a$7,o$2;let T$2 = class T{constructor(e){c$6(this,n$3,{});c$6(this,a$7,new a$8(()=>new Set));c$6(this,o$2,new Set);S$4(this,"disposables",o$6());u$5(this,n$3,e),s$7.isServer&&this.disposables.microTask(()=>{this.dispose();});}dispose(){this.disposables.dispose();}get state(){return i$3(this,n$3)}subscribe(e,r){if(s$7.isServer)return ()=>{};let s={selector:e,callback:r,current:e(i$3(this,n$3))};return i$3(this,o$2).add(s),this.disposables.add(()=>{i$3(this,o$2).delete(s);})}on(e,r){return s$7.isServer?()=>{}:(i$3(this,a$7).get(e).add(r),this.disposables.add(()=>{i$3(this,a$7).get(e).delete(r);}))}send(e){let r=this.reduce(i$3(this,n$3),e);if(r!==i$3(this,n$3)){u$5(this,n$3,r);for(let s of i$3(this,o$2)){let l=s.selector(i$3(this,n$3));j$3(s.current,l)||(s.current=l,s.callback(l));}for(let s of i$3(this,a$7).get(e.type))s(i$3(this,n$3),e);}}};n$3=new WeakMap,a$7=new WeakMap,o$2=new WeakMap;function j$3(t,e){return Object.is(t,e)?true:typeof t!="object"||t===null||typeof e!="object"||e===null?false:Array.isArray(t)&&Array.isArray(e)?t.length!==e.length?false:f$6(t[Symbol.iterator](),e[Symbol.iterator]()):t instanceof Map&&e instanceof Map||t instanceof Set&&e instanceof Set?t.size!==e.size?false:f$6(t.entries(),e.entries()):p$3(t)&&p$3(e)?f$6(Object.entries(t)[Symbol.iterator](),Object.entries(e)[Symbol.iterator]()):false}function f$6(t,e){do{let r=t.next(),s=e.next();if(r.done&&s.done)return  true;if(r.done||s.done||!Object.is(r.value,s.value))return  false}while(true)}function p$3(t){if(Object.prototype.toString.call(t)!=="[object Object]")return  false;let e=Object.getPrototypeOf(t);return e===null||Object.getPrototypeOf(e)===null}

var a$6=Object.defineProperty;var r$2=(e,c,t)=>c in e?a$6(e,c,{enumerable:true,configurable:true,writable:true,value:t}):e[c]=t;var p$2=(e,c,t)=>(r$2(e,typeof c!="symbol"?c+"":c,t),t);var k$2=(t=>(t[t.Push=0]="Push",t[t.Pop=1]="Pop",t))(k$2||{});let y$2={[0](e,c){let t=c.id,s=e.stack,i=e.stack.indexOf(t);if(i!==-1){let n=e.stack.slice();return n.splice(i,1),n.push(t),s=n,{...e,stack:s}}return {...e,stack:[...e.stack,t]}},[1](e,c){let t=c.id,s=e.stack.indexOf(t);if(s===-1)return e;let i=e.stack.slice();return i.splice(s,1),{...e,stack:i}}};let o$1 = class o extends T$2{constructor(){super(...arguments);p$2(this,"actions",{push:t=>this.send({type:0,id:t}),pop:t=>this.send({type:1,id:t})});p$2(this,"selectors",{isTop:(t,s)=>t.stack[t.stack.length-1]===s,inStack:(t,s)=>t.stack.includes(s)});}static new(){return new o({stack:[]})}reduce(t,s){return u$8(s.type,y$2,t,s)}};const x$4=new a$8(()=>o$1.new());

var withSelector = {exports: {}};

var useSyncExternalStoreWithSelector_production = {};

/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredUseSyncExternalStoreWithSelector_production;

function requireUseSyncExternalStoreWithSelector_production () {
	if (hasRequiredUseSyncExternalStoreWithSelector_production) return useSyncExternalStoreWithSelector_production;
	hasRequiredUseSyncExternalStoreWithSelector_production = 1;
	var React = requireReact();
	function is(x, y) {
	  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is,
	  useSyncExternalStore = React.useSyncExternalStore,
	  useRef = React.useRef,
	  useEffect = React.useEffect,
	  useMemo = React.useMemo,
	  useDebugValue = React.useDebugValue;
	useSyncExternalStoreWithSelector_production.useSyncExternalStoreWithSelector = function (
	  subscribe,
	  getSnapshot,
	  getServerSnapshot,
	  selector,
	  isEqual
	) {
	  var instRef = useRef(null);
	  if (null === instRef.current) {
	    var inst = { hasValue: false, value: null };
	    instRef.current = inst;
	  } else inst = instRef.current;
	  instRef = useMemo(
	    function () {
	      function memoizedSelector(nextSnapshot) {
	        if (!hasMemo) {
	          hasMemo = true;
	          memoizedSnapshot = nextSnapshot;
	          nextSnapshot = selector(nextSnapshot);
	          if (void 0 !== isEqual && inst.hasValue) {
	            var currentSelection = inst.value;
	            if (isEqual(currentSelection, nextSnapshot))
	              return (memoizedSelection = currentSelection);
	          }
	          return (memoizedSelection = nextSnapshot);
	        }
	        currentSelection = memoizedSelection;
	        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
	        var nextSelection = selector(nextSnapshot);
	        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
	          return (memoizedSnapshot = nextSnapshot), currentSelection;
	        memoizedSnapshot = nextSnapshot;
	        return (memoizedSelection = nextSelection);
	      }
	      var hasMemo = false,
	        memoizedSnapshot,
	        memoizedSelection,
	        maybeGetServerSnapshot =
	          void 0 === getServerSnapshot ? null : getServerSnapshot;
	      return [
	        function () {
	          return memoizedSelector(getSnapshot());
	        },
	        null === maybeGetServerSnapshot
	          ? void 0
	          : function () {
	              return memoizedSelector(maybeGetServerSnapshot());
	            }
	      ];
	    },
	    [getSnapshot, getServerSnapshot, selector, isEqual]
	  );
	  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
	  useEffect(
	    function () {
	      inst.hasValue = true;
	      inst.value = value;
	    },
	    [value]
	  );
	  useDebugValue(value);
	  return value;
	};
	return useSyncExternalStoreWithSelector_production;
}

var hasRequiredWithSelector;

function requireWithSelector () {
	if (hasRequiredWithSelector) return withSelector.exports;
	hasRequiredWithSelector = 1;
	{
	  withSelector.exports = requireUseSyncExternalStoreWithSelector_production();
	}
	return withSelector.exports;
}

var withSelectorExports = requireWithSelector();

function S$3(e,n,r=j$3){return withSelectorExports.useSyncExternalStoreWithSelector(o$5(i=>e.subscribe(s$3,i)),o$5(()=>e.state),o$5(()=>e.state),o$5(n),r)}function s$3(e){return e}

function I$3(o,s){let t=reactExports.useId(),r=x$4.get(s),[i,c]=S$3(r,reactExports.useCallback(e=>[r.selectors.isTop(e,t),r.selectors.inStack(e,t)],[r,t]));return n$6(()=>{if(o)return r.actions.push(t),()=>r.actions.pop(t)},[r,o,t]),o?c?i:true:false}

let f$5=new Map,u$4=new Map;function h$2(t){var e;let r=(e=u$4.get(t))!=null?e:0;return u$4.set(t,r+1),r!==0?()=>m$2(t):(f$5.set(t,{"aria-hidden":t.getAttribute("aria-hidden"),inert:t.inert}),t.setAttribute("aria-hidden","true"),t.inert=true,()=>m$2(t))}function m$2(t){var i;let r=(i=u$4.get(t))!=null?i:1;if(r===1?u$4.delete(t):u$4.set(t,r-1),r!==1)return;let e=f$5.get(t);e&&(e["aria-hidden"]===null?t.removeAttribute("aria-hidden"):t.setAttribute("aria-hidden",e["aria-hidden"]),t.inert=e.inert,f$5.delete(t));}function y$1(t,{allowed:r,disallowed:e}={}){let i=I$3(t,"inert-others");n$6(()=>{var d,c;if(!i)return;let a=o$6();for(let n of (d=e==null?void 0:e())!=null?d:[])n&&a.add(h$2(n));let s=(c=r==null?void 0:r())!=null?c:[];for(let n of s){if(!n)continue;let l=l$4(n);if(!l)continue;let o=n.parentElement;for(;o&&o!==l.body;){for(let p of o.children)s.some(E=>p.contains(E))||a.add(h$2(p));o=o.parentElement;}}return a.dispose},[i,r,e]);}

function p$1(s,n,o){let i=s$6(t=>{let e=t.getBoundingClientRect();e.x===0&&e.y===0&&e.width===0&&e.height===0&&o();});reactExports.useEffect(()=>{if(!s)return;let t=n===null?null:n$4(n)?n:n.current;if(!t)return;let e=o$6();if(typeof ResizeObserver!="undefined"){let r=new ResizeObserver(()=>i.current(t));r.observe(t),e.add(()=>r.disconnect());}if(typeof IntersectionObserver!="undefined"){let r=new IntersectionObserver(()=>i.current(t));r.observe(t),e.add(()=>r.disconnect());}return ()=>e.dispose()},[n,i,s]);}

let E$2=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","details>summary","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(","),S$2=["[data-autofocus]"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var T$1=(o=>(o[o.First=1]="First",o[o.Previous=2]="Previous",o[o.Next=4]="Next",o[o.Last=8]="Last",o[o.WrapAround=16]="WrapAround",o[o.NoScroll=32]="NoScroll",o[o.AutoFocus=64]="AutoFocus",o))(T$1||{}),A$1=(n=>(n[n.Error=0]="Error",n[n.Overflow=1]="Overflow",n[n.Success=2]="Success",n[n.Underflow=3]="Underflow",n))(A$1||{}),O$2=(t=>(t[t.Previous=-1]="Previous",t[t.Next=1]="Next",t))(O$2||{});function x$3(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(E$2)).sort((r,t)=>Math.sign((r.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}function h$1(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(S$2)).sort((r,t)=>Math.sign((r.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}var I$2=(t=>(t[t.Strict=0]="Strict",t[t.Loose=1]="Loose",t))(I$2||{});function H(e,r=0){var t;return e===((t=l$4(e))==null?void 0:t.body)?false:u$8(r,{[0](){return e.matches(E$2)},[1](){let l=e;for(;l!==null;){if(l.matches(E$2))return  true;l=l.parentElement;}return  false}})}var g=(t=>(t[t.Keyboard=0]="Keyboard",t[t.Mouse=1]="Mouse",t))(g||{});typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="");},true),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="");},true));function w$4(e){e==null||e.focus({preventScroll:true});}let _$1=["textarea","input"].join(",");function P(e){var r,t;return (t=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,_$1))!=null?t:false}function G$1(e,r=t=>t){return e.slice().sort((t,l)=>{let n=r(t),a=r(l);if(n===null||a===null)return 0;let u=n.compareDocumentPosition(a);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function v$1(e,r,{sorted:t=true,relativeTo:l=null,skipElements:n=[]}={}){let a=Array.isArray(e)?e.length>0?r$5(e[0]):document:r$5(e),u=Array.isArray(e)?t?G$1(e):e:r&64?h$1(e):x$3(e);n.length>0&&u.length>1&&(u=u.filter(i=>!n.some(d=>d!=null&&"current"in d?(d==null?void 0:d.current)===i:d===i))),l=l!=null?l:a==null?void 0:a.activeElement;let o=(()=>{if(r&5)return 1;if(r&10)return  -1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),M=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,u.indexOf(l))-1;if(r&4)return Math.max(0,u.indexOf(l))+1;if(r&8)return u.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),N=r&32?{preventScroll:true}:{},m=0,c=u.length,s;do{if(m>=c||m+c<=0)return 0;let i=M+m;if(r&16)i=(i+c)%c;else {if(i<0)return 3;if(i>=c)return 1}s=u[i],s==null||s.focus(N),m+=o;}while(s!==e$4(s));return r&6&&P(s)&&s.select(),2}

function t$1(){return /iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function i$2(){return /Android/gi.test(window.navigator.userAgent)}function n$2(){return t$1()||i$2()}

function i$1(t,e,o,n){let u=s$6(o);reactExports.useEffect(()=>{if(!t)return;function r(m){u.current(m);}return document.addEventListener(e,r,n),()=>document.removeEventListener(e,r,n)},[t,e,n]);}

function s$2(t,e,o,n){let i=s$6(o);reactExports.useEffect(()=>{if(!t)return;function r(d){i.current(d);}return window.addEventListener(e,r,n),()=>window.removeEventListener(e,r,n)},[t,e,n]);}

const C$1=30;function k$1(o,f,h){let m=s$6(h),s=reactExports.useCallback(function(e,c){if(e.defaultPrevented)return;let r=c(e);if(r===null||!r.getRootNode().contains(r)||!r.isConnected)return;let M=function u(n){return typeof n=="function"?u(n()):Array.isArray(n)||n instanceof Set?n:[n]}(f);for(let u of M)if(u!==null&&(u.contains(r)||e.composed&&e.composedPath().includes(u)))return;return !H(r,I$2.Loose)&&r.tabIndex!==-1&&e.preventDefault(),m.current(e,r)},[m,f]),i=reactExports.useRef(null);i$1(o,"pointerdown",t=>{var e,c;n$2()||(i.current=((c=(e=t.composedPath)==null?void 0:e.call(t))==null?void 0:c[0])||t.target);},true),i$1(o,"pointerup",t=>{if(n$2()||!i.current)return;let e=i.current;return i.current=null,s(t,()=>e)},true);let l=reactExports.useRef({x:0,y:0});i$1(o,"touchstart",t=>{l.current.x=t.touches[0].clientX,l.current.y=t.touches[0].clientY;},true),i$1(o,"touchend",t=>{let e={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY};if(!(Math.abs(e.x-l.current.x)>=C$1||Math.abs(e.y-l.current.y)>=C$1))return s(t,()=>i$4(t.target)?t.target:null)},true),s$2(o,"blur",t=>s(t,()=>u$7(window.document.activeElement)?window.document.activeElement:null),true);}

function u$3(...e){return reactExports.useMemo(()=>l$4(...e),[...e])}function c$5(...e){return reactExports.useMemo(()=>r$5(...e),[...e])}

function E$1(n,e,a,t){let i=s$6(a);reactExports.useEffect(()=>{n=n!=null?n:window;function r(o){i.current(o);}return n.addEventListener(e,r,t),()=>n.removeEventListener(e,r,t)},[n,e,t]);}

function e$1(t,u){return reactExports.useMemo(()=>{var n;if(t.type)return t.type;let r=(n=t.as)!=null?n:"button";if(typeof r=="string"&&r.toLowerCase()==="button"||(u==null?void 0:u.tagName)==="BUTTON"&&!u.hasAttribute("type"))return "button"},[t.type,t.as,u])}

function o(t){return reactExports.useSyncExternalStore(t.subscribe,t.getSnapshot,t.getSnapshot)}

function a$5(o,r){let t=o(),n=new Set;return {getSnapshot(){return t},subscribe(e){return n.add(e),()=>n.delete(e)},dispatch(e,...s){let i=r[e].call(t,...s);i&&(t=i,n.forEach(c=>c()));}}}

function d$2(){let r;return {before({doc:e}){var l;let o=e.documentElement,t=(l=e.defaultView)!=null?l:window;r=Math.max(0,t.innerWidth-o.clientWidth);},after({doc:e,d:o}){let t=e.documentElement,l=Math.max(0,t.clientWidth-t.offsetWidth),n=Math.max(0,r-l);o.style(t,"paddingRight",`${n}px`);}}}

function w$3(){return t$1()?{before({doc:o,d:r,meta:m}){function a(s){for(let l of m().containers)for(let c of l())if(c.contains(s))return  true;return  false}r.microTask(()=>{var c;if(window.getComputedStyle(o.documentElement).scrollBehavior!=="auto"){let t=o$6();t.style(o.documentElement,"scrollBehavior","auto"),r.add(()=>r.microTask(()=>t.dispose()));}let s=(c=window.scrollY)!=null?c:window.pageYOffset,l=null;r.addEventListener(o,"click",t=>{if(i$4(t.target))try{let e=t.target.closest("a");if(!e)return;let{hash:n}=new URL(e.href),f=o.querySelector(n);i$4(f)&&!a(f)&&(l=f);}catch{}},true),r.group(t=>{r.addEventListener(o,"touchstart",e=>{if(t.dispose(),i$4(e.target)&&r$4(e.target))if(a(e.target)){let n=e.target;for(;n.parentElement&&a(n.parentElement);)n=n.parentElement;t.style(n,"overscrollBehavior","contain");}else t.style(e.target,"touchAction","none");});}),r.addEventListener(o,"touchmove",t=>{if(i$4(t.target)){if(l$2(t.target))return;if(a(t.target)){let e=t.target;for(;e.parentElement&&e.dataset.headlessuiPortal!==""&&!(e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth);)e=e.parentElement;e.dataset.headlessuiPortal===""&&t.preventDefault();}else t.preventDefault();}},{passive:false}),r.add(()=>{var e;let t=(e=window.scrollY)!=null?e:window.pageYOffset;s!==t&&window.scrollTo(0,s),l&&l.isConnected&&(l.scrollIntoView({block:"nearest"}),l=null);});});}}:{}}

function r$1(){return {before({doc:e,d:o}){o.style(e.documentElement,"overflow","hidden");}}}

function r(e){let o={};for(let t of e)Object.assign(o,t(o));return o}let c$4=a$5(()=>new Map,{PUSH(e,o){var n;let t=(n=this.get(e))!=null?n:{doc:e,count:0,d:o$6(),meta:new Set,computedMeta:{}};return t.count++,t.meta.add(o),t.computedMeta=r(t.meta),this.set(e,t),this},POP(e,o){let t=this.get(e);return t&&(t.count--,t.meta.delete(o),t.computedMeta=r(t.meta)),this},SCROLL_PREVENT(e){let o={doc:e.doc,d:e.d,meta(){return e.computedMeta}},t=[w$3(),d$2(),r$1()];t.forEach(({before:n})=>n==null?void 0:n(o)),t.forEach(({after:n})=>n==null?void 0:n(o));},SCROLL_ALLOW({d:e}){e.dispose();},TEARDOWN({doc:e}){this.delete(e);}});c$4.subscribe(()=>{let e=c$4.getSnapshot(),o=new Map;for(let[t]of e)o.set(t,t.documentElement.style.overflow);for(let t of e.values()){let n=o.get(t.doc)==="hidden",a=t.count!==0;(a&&!n||!a&&n)&&c$4.dispatch(t.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",t),t.count===0&&c$4.dispatch("TEARDOWN",t);}});

function a$4(r,e,n=()=>({containers:[]})){let f=o(c$4),o$1=e?f.get(e):void 0,i=o$1?o$1.count>0:false;return n$6(()=>{if(!(!e||!r))return c$4.dispatch("PUSH",e,n),()=>c$4.dispatch("POP",e,n)},[r,e]),i}

function f$4(e,c,n=()=>[document.body]){let r=I$3(e,"scroll-lock");a$4(r,c,t=>{var o;return {containers:[...(o=t.containers)!=null?o:[],n]}});}

function c$3(u=0){let[r,a]=reactExports.useState(u),g=reactExports.useCallback(e=>a(e),[]),s=reactExports.useCallback(e=>a(l=>l|e),[]),m=reactExports.useCallback(e=>(r&e)===e,[r]),n=reactExports.useCallback(e=>a(l=>l&~e),[]),F=reactExports.useCallback(e=>a(l=>l^e),[]);return {flags:r,setFlag:g,addFlag:s,hasFlag:m,removeFlag:n,toggleFlag:F}}

var T, S$1;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((T = process == null ? void 0 : process.env) == null ? void 0 : T["NODE_ENV"]) === "test" && typeof ((S$1 = Element == null ? void 0 : Element.prototype) == null ? void 0 : S$1.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var A = ((i) => (i[i.None = 0] = "None", i[i.Closed = 1] = "Closed", i[i.Enter = 2] = "Enter", i[i.Leave = 4] = "Leave", i))(A || {});
function x$2(e) {
  let r = {};
  for (let t in e) e[t] === true && (r[`data-${t}`] = "");
  return r;
}
function N(e, r, t, n) {
  let [i, a] = reactExports.useState(t), { hasFlag: s, addFlag: o, removeFlag: l } = c$3(e && i ? 3 : 0), u = reactExports.useRef(false), f = reactExports.useRef(false), E = p$4();
  return n$6(() => {
    var d;
    if (e) {
      if (t && a(true), !r) {
        t && o(3);
        return;
      }
      return (d = n == null ? void 0 : n.start) == null || d.call(n, t), C(r, { inFlight: u, prepare() {
        f.current ? f.current = false : f.current = u.current, u.current = true, !f.current && (t ? (o(3), l(4)) : (o(4), l(2)));
      }, run() {
        f.current ? t ? (l(3), o(4)) : (l(4), o(3)) : t ? l(1) : o(1);
      }, done() {
        var p;
        f.current && D$2(r) || (u.current = false, l(7), t || a(false), (p = n == null ? void 0 : n.end) == null || p.call(n, t));
      } });
    }
  }, [e, t, r, E]), e ? [i, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [t, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function C(e, { prepare: r, run: t, done: n, inFlight: i }) {
  let a = o$6();
  return j$2(e, { prepare: r, inFlight: i }), a.nextFrame(() => {
    t(), a.requestAnimationFrame(() => {
      a.add(M$1(e, n));
    });
  }), a.dispose;
}
function M$1(e, r) {
  var a, s;
  let t = o$6();
  if (!e) return t.dispose;
  let n = false;
  t.add(() => {
    n = true;
  });
  let i = (s = (a = e.getAnimations) == null ? void 0 : a.call(e).filter((o) => o instanceof CSSTransition)) != null ? s : [];
  return i.length === 0 ? (r(), t.dispose) : (Promise.allSettled(i.map((o) => o.finished)).then(() => {
    n || r();
  }), t.dispose);
}
function j$2(e, { inFlight: r, prepare: t }) {
  if (r != null && r.current) {
    t();
    return;
  }
  let n = e.style.transition;
  e.style.transition = "none", t(), e.offsetHeight, e.style.transition = n;
}
function D$2(e) {
  var t, n;
  return ((n = (t = e.getAnimations) == null ? void 0 : t.call(e)) != null ? n : []).some((i) => i instanceof CSSTransition && i.playState !== "finished");
}

function m$1(u,t){let e=reactExports.useRef([]),r=o$5(u);reactExports.useEffect(()=>{let o=[...e.current];for(let[a,l]of t.entries())if(e.current[a]!==l){let n=r(t,o);return e.current=t,n}},[r,...t]);}

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== 'inline' && display !== 'contents';
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) {
      return true;
    }
  } catch (_e) {
    // no-op
  }
  try {
    return element.matches(':modal');
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = value => !!value && value !== 'none';
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || '') || containRe.test(css.contain || '');
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none');
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map(_ref => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(' ');
  }
  return navigator.userAgent;
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start') ? placement.replace('start', 'end') : placement.replace('end', 'start');
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow$1(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

// Maximum number of resets that can occur before bailing to avoid infinite reset loops.
const MAX_RESET_COUNT = 50;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const platformWithDetectOverflow = platform.detectOverflow ? platform : {
    ...platform,
    detectOverflow: detectOverflow$1
  };
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$2 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // <html> `overflow: hidden` + `scrollbar-gutter: stable` reduces the
  // visual width of the <html> but this is not considered in the size
  // of `html.clientWidth`.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    // If the <body> scrollbar is on the left, the width needs to be extended
    // by the scrollbar amount so there isn't extra space on the right.
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === 'absolute' || currentContainingBlockComputedStyle.position === 'fixed') || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        // It's possible that even though the ratio is reported as 1, the
        // element is not actually fully within the IntersectionObserver's root
        // area anymore. This can happen under performance constraints. This may
        // be a bug in the browser's IntersectionObserver implementation. To
        // work around this, we compare the element's bounding rect now with
        // what it was at the time we created the IntersectionObserver. If they
        // are not equal then the element moved, so we refresh.
        refresh();
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...(floating ? getOverflowAncestors(floating) : [])] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
const detectOverflow = detectOverflow$1;

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = offset$2;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = shift$2;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = flip$2;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = size$2;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

var isClient = typeof document !== 'undefined';

var noop = function noop() {};
var index$1 = isClient ? reactExports.useLayoutEffect : noop;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

function useLatestRef(value) {
  const ref = reactExports.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating$1(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = reactExports.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = reactExports.useState(null);
  const [_floating, _setFloating] = reactExports.useState(null);
  const setReference = reactExports.useCallback(node => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = reactExports.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = reactExports.useRef(null);
  const floatingRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);
  const openRef = useLatestRef(open);
  const update = reactExports.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then(data => {
      const fullData = {
        ...data,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        reactDomExports.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index$1(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = reactExports.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index$1(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = reactExports.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = reactExports.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = reactExports.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return reactExports.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => {
  const result = offset$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => {
  const result = shift$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => {
  const result = flip$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => {
  const result = size$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

const SafeReact = {
  ...t$5
};
const useInsertionEffect = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = reactExports.useRef(() => {
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var index = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
let serverHandoffComplete = false;
let count = 0;
const genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = reactExports.useState(() => serverHandoffComplete ? genId() : void 0);
  index(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  reactExports.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;
const useId = useReactId || useFloatingId;
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
const FloatingNodeContext = /* @__PURE__ */ reactExports.createContext(null);
const FloatingTreeContext = /* @__PURE__ */ reactExports.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = reactExports.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => reactExports.useContext(FloatingTreeContext);
const FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = reactExports.useRef({});
  const [events] = reactExports.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  const [positionReference, setPositionReference] = reactExports.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = reactExports.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = reactExports.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return reactExports.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = reactExports.useState(null);
  const [positionReference, _setPositionReference] = reactExports.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = reactExports.useRef(null);
  const tree = useFloatingTree();
  index(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating$1({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = reactExports.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = reactExports.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = reactExports.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = reactExports.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = reactExports.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return reactExports.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
const ACTIVE_KEY = "active";
const SELECTED_KEY = "selected";
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    },
    ...domUserProps,
    ...propsList.map((value) => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === "function") {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const getReferenceProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  return reactExports.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
function getArgsWithCustomFloatingHeight(state, height) {
  return {
    ...state,
    rects: {
      ...state.rects,
      floating: {
        ...state.rects.floating,
        height
      }
    }
  };
}
const inner = (props) => ({
  name: "inner",
  options: props,
  async fn(state) {
    const {
      listRef,
      overflowRef,
      onFallbackChange,
      offset: innerOffset = 0,
      index: index2 = 0,
      minItemsVisible = 4,
      referenceOverflowThreshold = 0,
      scrollRef,
      ...detectOverflowOptions
    } = evaluate(props, state);
    const {
      rects,
      elements: {
        floating
      }
    } = state;
    const item = listRef.current[index2];
    const scrollEl = (scrollRef == null ? void 0 : scrollRef.current) || floating;
    const clientTop = floating.clientTop || scrollEl.clientTop;
    const floatingIsBordered = floating.clientTop !== 0;
    const scrollElIsBordered = scrollEl.clientTop !== 0;
    const floatingIsScrollEl = floating === scrollEl;
    if (!item) {
      return {};
    }
    const nextArgs = {
      ...state,
      ...await offset(-item.offsetTop - floating.clientTop - rects.reference.height / 2 - item.offsetHeight / 2 - innerOffset).fn(state)
    };
    const overflow = await detectOverflow(getArgsWithCustomFloatingHeight(nextArgs, scrollEl.scrollHeight + clientTop + floating.clientTop), detectOverflowOptions);
    const refOverflow = await detectOverflow(nextArgs, {
      ...detectOverflowOptions,
      elementContext: "reference"
    });
    const diffY = max(0, overflow.top);
    const nextY = nextArgs.y + diffY;
    const isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight;
    const rounder = isScrollable ? (v) => v : round;
    const maxHeight = rounder(max(0, scrollEl.scrollHeight + (floatingIsBordered && floatingIsScrollEl || scrollElIsBordered ? clientTop * 2 : 0) - diffY - max(0, overflow.bottom)));
    scrollEl.style.maxHeight = maxHeight + "px";
    scrollEl.scrollTop = diffY;
    if (onFallbackChange) {
      const shouldFallback = scrollEl.offsetHeight < item.offsetHeight * min(minItemsVisible, listRef.current.length) - 1 || refOverflow.top >= -referenceOverflowThreshold || refOverflow.bottom >= -referenceOverflowThreshold;
      reactDomExports.flushSync(() => onFallbackChange(shouldFallback));
    }
    if (overflowRef) {
      overflowRef.current = await detectOverflow(getArgsWithCustomFloatingHeight({
        ...nextArgs,
        y: nextY
      }, scrollEl.offsetHeight + clientTop + floating.clientTop), detectOverflowOptions);
    }
    return {
      y: nextY
    };
  }
});
function useInnerOffset(context, props) {
  const {
    open,
    elements
  } = context;
  const {
    enabled = true,
    overflowRef,
    scrollRef,
    onChange: unstable_onChange
  } = props;
  const onChange = useEffectEvent(unstable_onChange);
  const controlledScrollingRef = reactExports.useRef(false);
  const prevScrollTopRef = reactExports.useRef(null);
  const initialOverflowRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onWheel(e) {
      if (e.ctrlKey || !el || overflowRef.current == null) {
        return;
      }
      const dY = e.deltaY;
      const isAtTop = overflowRef.current.top >= -0.5;
      const isAtBottom = overflowRef.current.bottom >= -0.5;
      const remainingScroll = el.scrollHeight - el.clientHeight;
      const sign = dY < 0 ? -1 : 1;
      const method = dY < 0 ? "max" : "min";
      if (el.scrollHeight <= el.clientHeight) {
        return;
      }
      if (!isAtTop && dY > 0 || !isAtBottom && dY < 0) {
        e.preventDefault();
        reactDomExports.flushSync(() => {
          onChange((d) => d + Math[method](dY, remainingScroll * sign));
        });
      } else if (/firefox/i.test(getUserAgent())) {
        el.scrollTop += dY;
      }
    }
    const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
    if (open && el) {
      el.addEventListener("wheel", onWheel);
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
        if (overflowRef.current != null) {
          initialOverflowRef.current = {
            ...overflowRef.current
          };
        }
      });
      return () => {
        prevScrollTopRef.current = null;
        initialOverflowRef.current = null;
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [enabled, open, elements.floating, overflowRef, scrollRef, onChange]);
  const floating = reactExports.useMemo(() => ({
    onKeyDown() {
      controlledScrollingRef.current = true;
    },
    onWheel() {
      controlledScrollingRef.current = false;
    },
    onPointerMove() {
      controlledScrollingRef.current = false;
    },
    onScroll() {
      const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
      if (!overflowRef.current || !el || !controlledScrollingRef.current) {
        return;
      }
      if (prevScrollTopRef.current !== null) {
        const scrollDiff = el.scrollTop - prevScrollTopRef.current;
        if (overflowRef.current.bottom < -0.5 && scrollDiff < -1 || overflowRef.current.top < -0.5 && scrollDiff > 1) {
          reactDomExports.flushSync(() => onChange((d) => d + scrollDiff));
        }
      }
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
      });
    }
  }), [elements.floating, onChange, overflowRef, scrollRef]);
  return reactExports.useMemo(() => enabled ? {
    floating
  } : {}, [enabled, floating]);
}

let y=reactExports.createContext({styles:void 0,setReference:()=>{},setFloating:()=>{},getReferenceProps:()=>({}),getFloatingProps:()=>({}),slot:{}});y.displayName="FloatingContext";let $$1=reactExports.createContext(null);$$1.displayName="PlacementContext";function ye(e){return reactExports.useMemo(()=>e?typeof e=="string"?{to:e}:e:null,[e])}function Fe$2(){return reactExports.useContext(y).setReference}function Te$1(){let{getFloatingProps:e,slot:t}=reactExports.useContext(y);return reactExports.useCallback((...n)=>Object.assign({},e(...n),{"data-anchor":t.anchor}),[e,t])}function Re(e=null){e===false&&(e=null),typeof e=="string"&&(e={to:e});let t=reactExports.useContext($$1),n=reactExports.useMemo(()=>e,[JSON.stringify(e,(l,o)=>{var u;return (u=o==null?void 0:o.outerHTML)!=null?u:o})]);n$6(()=>{t==null||t(n!=null?n:null);},[t,n]);let r=reactExports.useContext(y);return reactExports.useMemo(()=>[r.setFloating,e?r.styles:{}],[r.setFloating,e,r.styles])}let D$1=4;function Ae$1({children:e,enabled:t=true}){let[n,r]=reactExports.useState(null),[l,o]=reactExports.useState(0),u=reactExports.useRef(null),[f,s]=reactExports.useState(null);ce(f);let i=t&&n!==null&&f!==null,{to:F="bottom",gap:E=0,offset:A=0,padding:c=0,inner:h}=ge$1(n,f),[a,p="center"]=F.split(" ");n$6(()=>{i&&o(0);},[i]);let{refs:b,floatingStyles:S,context:g}=useFloating({open:i,placement:a==="selection"?p==="center"?"bottom":`bottom-${p}`:p==="center"?`${a}`:`${a}-${p}`,strategy:"absolute",transform:false,middleware:[offset({mainAxis:a==="selection"?0:E,crossAxis:A}),shift({padding:c}),a!=="selection"&&flip({padding:c}),a==="selection"&&h?inner({...h,padding:c,overflowRef:u,offset:l,minItemsVisible:D$1,referenceOverflowThreshold:c,onFallbackChange(P){var L,N;if(!P)return;let d=g.elements.floating;if(!d)return;let M=parseFloat(getComputedStyle(d).scrollPaddingBottom)||0,I=Math.min(D$1,d.childElementCount),W=0,B=0;for(let m of (N=(L=g.elements.floating)==null?void 0:L.childNodes)!=null?N:[])if(n$4(m)){let x=m.offsetTop,k=x+m.clientHeight+M,H=d.scrollTop,U=H+d.clientHeight;if(x>=H&&k<=U)I--;else {B=Math.max(0,Math.min(k,U)-Math.max(x,H)),W=m.clientHeight;break}}I>=1&&o(m=>{let x=W*I-B+M;return m>=x?m:x});}}):null,size({padding:c,apply({availableWidth:P,availableHeight:d,elements:M}){Object.assign(M.floating.style,{overflow:"auto",maxWidth:`${P}px`,maxHeight:`min(var(--anchor-max-height, 100vh), ${d}px)`});}})].filter(Boolean),whileElementsMounted:autoUpdate}),[w=a,V=p]=g.placement.split("-");a==="selection"&&(w="selection");let G=reactExports.useMemo(()=>({anchor:[w,V].filter(Boolean).join(" ")}),[w,V]),K=useInnerOffset(g,{overflowRef:u,onChange:o}),{getReferenceProps:Q,getFloatingProps:X}=useInteractions([K]),Y=o$5(P=>{s(P),b.setFloating(P);});return reactExports.createElement($$1.Provider,{value:r},reactExports.createElement(y.Provider,{value:{setFloating:Y,setReference:b.setReference,styles:S,getReferenceProps:Q,getFloatingProps:X,slot:G}},e))}function ce(e){n$6(()=>{if(!e)return;let t=new MutationObserver(()=>{let n=window.getComputedStyle(e).maxHeight,r=parseFloat(n);if(isNaN(r))return;let l=parseInt(n);isNaN(l)||r!==l&&(e.style.maxHeight=`${Math.ceil(r)}px`);});return t.observe(e,{attributes:true,attributeFilter:["style"]}),()=>{t.disconnect();}},[e]);}function ge$1(e,t){var o,u,f;let n=O$1((o=e==null?void 0:e.gap)!=null?o:"var(--anchor-gap, 0)",t),r=O$1((u=e==null?void 0:e.offset)!=null?u:"var(--anchor-offset, 0)",t),l=O$1((f=e==null?void 0:e.padding)!=null?f:"var(--anchor-padding, 0)",t);return {...e,gap:n,offset:r,padding:l}}function O$1(e,t,n=void 0){let r=p$4(),l=o$5((s,i)=>{if(s==null)return [n,null];if(typeof s=="number")return [s,null];if(typeof s=="string"){if(!i)return [n,null];let F=J$1(s,i);return [F,E=>{let A=q(s);{let c=A.map(h=>window.getComputedStyle(i).getPropertyValue(h));r.requestAnimationFrame(function h(){r.nextFrame(h);let a=false;for(let[b,S]of A.entries()){let g=window.getComputedStyle(i).getPropertyValue(S);if(c[b]!==g){c[b]=g,a=true;break}}if(!a)return;let p=J$1(s,i);F!==p&&(E(p),F=p);});}return r.dispose}]}return [n,null]}),o=reactExports.useMemo(()=>l(e,t)[0],[e,t]),[u=o,f]=reactExports.useState();return n$6(()=>{let[s,i]=l(e,t);if(f(s),!!i)return i(f)},[e,t]),u}function q(e){let t=/var\((.*)\)/.exec(e);if(t){let n=t[1].indexOf(",");if(n===-1)return [t[1]];let r=t[1].slice(0,n).trim(),l=t[1].slice(n+1).trim();return l?[r,...q(l)]:[r]}return []}function J$1(e,t){let n=document.createElement("div");t.appendChild(n),n.style.setProperty("margin-top","0px","important"),n.style.setProperty("margin-top",e,"important");let r=parseFloat(window.getComputedStyle(n).marginTop)||0;return t.removeChild(n),r}

let n$1=reactExports.createContext(null);n$1.displayName="OpenClosedContext";var i=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(i||{});function u$2(){return reactExports.useContext(n$1)}function c$2({value:o,children:t}){return G$2.createElement(n$1.Provider,{value:o},t)}function s$1({children:o}){return G$2.createElement(n$1.Provider,{value:null},o)}

function t(n){function e(){document.readyState!=="loading"&&(n(),document.removeEventListener("DOMContentLoaded",e));}typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("DOMContentLoaded",e),e());}

let n=[];t(()=>{function e(t){if(!i$4(t.target)||t.target===document.body||n[0]===t.target)return;let r=t.target;r=r.closest(E$2),n.unshift(r!=null?r:t.target),n=n.filter(o=>o!=null&&o.isConnected),n.splice(10);}window.addEventListener("click",e,{capture:true}),window.addEventListener("mousedown",e,{capture:true}),window.addEventListener("focus",e,{capture:true}),document.body.addEventListener("click",e,{capture:true}),document.body.addEventListener("mousedown",e,{capture:true}),document.body.addEventListener("focus",e,{capture:true});});

function c$1(t){let r=o$5(t),e=reactExports.useRef(false);reactExports.useEffect(()=>(e.current=false,()=>{e.current=true,t$4(()=>{e.current&&r();});}),[r]);}

function s(){let r=typeof document=="undefined";return "useSyncExternalStore"in t$5?(o=>o.useSyncExternalStore)(t$5)(()=>()=>{},()=>false,()=>!r):false}function l$1(){let r=s(),[e,n]=reactExports.useState(s$7.isHandoffComplete);return e&&s$7.isHandoffComplete===false&&n(false),reactExports.useEffect(()=>{e!==true&&n(true);},[e]),reactExports.useEffect(()=>s$7.handoff(),[]),r?false:e}

let e=reactExports.createContext(false);function a$3(){return reactExports.useContext(e)}function l(o){return G$2.createElement(e.Provider,{value:o.force},o.children)}

function j$1(e){let o=a$3(),l=reactExports.useContext(c),[r,p]=reactExports.useState(()=>{var s;if(!o&&l!==null)return (s=l.current)!=null?s:null;if(s$7.isServer)return null;let t=e==null?void 0:e.getElementById("headlessui-portal-root");if(t)return t;if(e===null)return null;let n=e.createElement("div");return n.setAttribute("id","headlessui-portal-root"),e.body.appendChild(n)});return reactExports.useEffect(()=>{r!==null&&(e!=null&&e.body.contains(r)||e==null||e.body.appendChild(r));},[r,e]),reactExports.useEffect(()=>{o||l!==null&&p(l.current);},[l,p,o]),r}let _=reactExports.Fragment,I$1=Y(function(o,l){let{ownerDocument:r=null,...p}=o,t=reactExports.useRef(null),n=y$3(T$3(a=>{t.current=a;}),l),s=u$3(t.current),C=r!=null?r:s,u=j$1(C),y=reactExports.useContext(m),g=p$4(),v=l$1(),M=K();return c$1(()=>{var a;u&&u.childNodes.length<=0&&((a=u.parentElement)==null||a.removeChild(u));}),!u||!v?null:reactDomExports.createPortal(G$2.createElement("div",{"data-headlessui-portal":"",ref:a=>{g.dispose(),y&&a&&g.add(y.register(a));}},M({ourProps:{ref:n},theirProps:p,slot:{},defaultTag:_,name:"Portal"})),u)});function D(e,o){let l=y$3(o),{enabled:r=true,ownerDocument:p,...t}=e,n=K();return r?G$2.createElement(I$1,{...t,ownerDocument:p,ref:l}):n({ourProps:{ref:l},theirProps:t,slot:{},defaultTag:_,name:"Portal"})}let J=reactExports.Fragment,c=reactExports.createContext(null);function X$1(e,o){let{target:l,...r}=e,t={ref:y$3(o)},n=K();return G$2.createElement(c.Provider,{value:l},n({ourProps:t,theirProps:r,defaultTag:J,name:"Popover.Group"}))}let m=reactExports.createContext(null);function oe$1(){let e=reactExports.useContext(m),o=reactExports.useRef([]),l=o$5(t=>(o.current.push(t),e&&e.register(t),()=>r(t))),r=o$5(t=>{let n=o.current.indexOf(t);n!==-1&&o.current.splice(n,1),e&&e.unregister(t);}),p=reactExports.useMemo(()=>({register:l,unregister:r,portals:o}),[l,r,o]);return [o,reactExports.useMemo(()=>function({children:n}){return G$2.createElement(m.Provider,{value:p},n)},[p])]}let k=Y(D),B=Y(X$1),le=Object.assign(k,{Group:B});

function a$2(o,r=typeof document!="undefined"?document.defaultView:null,t){let n=I$3(o,"escape");E$1(r,"keydown",e=>{n&&(e.defaultPrevented||e.key===o$3.Escape&&t(e));});}

function f$3(){var t;let[e]=reactExports.useState(()=>typeof window!="undefined"&&typeof window.matchMedia=="function"?window.matchMedia("(pointer: coarse)"):null),[o,c]=reactExports.useState((t=e==null?void 0:e.matches)!=null?t:false);return n$6(()=>{if(!e)return;function n(r){c(r.matches);}return e.addEventListener("change",n),()=>e.removeEventListener("change",n)},[e]),o}

function S({defaultContainers:l=[],portals:n,mainTreeNode:o}={}){let c=o$5(()=>{var r,u;let i=l$4(o),t=[];for(let e of l)e!==null&&(t$2(e)?t.push(e):"current"in e&&t$2(e.current)&&t.push(e.current));if(n!=null&&n.current)for(let e of n.current)t.push(e);for(let e of (r=i==null?void 0:i.querySelectorAll("html > *, body > *"))!=null?r:[])e!==document.body&&e!==document.head&&t$2(e)&&e.id!=="headlessui-portal-root"&&(o&&(e.contains(o)||e.contains((u=o==null?void 0:o.getRootNode())==null?void 0:u.host))||t.some(E=>e.contains(E))||t.push(e));return t});return {resolveContainers:c,contains:o$5(i=>c().some(t=>t.contains(i)))}}let d$1=reactExports.createContext(null);function j({children:l,node:n}){let[o,c]=reactExports.useState(null),i=x$1(n!=null?n:o);return G$2.createElement(d$1.Provider,{value:i},l,i===null&&G$2.createElement(f$8,{features:s$5.Hidden,ref:t=>{var r,u;if(t){for(let e of (u=(r=l$4(t))==null?void 0:r.querySelectorAll("html > *, body > *"))!=null?u:[])if(e!==document.body&&e!==document.head&&t$2(e)&&e!=null&&e.contains(t)){c(e);break}}}}))}function x$1(l=null){var n;return (n=reactExports.useContext(d$1))!=null?n:l}

function f$2(){let e=reactExports.useRef(false);return n$6(()=>(e.current=true,()=>{e.current=false;}),[]),e}

var a$1=(r=>(r[r.Forwards=0]="Forwards",r[r.Backwards=1]="Backwards",r))(a$1||{});function u$1(){let e=reactExports.useRef(0);return s$2(true,"keydown",r=>{r.key==="Tab"&&(e.current=r.shiftKey?1:0);},true),e}

function x(o){if(!o)return new Set;if(typeof o=="function")return new Set(o());let t=new Set;for(let e of o.current)t$2(e.current)&&t.add(e.current);return t}let $="div";var G=(n=>(n[n.None=0]="None",n[n.InitialFocus=1]="InitialFocus",n[n.TabLock=2]="TabLock",n[n.FocusLock=4]="FocusLock",n[n.RestoreFocus=8]="RestoreFocus",n[n.AutoFocus=16]="AutoFocus",n))(G||{});function w$2(o,t){let e=reactExports.useRef(null),r=y$3(e,t),{initialFocus:u,initialFocusFallback:a,containers:n,features:s=15,...f}=o;l$1()||(s=0);let l=u$3(e.current);re(s,{ownerDocument:l});let T=ne(s,{ownerDocument:l,container:e,initialFocus:u,initialFocusFallback:a});oe(s,{ownerDocument:l,container:e,containers:n,previousActiveElement:T});let g=u$1(),A=o$5(c=>{if(!n$4(e.current))return;let E=e.current;(V=>V())(()=>{u$8(g.current,{[a$1.Forwards]:()=>{v$1(E,T$1.First,{skipElements:[c.relatedTarget,a]});},[a$1.Backwards]:()=>{v$1(E,T$1.Last,{skipElements:[c.relatedTarget,a]});}});});}),v=I$3(!!(s&2),"focus-trap#tab-lock"),N=p$4(),b=reactExports.useRef(false),k={ref:r,onKeyDown(c){c.key=="Tab"&&(b.current=true,N.requestAnimationFrame(()=>{b.current=false;}));},onBlur(c){if(!(s&4))return;let E=x(n);n$4(e.current)&&E.add(e.current);let L=c.relatedTarget;i$4(L)&&L.dataset.headlessuiFocusGuard!=="true"&&(I(E,L)||(b.current?v$1(e.current,u$8(g.current,{[a$1.Forwards]:()=>T$1.Next,[a$1.Backwards]:()=>T$1.Previous})|T$1.WrapAround,{relativeTo:c.target}):i$4(c.target)&&w$4(c.target)));}},B=K();return G$2.createElement(G$2.Fragment,null,v&&G$2.createElement(f$8,{as:"button",type:"button","data-headlessui-focus-guard":true,onFocus:A,features:s$5.Focusable}),B({ourProps:k,theirProps:f,defaultTag:$,name:"FocusTrap"}),v&&G$2.createElement(f$8,{as:"button",type:"button","data-headlessui-focus-guard":true,onFocus:A,features:s$5.Focusable}))}let ee=Y(w$2),ge=Object.assign(ee,{features:G});function te(o=true){let t=reactExports.useRef(n.slice());return m$1(([e],[r])=>{r===true&&e===false&&t$4(()=>{t.current.splice(0);}),r===false&&e===true&&(t.current=n.slice());},[o,n,t]),o$5(()=>{var e;return (e=t.current.find(r=>r!=null&&r.isConnected))!=null?e:null})}function re(o,{ownerDocument:t}){let e=!!(o&8),r=te(e);m$1(()=>{e||d$3(t==null?void 0:t.body)&&w$4(r());},[e]),c$1(()=>{e&&w$4(r());});}function ne(o,{ownerDocument:t,container:e,initialFocus:r,initialFocusFallback:u}){let a=reactExports.useRef(null),n=I$3(!!(o&1),"focus-trap#initial-focus"),s=f$2();return m$1(()=>{if(o===0)return;if(!n){u!=null&&u.current&&w$4(u.current);return}let f=e.current;f&&t$4(()=>{if(!s.current)return;let l=t==null?void 0:t.activeElement;if(r!=null&&r.current){if((r==null?void 0:r.current)===l){a.current=l;return}}else if(f.contains(l)){a.current=l;return}if(r!=null&&r.current)w$4(r.current);else {if(o&16){if(v$1(f,T$1.First|T$1.AutoFocus)!==A$1.Error)return}else if(v$1(f,T$1.First)!==A$1.Error)return;if(u!=null&&u.current&&(w$4(u.current),(t==null?void 0:t.activeElement)===u.current))return;console.warn("There are no focusable elements inside the <FocusTrap />");}a.current=t==null?void 0:t.activeElement;});},[u,n,o]),a}function oe(o,{ownerDocument:t,container:e,containers:r,previousActiveElement:u}){let a=f$2(),n=!!(o&4);E$1(t==null?void 0:t.defaultView,"focus",s=>{if(!n||!a.current)return;let f=x(r);n$4(e.current)&&f.add(e.current);let l=u.current;if(!l)return;let T=s.target;n$4(T)?I(f,T)?(u.current=T,w$4(T)):(s.preventDefault(),s.stopPropagation(),w$4(l)):w$4(u.current);},true);}function I(o,t){for(let e of o)if(e.contains(t))return  true;return  false}

function ue(e){var t;return !!(e.enter||e.enterFrom||e.enterTo||e.leave||e.leaveFrom||e.leaveTo)||!b$2((t=e.as)!=null?t:de$1)||G$2.Children.count(e.children)===1}let V=reactExports.createContext(null);V.displayName="TransitionContext";var De=(n=>(n.Visible="visible",n.Hidden="hidden",n))(De||{});function He$1(){let e=reactExports.useContext(V);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Ae(){let e=reactExports.useContext(w$1);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let w$1=reactExports.createContext(null);w$1.displayName="NestingContext";function M(e){return "children"in e?M(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function Te(e,t){let n=s$6(e),l=reactExports.useRef([]),S=f$2(),R=p$4(),d=o$5((o,i=C$4.Hidden)=>{let a=l.current.findIndex(({el:s})=>s===o);a!==-1&&(u$8(i,{[C$4.Unmount](){l.current.splice(a,1);},[C$4.Hidden](){l.current[a].state="hidden";}}),R.microTask(()=>{var s;!M(l)&&S.current&&((s=n.current)==null||s.call(n));}));}),y=o$5(o=>{let i=l.current.find(({el:a})=>a===o);return i?i.state!=="visible"&&(i.state="visible"):l.current.push({el:o,state:"visible"}),()=>d(o,C$4.Unmount)}),C=reactExports.useRef([]),p=reactExports.useRef(Promise.resolve()),h=reactExports.useRef({enter:[],leave:[]}),g=o$5((o,i,a)=>{C.current.splice(0),t&&(t.chains.current[i]=t.chains.current[i].filter(([s])=>s!==o)),t==null||t.chains.current[i].push([o,new Promise(s=>{C.current.push(s);})]),t==null||t.chains.current[i].push([o,new Promise(s=>{Promise.all(h.current[i].map(([r,f])=>f)).then(()=>s());})]),i==="enter"?p.current=p.current.then(()=>t==null?void 0:t.wait.current).then(()=>a(i)):a(i);}),v=o$5((o,i,a)=>{Promise.all(h.current[i].splice(0).map(([s,r])=>r)).then(()=>{var s;(s=C.current.shift())==null||s();}).then(()=>a(i));});return reactExports.useMemo(()=>({children:l,register:y,unregister:d,onStart:g,onStop:v,wait:p,chains:h}),[y,d,l,g,v,h,p])}let de$1=reactExports.Fragment,fe=A$2.RenderStrategy;function Fe$1(e,t){var ee,te;let{transition:n=true,beforeEnter:l,afterEnter:S,beforeLeave:R,afterLeave:d,enter:y,enterFrom:C,enterTo:p,entered:h,leave:g,leaveFrom:v,leaveTo:o,...i$1}=e,[a,s]=reactExports.useState(null),r=reactExports.useRef(null),f=ue(e),U=y$3(...f?[r,t,s]:t===null?[]:[t]),H=(ee=i$1.unmount)==null||ee?C$4.Unmount:C$4.Hidden,{show:u,appear:z,initial:K$1}=He$1(),[m,j]=reactExports.useState(u?"visible":"hidden"),Q=Ae(),{register:A,unregister:F}=Q;n$6(()=>A(r),[A,r]),n$6(()=>{if(H===C$4.Hidden&&r.current){if(u&&m!=="visible"){j("visible");return}return u$8(m,{["hidden"]:()=>F(r),["visible"]:()=>A(r)})}},[m,r,A,F,u,H]);let G=l$1();n$6(()=>{if(f&&G&&m==="visible"&&r.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[r,m,G,f]);let ce=K$1&&!z,Y=z&&u&&K$1,B=reactExports.useRef(false),I=Te(()=>{B.current||(j("hidden"),F(r));},Q),Z=o$5(W=>{B.current=true;let L=W?"enter":"leave";I.onStart(r,L,_=>{_==="enter"?l==null||l():_==="leave"&&(R==null||R());});}),$=o$5(W=>{let L=W?"enter":"leave";B.current=false,I.onStop(r,L,_=>{_==="enter"?S==null||S():_==="leave"&&(d==null||d());}),L==="leave"&&!M(I)&&(j("hidden"),F(r));});reactExports.useEffect(()=>{f&&n||(Z(u),$(u));},[u,f,n]);let pe=(()=>!(!n||!f||!G||ce))(),[,T]=N(pe,a,u,{start:Z,end:$}),Ce=m$3({ref:U,className:((te=t$3(i$1.className,Y&&y,Y&&C,T.enter&&y,T.enter&&T.closed&&C,T.enter&&!T.closed&&p,T.leave&&g,T.leave&&!T.closed&&v,T.leave&&T.closed&&o,!T.transition&&u&&h))==null?void 0:te.trim())||void 0,...x$2(T)}),N$1=0;m==="visible"&&(N$1|=i.Open),m==="hidden"&&(N$1|=i.Closed),u&&m==="hidden"&&(N$1|=i.Opening),!u&&m==="visible"&&(N$1|=i.Closing);let he=K();return G$2.createElement(w$1.Provider,{value:I},G$2.createElement(c$2,{value:N$1},he({ourProps:Ce,theirProps:i$1,defaultTag:de$1,features:fe,visible:m==="visible",name:"Transition.Child"})))}function Ie(e,t){let{show:n,appear:l=false,unmount:S=true,...R}=e,d=reactExports.useRef(null),y=ue(e),C=y$3(...y?[d,t]:t===null?[]:[t]);l$1();let p=u$2();if(n===void 0&&p!==null&&(n=(p&i.Open)===i.Open),n===void 0)throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[h,g]=reactExports.useState(n?"visible":"hidden"),v=Te(()=>{n||g("hidden");}),[o,i$1]=reactExports.useState(true),a=reactExports.useRef([n]);n$6(()=>{o!==false&&a.current[a.current.length-1]!==n&&(a.current.push(n),i$1(false));},[a,n]);let s=reactExports.useMemo(()=>({show:n,appear:l,initial:o}),[n,l,o]);n$6(()=>{n?g("visible"):!M(v)&&d.current!==null&&g("hidden");},[n,v]);let r={unmount:S},f=o$5(()=>{var u;o&&i$1(false),(u=e.beforeEnter)==null||u.call(e);}),U=o$5(()=>{var u;o&&i$1(false),(u=e.beforeLeave)==null||u.call(e);}),H=K();return G$2.createElement(w$1.Provider,{value:v},G$2.createElement(V.Provider,{value:s},H({ourProps:{...r,as:reactExports.Fragment,children:G$2.createElement(me,{ref:C,...r,...R,beforeEnter:f,beforeLeave:U})},theirProps:{},defaultTag:reactExports.Fragment,features:fe,visible:h==="visible",name:"Transition"})))}function Le(e,t){let n=reactExports.useContext(V)!==null,l=u$2()!==null;return G$2.createElement(G$2.Fragment,null,!n&&l?G$2.createElement(X,{ref:t,...e}):G$2.createElement(me,{ref:t,...e}))}let X=Y(Ie),me=Y(Fe$1),Oe=Y(Le),Ke$1=Object.assign(X,{Child:Oe,Root:X});

var we$1=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(we$1||{}),Be=(t=>(t[t.SetTitleId=0]="SetTitleId",t))(Be||{});let Ue={[0](e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},w=reactExports.createContext(null);w.displayName="DialogContext";function O(e){let t=reactExports.useContext(w);if(t===null){let o=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,O),o}return t}function He(e,t){return u$8(t.type,Ue,e,t)}let z=Y(function(t,o){let a=reactExports.useId(),{id:n=`headlessui-dialog-${a}`,open:i$1,onClose:p,initialFocus:d,role:s="dialog",autoFocus:f=true,__demoMode:u=false,unmount:y=false,...S$1}=t,R=reactExports.useRef(false);s=function(){return s==="dialog"||s==="alertdialog"?s:(R.current||(R.current=true,console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),"dialog")}();let g=u$2();i$1===void 0&&g!==null&&(i$1=(g&i.Open)===i.Open);let T=reactExports.useRef(null),I=y$3(T,o),F=u$3(T.current),c=i$1?0:1,[b,Q]=reactExports.useReducer(He,{titleId:null,descriptionId:null,panelRef:reactExports.createRef()}),m=o$5(()=>p(false)),B$1=o$5(r=>Q({type:0,id:r})),D=l$1()?c===0:false,[Z,ee]=oe$1(),te={get current(){var r;return (r=b.panelRef.current)!=null?r:T.current}},v=x$1(),{resolveContainers:M}=S({mainTreeNode:v,portals:Z,defaultContainers:[te]}),U=g!==null?(g&i.Closing)===i.Closing:false;y$1(u||U?false:D,{allowed:o$5(()=>{var r,W;return [(W=(r=T.current)==null?void 0:r.closest("[data-headlessui-portal]"))!=null?W:null]}),disallowed:o$5(()=>{var r;return [(r=v==null?void 0:v.closest("body > *:not(#headlessui-portal-root)"))!=null?r:null]})});let P=x$4.get(null);n$6(()=>{if(D)return P.actions.push(n),()=>P.actions.pop(n)},[P,n,D]);let H=S$3(P,reactExports.useCallback(r=>P.selectors.isTop(r,n),[P,n]));k$1(H,M,r=>{r.preventDefault(),m();}),a$2(H,F==null?void 0:F.defaultView,r=>{r.preventDefault(),r.stopPropagation(),document.activeElement&&"blur"in document.activeElement&&typeof document.activeElement.blur=="function"&&document.activeElement.blur(),m();}),f$4(u||U?false:D,F,M),p$1(D,T,m);let[oe,ne]=H$1(),re=reactExports.useMemo(()=>[{dialogState:c,close:m,setTitleId:B$1,unmount:y},b],[c,m,B$1,y,b]),N=n$5({open:c===0}),le$1={ref:I,id:n,role:s,tabIndex:-1,"aria-modal":u?void 0:c===0?true:void 0,"aria-labelledby":b.titleId,"aria-describedby":oe,unmount:y},ae=!f$3(),E=G.None;D&&!u&&(E|=G.RestoreFocus,E|=G.TabLock,f&&(E|=G.AutoFocus),ae&&(E|=G.InitialFocus));let ie=K();return G$2.createElement(s$1,null,G$2.createElement(l,{force:true},G$2.createElement(le,null,G$2.createElement(w.Provider,{value:re},G$2.createElement(B,{target:T},G$2.createElement(l,{force:false},G$2.createElement(ne,{slot:N},G$2.createElement(ee,null,G$2.createElement(ge,{initialFocus:d,initialFocusFallback:T,containers:M,features:E},G$2.createElement(C$2,{value:m},ie({ourProps:le$1,theirProps:S$1,slot:N,defaultTag:Ne$1,features:We,visible:c===0,name:"Dialog"})))))))))))}),Ne$1="div",We=A$2.RenderStrategy|A$2.Static;function $e(e,t){let{transition:o=false,open:a,...n}=e,i=u$2(),p=e.hasOwnProperty("open")||i!==null,d=e.hasOwnProperty("onClose");if(!p&&!d)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!p)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!d)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(!i&&typeof e.open!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);if(typeof e.onClose!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);return (a!==void 0||o)&&!n.static?G$2.createElement(j,null,G$2.createElement(Ke$1,{show:a,transition:o,unmount:n.unmount},G$2.createElement(z,{ref:t,...n}))):G$2.createElement(j,null,G$2.createElement(z,{ref:t,open:a,...n}))}let je="div";function Ye(e,t){let o=reactExports.useId(),{id:a=`headlessui-dialog-panel-${o}`,transition:n=false,...i}=e,[{dialogState:p,unmount:d},s]=O("Dialog.Panel"),f=y$3(t,s.panelRef),u=n$5({open:p===0}),y=o$5(I=>{I.stopPropagation();}),S={ref:f,id:a,onClick:y},R=n?Oe:reactExports.Fragment,g=n?{unmount:d}:{},T=K();return G$2.createElement(R,{...g},T({ourProps:S,theirProps:i,slot:u,defaultTag:je,name:"Dialog.Panel"}))}let Je="div";function Ke(e,t){let{transition:o=false,...a}=e,[{dialogState:n,unmount:i}]=O("Dialog.Backdrop"),p=n$5({open:n===0}),d={ref:t,"aria-hidden":true},s=o?Oe:reactExports.Fragment,f=o?{unmount:i}:{},u=K();return G$2.createElement(s,{...f},u({ourProps:d,theirProps:a,slot:p,defaultTag:Je,name:"Dialog.Backdrop"}))}let Xe="h2";function Ve(e,t){let o=reactExports.useId(),{id:a=`headlessui-dialog-title-${o}`,...n}=e,[{dialogState:i,setTitleId:p}]=O("Dialog.Title"),d=y$3(t);reactExports.useEffect(()=>(p(a),()=>p(null)),[a,p]);let s=n$5({open:i===0}),f={ref:d,id:a};return K()({ourProps:f,theirProps:n,slot:s,defaultTag:Xe,name:"Dialog.Title"})}let qe=Y($e),ze=Y(Ye);Y(Ke);let Qe=Y(Ve),ht$1=Object.assign(qe,{Panel:ze,Title:Qe,Description:M$2});

var f$1=Object.defineProperty;var b=(t,n,e)=>n in t?f$1(t,n,{enumerable:true,configurable:true,writable:true,value:e}):t[n]=e;var p=(t,n,e)=>(b(t,typeof n!="symbol"?n+"":n,e),e);var v=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(v||{}),h=(r=>(r[r.OpenPopover=0]="OpenPopover",r[r.ClosePopover=1]="ClosePopover",r[r.SetButton=2]="SetButton",r[r.SetButtonId=3]="SetButtonId",r[r.SetPanel=4]="SetPanel",r[r.SetPanelId=5]="SetPanelId",r))(h||{});let E={[0]:t=>t.popoverState===0?t:{...t,popoverState:0,__demoMode:false},[1](t){return t.popoverState===1?t:{...t,popoverState:1,__demoMode:false}},[2](t,n){return t.button===n.button?t:{...t,button:n.button}},[3](t,n){return t.buttonId===n.buttonId?t:{...t,buttonId:n.buttonId}},[4](t,n){return t.panel===n.panel?t:{...t,panel:n.panel}},[5](t,n){return t.panelId===n.panelId?t:{...t,panelId:n.panelId}}};class d extends T$2{constructor(e){super(e);p(this,"actions",{close:()=>this.send({type:1}),refocusableClose:e=>{this.actions.close();let o=(()=>e?n$4(e)?e:"current"in e&&n$4(e.current)?e.current:this.state.button:this.state.button)();o==null||o.focus();},open:()=>this.send({type:0}),setButtonId:e=>this.send({type:3,buttonId:e}),setButton:e=>this.send({type:2,button:e}),setPanelId:e=>this.send({type:5,panelId:e}),setPanel:e=>this.send({type:4,panel:e})});p(this,"selectors",{isPortalled:e=>{var i;if(!e.button||!e.panel)return  false;let o=(i=l$4(e.button))!=null?i:document;for(let u of o.querySelectorAll("body > *"))if(Number(u==null?void 0:u.contains(e.button))^Number(u==null?void 0:u.contains(e.panel)))return  true;let l=x$3(o),s=l.indexOf(e.button),r=(s+l.length-1)%l.length,c=(s+1)%l.length,S=l[r],m=l[c];return !e.panel.contains(S)&&!e.panel.contains(m)}});{let o=this.state.id,l=x$4.get(null);this.on(0,()=>l.actions.push(o)),this.on(1,()=>l.actions.pop(o));}}static new({id:e,__demoMode:o=false}){return new d({id:e,__demoMode:o,popoverState:o?0:1,buttons:{current:[]},button:null,buttonId:null,panel:null,panelId:null,beforePanelSentinel:{current:null},afterPanelSentinel:{current:null},afterButtonSentinel:{current:null}})}reduce(e,o){return u$8(o.type,E,e,o)}}

const a=reactExports.createContext(null);function u(r){let o=reactExports.useContext(a);if(o===null){let e=new Error(`<${r} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(e,u),e}return o}function f({id:r,__demoMode:o=false}){let e=reactExports.useMemo(()=>d.new({id:r,__demoMode:o}),[]);return c$1(()=>e.dispose()),e}

let Fe=reactExports.createContext(null);Fe.displayName="PopoverGroupContext";function we(){return reactExports.useContext(Fe)}let de=reactExports.createContext(null);de.displayName="PopoverPanelContext";function mt(){return reactExports.useContext(de)}let vt="div";function Tt(E,O){var M;let R=reactExports.useId(),{__demoMode:B=false,...T}=E,n=f({id:R,__demoMode:B}),b=reactExports.useRef(null),t=y$3(O,T$3(r=>{b.current=r;})),[A,d,o,C,y]=S$3(n,reactExports.useCallback(r=>[r.popoverState,r.button,r.panel,r.buttonId,r.panelId],[])),D=c$5((M=b.current)!=null?M:d),_=s$6(C),a$1=s$6(y),u=reactExports.useMemo(()=>({buttonId:_,panelId:a$1,close:n.actions.close}),[_,a$1,n]),f$1=we(),l=f$1==null?void 0:f$1.registerPopover,c=o$5(()=>{var F,G;let r=e$4((F=b.current)!=null?F:d);return (G=f$1==null?void 0:f$1.isFocusWithinPopoverGroup())!=null?G:r&&((d==null?void 0:d.contains(r))||(o==null?void 0:o.contains(r)))});reactExports.useEffect(()=>l==null?void 0:l(u),[l,u]);let[m,W]=oe$1(),V=x$1(d),j$1=S({mainTreeNode:V,portals:m,defaultContainers:[{get current(){return n.state.button}},{get current(){return n.state.panel}}]});E$1(D,"focus",r=>{var F,G,h,k,I,H;r.target!==window&&i$4(r.target)&&n.state.popoverState===v.Open&&(c()||n.state.button&&n.state.panel&&(j$1.contains(r.target)||(G=(F=n.state.beforePanelSentinel.current)==null?void 0:F.contains)!=null&&G.call(F,r.target)||(k=(h=n.state.afterPanelSentinel.current)==null?void 0:h.contains)!=null&&k.call(h,r.target)||(H=(I=n.state.afterButtonSentinel.current)==null?void 0:I.contains)!=null&&H.call(I,r.target)||n.actions.close()));},true);let L=A===v.Open;k$1(L,j$1.resolveContainers,(r,F)=>{n.actions.close(),H(F,I$2.Loose)||(r.preventDefault(),d==null||d.focus());});let Y=n$5({open:A===v.Open,close:n.actions.refocusableClose}),$=S$3(n,reactExports.useCallback(r=>u$8(r.popoverState,{[v.Open]:i.Open,[v.Closed]:i.Closed}),[])),Q={ref:t},Z=K();return G$2.createElement(j,{node:V},G$2.createElement(Ae$1,null,G$2.createElement(de.Provider,{value:null},G$2.createElement(a.Provider,{value:n},G$2.createElement(C$2,{value:n.actions.refocusableClose},G$2.createElement(c$2,{value:$},G$2.createElement(W,null,Z({ourProps:Q,theirProps:T,slot:Y,defaultTag:vt,name:"Popover"}))))))))}let Et="button";function bt(E,O){let R=reactExports.useId(),{id:B=`headlessui-popover-button-${R}`,disabled:T=false,autoFocus:n=false,...b}=E,t=u("Popover.Button"),[A,d,o,C,y,D,_]=S$3(t,reactExports.useCallback(e=>[e.popoverState,t.selectors.isPortalled(e),e.button,e.buttonId,e.panel,e.panelId,e.afterButtonSentinel],[])),a=reactExports.useRef(null),u$2=`headlessui-focus-sentinel-${reactExports.useId()}`,f=we(),l=f==null?void 0:f.closeOthers,m=mt()!==null;reactExports.useEffect(()=>{if(!m)return t.actions.setButtonId(B),()=>t.actions.setButtonId(null)},[m,B,t]);let[W]=reactExports.useState(()=>Symbol()),V=y$3(a,O,Fe$2(),o$5(e=>{if(!m){if(e)t.state.buttons.current.push(W);else {let p=t.state.buttons.current.indexOf(W);p!==-1&&t.state.buttons.current.splice(p,1);}t.state.buttons.current.length>1&&console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."),e&&t.actions.setButton(e);}})),j=y$3(a,O),L=o$5(e=>{var p,i,x;if(m){if(t.state.popoverState===v.Closed)return;switch(e.key){case o$3.Space:case o$3.Enter:e.preventDefault(),(i=(p=e.target).click)==null||i.call(p),t.actions.close(),(x=t.state.button)==null||x.focus();break}}else switch(e.key){case o$3.Space:case o$3.Enter:e.preventDefault(),e.stopPropagation(),t.state.popoverState===v.Closed?(l==null||l(t.state.buttonId),t.actions.open()):t.actions.close();break;case o$3.Escape:if(t.state.popoverState!==v.Open)return l==null?void 0:l(t.state.buttonId);if(!a.current)return;let S=e$4(a.current);if(S&&!a.current.contains(S))return;e.preventDefault(),e.stopPropagation(),t.actions.close();break}}),Y=o$5(e=>{m||e.key===o$3.Space&&e.preventDefault();}),$=o$5(e=>{var p,i;s$4(e.currentTarget)||T||(m?(t.actions.close(),(p=t.state.button)==null||p.focus()):(e.preventDefault(),e.stopPropagation(),t.state.popoverState===v.Closed?(l==null||l(t.state.buttonId),t.actions.open()):t.actions.close(),(i=t.state.button)==null||i.focus()));}),Q=o$5(e=>{e.preventDefault(),e.stopPropagation();}),{isFocusVisible:Z,focusProps:M}=$0c4a58759813079a$export$4e328f61c538687f({autoFocus:n}),{isHovered:r,hoverProps:F}=$e969f22b6713ca4a$export$ae780daf29e6d456({isDisabled:T}),{pressed:G,pressProps:h}=w$6({disabled:T}),k=A===v.Open,I=n$5({open:k,active:G||k,disabled:T,hover:r,focus:Z,autofocus:n}),H=e$1(E,o),fe=m?V$1({ref:j,type:H,onKeyDown:L,onClick:$,disabled:T||void 0,autoFocus:n},M,F,h):V$1({ref:V,id:C,type:H,"aria-expanded":A===v.Open,"aria-controls":y?D:void 0,disabled:T||void 0,autoFocus:n,onKeyDown:L,onKeyUp:Y,onClick:$,onMouseDown:Q},M,F,h),ae=u$1(),Pe=o$5(()=>{if(!n$4(t.state.panel))return;let e=t.state.panel;function p(){u$8(ae.current,{[a$1.Forwards]:()=>v$1(e,T$1.First),[a$1.Backwards]:()=>v$1(e,T$1.Last)})===A$1.Error&&v$1(x$3(r$5(t.state.button)).filter(x=>x.dataset.headlessuiFocusGuard!=="true"),u$8(ae.current,{[a$1.Forwards]:T$1.Next,[a$1.Backwards]:T$1.Previous}),{relativeTo:t.state.button});}p();}),s=K();return G$2.createElement(G$2.Fragment,null,s({ourProps:fe,theirProps:b,slot:I,defaultTag:Et,name:"Popover.Button"}),k&&!m&&d&&G$2.createElement(f$8,{id:u$2,ref:_,features:s$5.Focusable,"data-headlessui-focus-guard":true,as:"button",type:"button",onFocus:Pe}))}let yt="div",gt=A$2.RenderStrategy|A$2.Static;function Ne(E,O){let R=reactExports.useId(),{id:B=`headlessui-popover-backdrop-${R}`,transition:T=false,...n}=E,b=u("Popover.Backdrop"),t=S$3(b,reactExports.useCallback(l=>l.popoverState,[])),[A,d]=reactExports.useState(null),o=y$3(O,d),C=u$2(),[y,D]=N(T,A,C!==null?(C&i.Open)===i.Open:t===v.Open),_=o$5(l=>{if(s$4(l.currentTarget))return l.preventDefault();b.actions.close();}),a=n$5({open:t===v.Open}),u$1={ref:o,id:B,"aria-hidden":true,onClick:_,...x$2(D)};return K()({ourProps:u$1,theirProps:n,slot:a,defaultTag:yt,features:gt,visible:y,name:"Popover.Backdrop"})}let Rt="div",Ft=A$2.RenderStrategy|A$2.Static;function Bt(E,O){let R=reactExports.useId(),{id:B=`headlessui-popover-panel-${R}`,focus:T=false,anchor:n,portal:b=false,modal:t=false,transition:A=false,...d}=E,o=u("Popover.Panel"),C=S$3(o,o.selectors.isPortalled),[y,D,_,a,u$4]=S$3(o,reactExports.useCallback(s=>[s.popoverState,s.button,s.__demoMode,s.beforePanelSentinel,s.afterPanelSentinel],[])),f=`headlessui-focus-sentinel-before-${R}`,l=`headlessui-focus-sentinel-after-${R}`,c=reactExports.useRef(null),m=ye(n),[W,V]=Re(m),j=Te$1();m&&(b=true);let[L,Y]=reactExports.useState(null),$=y$3(c,O,m?W:null,o.actions.setPanel,Y),Q=u$3(D),Z=u$3(c.current);n$6(()=>(o.actions.setPanelId(B),()=>o.actions.setPanelId(null)),[B,o]);let M=u$2(),[r,F]=N(A,L,M!==null?(M&i.Open)===i.Open:y===v.Open);p$1(r,D,o.actions.close),f$4(_?false:t&&r,Z);let h=o$5(s=>{var e;switch(s.key){case o$3.Escape:if(o.state.popoverState!==v.Open||!c.current)return;let p=e$4(c.current);if(p&&!c.current.contains(p))return;s.preventDefault(),s.stopPropagation(),o.actions.close(),(e=o.state.button)==null||e.focus();break}});reactExports.useEffect(()=>{var s;E.static||y===v.Closed&&((s=E.unmount)==null||s)&&o.actions.setPanel(null);},[y,E.unmount,E.static,o]),reactExports.useEffect(()=>{if(_||!T||y!==v.Open||!c.current)return;let s=e$4(c.current);c.current.contains(s)||v$1(c.current,T$1.First);},[_,T,c.current,y]);let k=n$5({open:y===v.Open,close:o.actions.refocusableClose}),I=V$1(m?j():{},{ref:$,id:B,onKeyDown:h,onBlur:T&&y===v.Open?s=>{var p,i,x,S,me;let e=s.relatedTarget;e&&c.current&&((p=c.current)!=null&&p.contains(e)||(o.actions.close(),((x=(i=a.current)==null?void 0:i.contains)!=null&&x.call(i,e)||(me=(S=u$4.current)==null?void 0:S.contains)!=null&&me.call(S,e))&&e.focus({preventScroll:true})));}:void 0,tabIndex:-1,style:{...d.style,...V,"--button-width":w$5(r,D,true).width},...x$2(F)}),H=u$1(),fe=o$5(()=>{let s=c.current;if(!s)return;function e(){u$8(H.current,{[a$1.Forwards]:()=>{var i;v$1(s,T$1.First)===A$1.Error&&((i=o.state.afterPanelSentinel.current)==null||i.focus());},[a$1.Backwards]:()=>{var p;(p=o.state.button)==null||p.focus({preventScroll:true});}});}e();}),ae=o$5(()=>{let s=c.current;if(!s)return;function e(){u$8(H.current,{[a$1.Forwards]:()=>{var Be;if(!o.state.button)return;let p=(Be=r$5(o.state.button))!=null?Be:document.body,i=x$3(p),x=i.indexOf(o.state.button),S=i.slice(0,x+1),se=[...i.slice(x+1),...S];for(let ve of se.slice())if(ve.dataset.headlessuiFocusGuard==="true"||L!=null&&L.contains(ve)){let Ae=se.indexOf(ve);Ae!==-1&&se.splice(Ae,1);}v$1(se,T$1.First,{sorted:false});},[a$1.Backwards]:()=>{var i;v$1(s,T$1.Previous)===A$1.Error&&((i=o.state.button)==null||i.focus());}});}e();}),Pe=K();return G$2.createElement(s$1,null,G$2.createElement(de.Provider,{value:B},G$2.createElement(C$2,{value:o.actions.refocusableClose},G$2.createElement(le,{enabled:b?E.static||r:false,ownerDocument:Q},r&&C&&G$2.createElement(f$8,{id:f,ref:a,features:s$5.Focusable,"data-headlessui-focus-guard":true,as:"button",type:"button",onFocus:fe}),Pe({ourProps:I,theirProps:d,slot:k,defaultTag:Rt,features:Ft,visible:r,name:"Popover.Panel"}),r&&C&&G$2.createElement(f$8,{id:l,ref:u$4,features:s$5.Focusable,"data-headlessui-focus-guard":true,as:"button",type:"button",onFocus:ae})))))}let At="div";function _t(E,O){let R=reactExports.useRef(null),B=y$3(R,O),[T,n]=reactExports.useState([]),b=o$5(a=>{n(u=>{let f=u.indexOf(a);if(f!==-1){let l=u.slice();return l.splice(f,1),l}return u});}),t=o$5(a=>(n(u=>[...u,a]),()=>b(a))),A=o$5(()=>{var f;let a=r$5(R.current);if(!a)return  false;let u=e$4(R.current);return (f=R.current)!=null&&f.contains(u)?true:T.some(l=>{var c,m;return ((c=a.getElementById(l.buttonId.current))==null?void 0:c.contains(u))||((m=a.getElementById(l.panelId.current))==null?void 0:m.contains(u))})}),d=o$5(a=>{for(let u of T)u.buttonId.current!==a&&u.close();}),o=reactExports.useMemo(()=>({registerPopover:t,unregisterPopover:b,isFocusWithinPopoverGroup:A,closeOthers:d}),[t,b,A,d]),C=n$5({}),y=E,D={ref:B},_=K();return G$2.createElement(j,null,G$2.createElement(Fe.Provider,{value:o},_({ourProps:D,theirProps:y,slot:C,defaultTag:At,name:"Popover.Group"})))}let Ct=Y(Tt),Dt=Y(bt),Ot=Y(Ne),xt=Y(Ne),Lt=Y(Bt),ht=Y(_t),vo=Object.assign(Ct,{Button:Dt,Backdrop:xt,Overlay:Ot,Panel:Lt,Group:ht});

function Bars3Icon({
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
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  }));
}
const ForwardRef$3 = /*#__PURE__*/ reactExports.forwardRef(Bars3Icon);

function MagnifyingGlassIcon({
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
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(MagnifyingGlassIcon);

function XMarkIcon$1({
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
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(XMarkIcon$1);

function throttle(fn, wait) {
  let lastCall = 0;
  let timer = null;
  let lastArgs = null;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    lastArgs = args;
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCall = now;
      fn(...args);
      lastArgs = null;
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = null;
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };
}

function TranslateIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z",
      clipRule: "evenodd"
    }
  ) });
}

function getLanguageSwitcherLinks(currentLang, currentPath, availableLangs, allLangs = ["zh", "en", "jp"]) {
  const links = /* @__PURE__ */ new Map();
  const targetLangs = allLangs.filter((lang) => lang !== currentLang);
  const isDynamicContent = currentPath.startsWith("article/") || currentPath.startsWith("album/") || currentPath.startsWith("thought/");
  for (const lang of targetLangs) {
    if (isDynamicContent && availableLangs && availableLangs.length > 0) {
      if (availableLangs.includes(lang)) {
        links.set(lang, `/${lang}/${currentPath}`);
      } else {
        links.set(lang, `/${lang}`);
      }
    } else if (!currentPath) {
      links.set(lang, `/${lang}`);
    } else {
      links.set(lang, `/${lang}/${currentPath}`);
    }
  }
  return links;
}

const pathMap = /* @__PURE__ */ new Map([
  ["", "article"],
  ["articles", "article"],
  ["albums", "album"],
  ["thoughts", "thought"],
  ["about", "about"],
  ["site", "about"],
  ["contact", "about"],
  ["rss", "about"]
]);
const langMap$1 = /* @__PURE__ */ new Map([
  ["zh", "中文"],
  ["en", "English"],
  ["jp", "日本語"]
]);
function isCurrentTab(tab, path) {
  const currentTab = pathMap.get(path.split("/")[2] ?? "");
  return currentTab === tab;
}
function Navbar({
  lang,
  items,
  pathname,
  availableLangs,
  user,
  profileLabel
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const pathParts = pathname.split("/").filter(Boolean);
  const currentPath = pathParts.length > 1 ? pathParts.slice(1).join("/") : "";
  const languageLinks = getLanguageSwitcherLinks(lang, currentPath, availableLangs);
  const languageOptions = [
    { code: "zh", label: "中文" },
    { code: "en", label: "English" },
    { code: "jp", label: "日本語" }
  ].filter((opt) => opt.code !== lang);
  reactExports.useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 120) {
        navbar.style.top = "-88px";
      } else {
        navbar.style.top = "0";
      }
      lastScrollTop = scrollTop;
    }, 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { id: "navbar", className: "bg-white isolate z-40 fixed top-0 w-full transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Global", className: "border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-8xl mx-auto flex items-center justify-between p-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex lg:gap-2 lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/${lang}`, className: "-m-1.5 p-1.5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "logo", src: "/logo.svg", className: "h-8 w-8", width: "32", height: "32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "font-medium font-serif text-lg", children: "积薪" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(vo, { children: ({ close }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dt, { className: "flex border border-gray-200 items-center rounded text-sm ml-2 px-1.5 gap-1 py-1 data-hover:bg-zinc-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TranslateIcon, { className: "size-4 text-gray-900" }),
            langMap$1.get(lang)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Lt,
            {
              transition: true,
              anchor: "bottom",
              className: "z-50 shadow-2xl divide-y divide-zinc-100 rounded-md bg-white text-sm transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-closed:-translate-y-1 data-closed:opacity-0",
              children: languageOptions.map((option) => {
                const link = languageLinks.get(option.code) || `/${option.code}`;
                const isAvailable = availableLangs ? availableLangs.includes(option.code) : true;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: link,
                    onClick: () => close(),
                    className: `block p-4 w-32 transition ${isAvailable ? "hover:bg-zinc-50" : "opacity-60 hover:bg-zinc-50"}`,
                    title: !isAvailable ? "该语言版本暂不可用" : void 0,
                    children: [
                      option.label,
                      !isAvailable && availableLangs && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-zinc-400", children: "(首页)" })
                    ]
                  },
                  option.code
                );
              })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setMobileMenuOpen(true),
          className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open Menu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { "aria-hidden": "true", className: "h-6 w-6" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:absolute lg:left-1/2 -translate-x-1/2 lg:flex lg:gap-x-12", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: item.link,
          className: `relative group inline-block px-2 py-1 rounded-md text-sm leading-6 text-gray-900 focus:outline-none ${isCurrentTab(item.type, pathname) ? "font-bold" : "font-medium"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:text-violet-700", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 group-hover:bg-violet-500 ${isCurrentTab(item.type, pathname) ? "bg-violet-500" : ""}`
              }
            )
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/${lang}/profile/${user.id}`, className: "lg:py-0 flex flex-col items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-zinc-700", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: user.email })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `/${lang}/login`,
            className: "rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500",
            children: profileLabel.login
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/${lang}/search`, className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "size-5 text-gray-900" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ht$1, { open: mobileMenuOpen, onClose: setMobileMenuOpen, className: "lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ze, { className: "bg-white z-50 fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "-m-1.5 p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "logo", src: "/logo.svg", className: "h-8 w-8", width: "32", height: "32" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "font-medium font-serif text-lg", children: "积薪" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setMobileMenuOpen(false),
              className: "-m-2.5 rounded-md p-2.5 text-gray-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close menu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { "aria-hidden": "true", className: "h-6 w-6" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flow-root", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-my-6 divide-y divide-gray-500/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-6", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.link,
              onClick: () => setMobileMenuOpen(false),
              className: "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
              children: item.name
            },
            index
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-8 flex justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(vo, { children: ({ close }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Dt, { className: "flex border items-center rounded text-sm px-1.5 gap-1 py-1 data-hover:bg-zinc-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TranslateIcon, { className: "size-4 text-gray-900" }),
              langMap$1.get(lang)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Lt,
              {
                transition: true,
                anchor: "bottom",
                className: "z-60 shadow-2xl divide-y divide-zinc-100 rounded-md bg-white text-sm transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-closed:-translate-y-1 data-closed:opacity-0",
                children: languageOptions.map((option) => {
                  const link = languageLinks.get(option.code) || `/${option.code}`;
                  const isAvailable = availableLangs ? availableLangs.includes(option.code) : true;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: link,
                      onClick: () => close(),
                      className: `block p-4 w-32 transition ${isAvailable ? "hover:bg-zinc-50" : "opacity-60 hover:bg-zinc-50"}`,
                      title: !isAvailable ? "该语言版本暂不可用" : void 0,
                      children: [
                        option.label,
                        !isAvailable && availableLangs && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-zinc-400", children: "(首页)" })
                      ]
                    },
                    option.code
                  );
                })
              }
            )
          ] }) }) })
        ] }) })
      ] })
    ] })
  ] });
}

function XMarkIcon({
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
    d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(XMarkIcon);

const STORAGE_KEY = "firewood.community-banner.dismissed";
function Banners({ lang }) {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) setIsVisible(true);
  }, []);
  const localizedCopy = reactExports.useMemo(() => getBannerCopy(lang), [lang]);
  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-50 pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm/6 text-gray-100", children: localizedCopy.body }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-x-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleDismiss,
        className: "-m-1.5 flex-none rounded p-1.5 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Dismiss" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { "aria-hidden": "true", className: "size-5" })
        ]
      }
    ) })
  ] }) });
}

function createSupabaseBrowser(supabaseUrl, supabaseAnonKey) {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 14,
      path: "/",
      sameSite: "lax"
    }
  });
}

function AuthProvider({
  supabaseUrl,
  supabaseAnonKey,
  serverAccessToken
}) {
  const [supabase] = reactExports.useState(() => createSupabaseBrowser(supabaseUrl, supabaseAnonKey));
  reactExports.useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") return;
      if (session?.access_token !== serverAccessToken) {
        window.location.reload();
      }
    });
    return () => subscription.unsubscribe();
  }, [serverAccessToken, supabase]);
  return null;
}

function getFooterLabels(labels, lang) {
  if (!labels[lang]) return labels.zh;
  return labels[lang];
}

function GithubIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
      clipRule: "evenodd"
    }
  ) });
}

function TwitterIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      d: "M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
    }
  ) });
}

function InstagramIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
      clipRule: "evenodd"
    }
  ) });
}

function YoutubeIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z",
      clipRule: "evenodd"
    }
  ) });
}

function RSSIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z",
      clipRule: "evenodd"
    }
  ) });
}

function NotAIIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "131",
      height: "42",
      viewBox: "0 0 131 42",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M116 0.5C124.008 0.5 130.5 6.99187 130.5 15V41.5H15C6.99187 41.5 0.5 35.0081 0.5 27V0.5H116Z",
            fill: "white",
            stroke: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M17.9605 24.1575C21.4266 26.9643 26.3836 26.9643 29.8497 24.1575L28.5095 22.5026C25.8248 24.6766 21.9854 24.6766 19.3007 22.5026L17.9605 24.1575Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.404 20.5134V17.6365H21.5336V20.5134H19.404Z", fill: "black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M26.012 17.6365V20.5134H28.1415V17.6365H26.012Z", fill: "black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M35 21.5C35 27.8513 29.8513 33 23.5 33C17.1487 33 12 27.8513 12 21.5C12 15.1487 17.1487 10 23.5 10C29.8513 10 35 15.1487 35 21.5ZM32.8705 21.5C32.8705 26.6752 28.6752 30.8705 23.5 30.8705C18.3248 30.8705 14.1295 26.6752 14.1295 21.5C14.1295 16.3248 18.3248 12.1295 23.5 12.1295C28.6752 12.1295 32.8705 16.3248 32.8705 21.5Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M93.3281 32.0851L97.95 19H101.008L105.594 32.0851H102.66L101.825 29.3953H97.0537L96.1575 32.0851H93.3281ZM99.4525 21.9916L97.783 27.1405H101.069L99.4525 21.9916Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M77.602 22.1958C78.8615 22.1958 79.8456 22.6545 80.5544 23.5718C81.2691 24.4891 81.6264 25.6728 81.6264 27.1227C81.6264 28.6259 81.2749 29.8717 80.572 30.8601C79.869 31.8484 78.8878 32.3426 77.6284 32.3426C76.8376 32.3426 76.202 32.1828 75.7217 31.8632C75.4346 31.6738 75.1242 31.3424 74.7903 30.8689V32.0851H72.3388V19.0178H74.8342V23.6695C75.1505 23.2197 75.4991 22.8764 75.8798 22.6397C76.3309 22.3438 76.905 22.1958 77.602 22.1958ZM76.9606 30.2564C77.605 30.2564 78.1058 29.993 78.4631 29.4663C78.8205 28.9396 78.9991 28.2472 78.9991 27.389C78.9991 26.7025 78.9113 26.1344 78.7355 25.6846C78.4016 24.8324 77.7866 24.4063 76.8903 24.4063C75.9823 24.4063 75.3585 24.8235 75.0187 25.658C74.843 26.1018 74.7551 26.6759 74.7551 27.3802C74.7551 28.2087 74.9367 28.8952 75.2999 29.4397C75.6631 29.9842 76.2167 30.2564 76.9606 30.2564Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M66.5236 30.1587C66.424 30.0581 66.3742 29.8096 66.3742 29.4131V24.2997H67.9295V22.4977H66.3742V19.799H63.8964V22.4977H62.5608V24.2997H63.8964V30.2564C63.8964 30.8601 64.037 31.3069 64.3181 31.5969C64.7516 32.0526 65.56 32.2597 66.7433 32.2183L67.9295 32.1739V30.283C67.8475 30.2889 67.7626 30.2949 67.6747 30.3008H67.4374C66.9278 30.3008 66.6232 30.2534 66.5236 30.1587Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M62.4634 27.2648C62.4634 28.6851 62.0592 29.9013 61.2509 30.9133C60.4425 31.9194 59.2152 32.4225 57.5692 32.4225C55.9231 32.4225 54.6959 31.9194 53.8875 30.9133C53.0791 29.9013 52.675 28.6851 52.675 27.2648C52.675 25.8681 53.0791 24.6578 53.8875 23.6339C54.6959 22.6101 55.9231 22.0982 57.5692 22.0982C59.2152 22.0982 60.4425 22.6101 61.2509 23.6339C62.0592 24.6578 62.4634 25.8681 62.4634 27.2648ZM57.5604 30.3008C58.2926 30.3008 58.855 30.0374 59.2475 29.5107C59.6399 28.984 59.8362 28.2353 59.8362 27.2648C59.8362 26.2942 59.6399 25.5485 59.2475 25.0277C58.855 24.501 58.2926 24.2376 57.5604 24.2376C56.8282 24.2376 56.2629 24.501 55.8646 25.0277C55.4721 25.5485 55.2758 26.2942 55.2758 27.2648C55.2758 28.2353 55.4721 28.984 55.8646 29.5107C56.2629 30.0374 56.8282 30.3008 57.5604 30.3008Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M48.2896 22.1781C49.2796 22.1781 50.088 22.4414 50.7148 22.9681C51.3474 23.4889 51.6638 24.356 51.6638 25.5692V32.0851H49.098V26.1995C49.098 25.6905 49.0307 25.2999 48.8959 25.0277C48.6499 24.5305 48.1813 24.282 47.49 24.282C46.6407 24.282 46.0578 24.646 45.7415 25.3739C45.5775 25.7586 45.4954 26.2498 45.4954 26.8475V32.0851H43V22.4266H45.4164V23.8381C45.7385 23.341 46.0432 22.9829 46.3302 22.764C46.8457 22.3734 47.4988 22.1781 48.2896 22.1781Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M83.4108 33.9582L83.0945 33.9405V35.9645C83.3639 35.9822 83.566 35.9911 83.7008 35.9911C83.8355 35.997 84.0142 36 84.2368 36C85.3439 36 86.082 35.7781 86.451 35.3342C86.8201 34.8963 87.3209 33.76 87.9536 31.9253L91.2398 22.4089H88.5774L86.6004 29.5462L84.5092 22.4089H81.7237L85.2385 32.5112C85.2619 32.5822 85.2092 32.7775 85.0803 33.0971C84.9573 33.4167 84.8225 33.6268 84.6761 33.7274C84.5238 33.8339 84.3363 33.902 84.1138 33.9316C83.8912 33.9612 83.6568 33.9701 83.4108 33.9582Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M107.902 29.8624V21.2258H106.306V19H112V21.2258H110.59V29.8624H112V32.0882H106.306V29.8624H107.902Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M79.999 13.8379L81.4189 9.55176H82.3975C82.2729 9.88926 81.9956 10.659 81.5664 11.8613C81.2453 12.7655 80.977 13.5031 80.7607 14.0732C80.2496 15.4167 79.8884 16.2363 79.6787 16.5312C79.469 16.8259 79.1086 16.9736 78.5977 16.9736C78.4732 16.9736 78.3764 16.9688 78.3076 16.959C78.2422 16.9492 78.1606 16.9304 78.0625 16.9043V16.0986C78.2163 16.1412 78.3277 16.1669 78.3965 16.1768C78.4652 16.1866 78.5257 16.1914 78.5781 16.1914C78.7417 16.1914 78.8611 16.164 78.9365 16.1084C79.0151 16.056 79.0814 15.9907 79.1338 15.9121C79.1502 15.8859 79.209 15.7512 79.3105 15.5088C79.4121 15.2663 79.4854 15.0857 79.5312 14.9678L77.585 9.55176H78.5879L79.999 13.8379Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M61.5166 9.43359C61.8901 9.43359 62.2529 9.52228 62.6035 9.69922C62.9539 9.8728 63.2209 10.0986 63.4043 10.377C63.5812 10.6424 63.6998 10.9528 63.7588 11.3066C63.8111 11.5491 63.8369 11.9355 63.8369 12.4658H59.9785C59.9949 12.9999 60.1215 13.4295 60.3574 13.7539C60.5933 14.0749 60.9584 14.2353 61.4531 14.2354C61.9151 14.2354 62.2834 14.083 62.5586 13.7783C62.7159 13.6014 62.828 13.3967 62.8936 13.1641H63.7637C63.7407 13.3573 63.6632 13.5734 63.5322 13.8125C63.4045 14.0484 63.2601 14.2419 63.0996 14.3926C62.8309 14.6547 62.498 14.8321 62.1016 14.9238C61.8888 14.9762 61.6482 15.0019 61.3799 15.002C60.7245 15.002 60.1684 14.7652 59.7129 14.29C59.2574 13.8116 59.0303 13.1427 59.0303 12.2842C59.0303 11.4389 59.2591 10.7521 59.7178 10.2246C60.1764 9.69718 60.7763 9.4337 61.5166 9.43359ZM61.4629 10.2051C61.0566 10.2051 60.7157 10.3526 60.4404 10.6475C60.1652 10.9391 60.0193 11.3115 60.0029 11.7637H62.9277C62.8917 11.3804 62.8077 11.0741 62.6768 10.8447C62.4343 10.4188 62.0298 10.2051 61.4629 10.2051Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M87.627 9.42383C88.246 9.42383 88.7491 9.54159 89.1357 9.77734C89.5191 10.0133 89.7109 10.3808 89.7109 10.8789V13.9111C89.7109 14.0029 89.7296 14.0771 89.7656 14.1328C89.805 14.1882 89.8851 14.2158 90.0059 14.2158C90.0452 14.2158 90.0896 14.2142 90.1387 14.2109C90.1878 14.2044 90.2403 14.1963 90.2959 14.1865V14.8398C90.1583 14.8792 90.0535 14.9042 89.9814 14.9141C89.9094 14.9239 89.811 14.9287 89.6865 14.9287C89.382 14.9287 89.1611 14.8205 89.0234 14.6045C88.9514 14.4899 88.9006 14.3276 88.8711 14.1182C88.6909 14.354 88.4312 14.5588 88.0938 14.7324C87.7564 14.9059 87.3846 14.9922 86.9785 14.9922C86.4903 14.9922 86.0906 14.8447 85.7793 14.5498C85.4714 14.2517 85.3174 13.8801 85.3174 13.4346C85.3174 12.9463 85.4697 12.5675 85.7744 12.2988C86.0791 12.0303 86.479 11.865 86.9736 11.8027L88.3838 11.626C88.5869 11.5998 88.7232 11.5143 88.792 11.3701C88.8313 11.2915 88.8506 11.1786 88.8506 11.0312C88.8506 10.7298 88.7426 10.5113 88.5264 10.377C88.3134 10.2395 88.007 10.1709 87.6074 10.1709C87.1455 10.1709 86.8173 10.295 86.624 10.5439C86.5159 10.6816 86.4459 10.8872 86.4131 11.1592H85.5879C85.6043 10.5104 85.8138 10.0599 86.2168 9.80762C86.6231 9.55207 87.0929 9.42387 87.627 9.42383ZM88.8262 12.1367C88.7181 12.2055 88.5785 12.2627 88.4082 12.3086C88.2379 12.3544 88.0709 12.3876 87.9072 12.4072L87.3721 12.4756C87.0511 12.5182 86.81 12.586 86.6494 12.6777C86.3774 12.8317 86.2412 13.0775 86.2412 13.415C86.2413 13.6705 86.3348 13.8721 86.5215 14.0195C86.7082 14.1668 86.9292 14.2402 87.1846 14.2402C87.4958 14.2402 87.7973 14.1685 88.0889 14.0244C88.5804 13.7852 88.8262 13.3935 88.8262 12.8496V12.1367Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M114.617 9.42383C115.236 9.42386 115.739 9.54148 116.126 9.77734C116.509 10.0133 116.701 10.3808 116.701 10.8789V13.9111C116.701 14.0029 116.719 14.0771 116.755 14.1328C116.794 14.1884 116.875 14.2158 116.996 14.2158C117.035 14.2158 117.08 14.2142 117.129 14.2109C117.178 14.2044 117.231 14.1963 117.286 14.1865V14.8398C117.149 14.8791 117.044 14.9042 116.972 14.9141C116.9 14.9239 116.801 14.9287 116.677 14.9287C116.372 14.9287 116.15 14.8207 116.013 14.6045C115.941 14.4899 115.89 14.3277 115.86 14.1182C115.68 14.3539 115.421 14.5588 115.084 14.7324C114.746 14.9061 114.374 14.9922 113.968 14.9922C113.48 14.9921 113.08 14.8446 112.769 14.5498C112.461 14.2517 112.307 13.88 112.307 13.4346C112.307 12.9463 112.459 12.5675 112.764 12.2988C113.068 12.0302 113.468 11.865 113.963 11.8027L115.374 11.626C115.577 11.5997 115.713 11.5143 115.782 11.3701C115.821 11.2915 115.841 11.1785 115.841 11.0312C115.841 10.7298 115.733 10.5113 115.517 10.377C115.304 10.2394 114.997 10.1709 114.598 10.1709C114.136 10.1709 113.808 10.2951 113.614 10.5439C113.506 10.6816 113.436 10.8872 113.403 11.1592H112.577C112.594 10.5106 112.803 10.06 113.206 9.80762C113.612 9.55203 114.083 9.42383 114.617 9.42383ZM115.816 12.1367C115.708 12.2055 115.569 12.2627 115.398 12.3086C115.228 12.3544 115.061 12.3876 114.897 12.4072L114.361 12.4756C114.04 12.5182 113.799 12.586 113.639 12.6777C113.367 12.8317 113.23 13.0776 113.23 13.415C113.231 13.6705 113.324 13.8721 113.511 14.0195C113.698 14.167 113.919 14.2402 114.175 14.2402C114.486 14.2402 114.788 14.1686 115.079 14.0244C115.571 13.7852 115.816 13.3935 115.816 12.8496V12.1367Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M73.5205 10.1904C73.7137 9.93829 73.9444 9.74627 74.2129 9.61523C74.4815 9.48093 74.7734 9.41411 75.0879 9.41406C75.7431 9.41406 76.2744 9.63978 76.6807 10.0918C77.0903 10.5407 77.2949 11.2048 77.2949 12.083C77.2949 12.9152 77.0934 13.6068 76.6904 14.1572C76.2874 14.7076 75.7288 14.9824 75.0146 14.9824C74.6149 14.9824 74.2772 14.8857 74.002 14.6924C73.8382 14.5777 73.6623 14.3948 73.4756 14.1426V14.8154H72.6602V7.57031H73.5205V10.1904ZM74.9854 10.2051C74.5823 10.2051 74.2276 10.3542 73.9229 10.6523C73.6215 10.9505 73.4707 11.4423 73.4707 12.127C73.4707 12.6217 73.5337 13.0231 73.6582 13.3311C73.8908 13.9109 74.3245 14.201 74.96 14.2012C75.4384 14.2012 75.7963 14.011 76.0322 13.6309C76.2713 13.2508 76.3906 12.7494 76.3906 12.127C76.3906 11.5734 76.2713 11.1146 76.0322 10.751C75.7964 10.3874 75.4472 10.2052 74.9854 10.2051Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M99.8516 9.55176V13.0459C99.8516 13.3146 99.8943 13.5347 99.9795 13.7051C100.137 14.0195 100.43 14.1768 100.859 14.1768C101.475 14.1767 101.894 13.901 102.117 13.3506C102.238 13.0557 102.299 12.651 102.299 12.1367V9.55176H103.184V14.8154H102.349L102.358 14.0391C102.244 14.2389 102.101 14.4073 101.931 14.5449C101.593 14.8201 101.184 14.958 100.702 14.958C99.9518 14.958 99.4399 14.7074 99.168 14.2061C99.0206 13.9374 98.9473 13.5786 98.9473 13.1299V9.55176H99.8516Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M55.1963 8.08203V9.55176H56.0361V10.2744H55.1963V13.71C55.1963 13.8933 55.2583 14.0159 55.3828 14.0781C55.4516 14.1141 55.5661 14.1328 55.7266 14.1328H55.8643C55.9134 14.1295 55.9707 14.1247 56.0361 14.1182V14.8154C55.9346 14.8449 55.8282 14.8668 55.7168 14.8799C55.6088 14.893 55.4909 14.8994 55.3633 14.8994C54.9506 14.8994 54.67 14.7945 54.5225 14.585C54.375 14.372 54.3018 14.0963 54.3018 13.7588V10.2744H53.5889V9.55176H54.3018V8.08203H55.1963Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M57.7959 8.08203V9.55176H58.6367V10.2744H57.7959V13.71C57.7959 13.8931 57.8583 14.0158 57.9824 14.0781C58.0512 14.1142 58.1666 14.1328 58.3271 14.1328H58.4648C58.5139 14.1295 58.5713 14.1247 58.6367 14.1182V14.8154C58.5352 14.8449 58.4287 14.8668 58.3174 14.8799C58.2093 14.893 58.0907 14.8994 57.9629 14.8994C57.5504 14.8994 57.2705 14.7944 57.123 14.585C56.9756 14.372 56.9014 14.0963 56.9014 13.7588V10.2744H56.1885V9.55176H56.9014V8.08203H57.7959Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M42.2686 9.55176L43.2812 13.7002L44.3086 9.55176H45.3008L46.333 13.6758L47.4102 9.55176H48.2949L46.7656 14.8154H45.8467L44.7754 10.7412L43.7383 14.8154H42.8193L41.2998 9.55176H42.2686Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M51.2344 9.43359C51.2508 9.43363 51.2785 9.43524 51.3174 9.43848C51.3566 9.44175 51.4238 9.4482 51.5186 9.45801V10.3916C51.4663 10.3818 51.4168 10.3753 51.3711 10.3721C51.3286 10.3688 51.2808 10.3672 51.2285 10.3672C50.7833 10.3673 50.4413 10.5118 50.2021 10.7998C49.9629 11.0849 49.8428 11.4145 49.8428 11.7881V14.8154H48.958V9.55176H49.7988V10.4609C49.8676 10.2841 50.0362 10.0696 50.3047 9.81738C50.5734 9.5618 50.8838 9.43359 51.2344 9.43359Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M52.9834 14.8154H52.084V9.57617H52.9834V14.8154Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M67.2871 9.43359C68.0342 9.43359 68.5396 9.6939 68.8018 10.2148C68.9459 10.4999 69.0176 10.9086 69.0176 11.4395V14.8154H68.1182V11.498C68.1182 11.177 68.0705 10.9183 67.9756 10.7217C67.8183 10.394 67.533 10.2295 67.1201 10.2295C66.9106 10.2295 66.7388 10.2514 66.6045 10.2939C66.362 10.366 66.1493 10.5103 65.9658 10.7266C65.8185 10.9001 65.7217 11.08 65.6758 11.2666C65.6332 11.4501 65.6113 11.7145 65.6113 12.0586V14.8154H64.7266V9.55176H65.5674V10.2988C65.8164 9.99082 66.0799 9.76911 66.3584 9.63477C66.6368 9.50048 66.9465 9.43365 67.2871 9.43359Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M94.4502 7.57031V10.2646C94.6598 9.99938 94.8476 9.81226 95.0146 9.7041C95.2996 9.5174 95.6553 9.4239 96.0811 9.42383C96.8444 9.42383 97.3628 9.69066 97.6348 10.2246C97.7822 10.5162 97.8555 10.9217 97.8555 11.4395V14.8154H96.9463V11.498C96.9463 11.1114 96.8971 10.8277 96.7988 10.6475C96.6382 10.3593 96.3368 10.2148 95.8945 10.2148C95.5277 10.2149 95.1955 10.3416 94.8975 10.5938C94.5993 10.846 94.4503 11.3225 94.4502 12.0234V14.8154H93.5654V7.57031H94.4502Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M109.8 9.43359C110.508 9.43359 110.99 9.68908 111.245 10.2002C111.383 10.4754 111.451 10.8462 111.451 11.3115V14.8154H110.532V11.1592C110.532 10.8086 110.444 10.5676 110.267 10.4365C110.093 10.3055 109.88 10.2393 109.628 10.2393C109.281 10.2393 108.981 10.3562 108.729 10.5889C108.48 10.8215 108.354 11.21 108.354 11.7539V14.8154H107.455V11.3799C107.455 11.023 107.413 10.7625 107.328 10.5986C107.194 10.3529 106.942 10.2295 106.575 10.2295C106.241 10.2296 105.936 10.3594 105.661 10.6182C105.389 10.877 105.254 11.3455 105.254 12.0234V14.8154H104.369V9.55176H105.244V10.2988C105.454 10.0401 105.643 9.85135 105.813 9.7334C106.105 9.53352 106.436 9.4336 106.807 9.43359C107.226 9.43359 107.564 9.53673 107.819 9.74316C107.963 9.86113 108.094 10.0353 108.212 10.2646C108.409 9.98285 108.64 9.77399 108.905 9.63965C109.171 9.50207 109.469 9.43361 109.8 9.43359Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M120.516 9.43359C121.262 9.43368 121.767 9.69402 122.029 10.2148C122.173 10.4999 122.245 10.9086 122.245 11.4395V14.8154H121.346V11.498C121.346 11.177 121.298 10.9183 121.203 10.7217C121.046 10.394 120.761 10.2295 120.348 10.2295C120.138 10.2295 119.966 10.2514 119.832 10.2939C119.59 10.366 119.377 10.5103 119.193 10.7266C119.046 10.9001 118.949 11.08 118.903 11.2666C118.861 11.4501 118.839 11.7145 118.839 12.0586V14.8154H117.954V9.55176H118.795V10.2988C119.044 9.99086 119.307 9.76912 119.586 9.63477C119.864 9.50042 120.175 9.43359 120.516 9.43359Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M52.9834 8.59766H52.084V7.5957H52.9834V8.59766Z", fill: "black" })
      ]
    }
  );
}

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { lang, currentYear } = Astro2.props;
  const items = getFooterLabels(FooterText, lang);
  const social = [
    { name: "GitHub", href: "https://github.com/darmau", Icon: GithubIcon },
    { name: "X", href: "https://x.com/darmau8964", Icon: TwitterIcon },
    { name: "Instagram", href: "https://www.instagram.com/ridamoe", Icon: InstagramIcon },
    { name: "YouTube", href: "https://www.youtube.com/@darmau", Icon: YoutubeIcon }
  ];
  return renderTemplate`${maybeRenderHead()}<footer aria-labelledby="footer-heading" class="bg-white border-t border-gray-200"> <h2 id="footer-heading" class="sr-only">Footer</h2> <div class="mx-auto max-w-8xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32"> <div class="xl:grid xl:grid-cols-2 xl:gap-8"> <div> <img alt="积薪" src="/logo.svg" class="h-12 mb-4"> ${lang === "jp" && renderTemplate`<a href="https://blog.with2.net/link/?id=2136562&follow" title="人気ブログランキングでフォロー" target="_blank" rel="noreferrer"> <img alt="人気ブログランキングでフォロー" width="235" height="46" src="https://blog.with2.net/banner/follow/2136562?t=b"> </a>`} </div> <div class="my-16 grid grid-cols-2 lg:grid-cols-4 gap-8 xl:mt-0"> ${items?.map((block) => renderTemplate`<div class="flex flex-col gap-4"> <h3 class="text-sm font-semibold leading-6 text-gray-900">${block.name}</h3> ${block.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-sm leading-6 text-zinc-600 hover:text-zinc-900"> ${item.name} </a>`)} </div>`)} </div> </div> <div class="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between"> <div class="flex space-x-6 md:order-2"> <a${addAttribute(`/${lang}/rss`, "href")} class="text-gray-400 hover:text-gray-500"> <span class="sr-only">RSS</span> ${renderComponent($$result, "RSSIcon", RSSIcon, { "className": "h-6 w-6" })} </a> ${social.map(({ name, href, Icon }) => renderTemplate`<a${addAttribute(href, "href")} target="_blank" rel="noreferrer" class="text-gray-400 hover:text-gray-500"> <span class="sr-only">${name}</span> ${renderComponent($$result, "Icon", Icon, { "aria-hidden": "true", "className": "h-6 w-6" })} </a>`)} </div> ${renderComponent($$result, "NotAIIcon", NotAIIcon, { "className": "mt-8 md:order-1 md:mt-0" })} <p class="mt-8 text-xs leading-5 text-gray-500 md:order-0 md:mt-0">
© 2019 - ${currentYear} Design and Develop by 李大毛. All rights reserved.
</p> </div> </div> </footer>`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/components/Footer.astro", void 0);

const langMap = /* @__PURE__ */ new Map([
  ["en", "en"],
  ["zh", "zh-Hans"],
  ["jp", "ja"]
]);
function i18nLinks(baseUrl, currentLang, availableLangs, url) {
  const canonical = {
    tagName: "link",
    rel: "canonical",
    href: `${baseUrl}/${currentLang}/${url}`
  };
  const langs = availableLangs.filter((l) => l !== currentLang);
  const links = langs.map((l) => ({
    tagName: "link",
    rel: "alternate",
    href: `${baseUrl}/${l}/${url}`,
    hrefLang: langMap.get(l)
  }));
  const ogLocale = langs.map((l) => ({
    property: "og:locale:alternate",
    content: l
  }));
  return [canonical, ...links, ...ogLocale];
}

const SITE_AUTHOR = {
  "@type": "Person",
  name: "李大毛",
  url: "https://darmau.co",
  sameAs: [
    "https://x.com/darmau8964",
    "https://github.com/Darmau",
    "https://www.threads.com/@uedashishi",
    "https://www.youtube.com/@darmau"
  ]
};
const SITE_PUBLISHER = {
  "@type": "Organization",
  name: "李大毛的个人网站",
  url: "https://darmau.co",
  logo: {
    "@type": "ImageObject",
    url: "https://darmau.co/logo.svg"
  }
};
function generateWebsiteStructuredData(params) {
  const { baseUrl, name, alternateName, inLanguage } = params;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName: alternateName && alternateName.length > 0 ? alternateName : void 0,
    url: baseUrl,
    inLanguage,
    publisher: SITE_PUBLISHER
  };
}
function generateArticleStructuredData(params) {
  const { article, imgPrefix, lang, url } = params;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.abstract || article.subtitle || "",
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    url,
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": url }
  };
  if (article.cover) {
    structuredData.image = {
      "@type": "ImageObject",
      url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${article.cover.storage_key}`,
      width: article.cover.width,
      height: article.cover.height,
      caption: article.cover.alt || article.title
    };
  }
  if (article.category) structuredData.articleSection = article.category.title;
  if (article.topic && article.topic.length > 0) structuredData.keywords = article.topic.join(", ");
  if (article.comments && article.comments.length > 0) structuredData.commentCount = article.comments[0].count;
  if (article.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReadAction",
      userInteractionCount: article.page_view
    };
  }
  if (article.is_premium) {
    structuredData.isAccessibleForFree = false;
    structuredData.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".article-content"
    };
    structuredData.isPartOf = {
      "@type": ["CreativeWork", "Product"],
      name: "Premium Membership",
      productID: "premium-article"
    };
  } else {
    structuredData.isAccessibleForFree = true;
  }
  return structuredData;
}
function generateBreadcrumbStructuredData(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  };
}
function buildCommentsStructuredData(comments, baseUrl, articleUrl) {
  if (comments.length === 0) return [];
  return comments.map((comment) => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Comment",
      "@id": `${articleUrl}#comment-${comment.id}`,
      text: comment.content_text ?? "",
      dateCreated: comment.created_at ?? "",
      author: comment.is_anonymous ? { "@type": "Person", name: comment.name || "匿名用户" } : {
        "@type": "Person",
        name: comment.users?.name ?? "用户"
      }
    };
    if (comment.reply_to) {
      data.parentItem = {
        "@type": "Comment",
        "@id": `${articleUrl}#comment-${comment.reply_to.id}`
      };
    }
    return data;
  });
}
function generateAlbumStructuredData(params) {
  const { album, imgPrefix, lang, url } = params;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.abstract,
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: album.published_at,
    url,
    inLanguage: lang
  };
  if (album.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: album.page_view
    };
  }
  if (album.comments && album.comments.length > 0) {
    structuredData.commentCount = album.comments[0].count;
  }
  if (album.images && album.images.length > 0) {
    structuredData.associatedMedia = album.images.map((image) => {
      const imageObject = {
        "@type": "ImageObject",
        contentUrl: `${imgPrefix}/${image.storage_key}`,
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${image.storage_key}`,
        width: image.width,
        height: image.height,
        caption: image.caption || image.alt,
        name: image.alt
      };
      if (image.exif) imageObject.exifData = image.exif;
      if (image.latitude && image.longitude) {
        imageObject.contentLocation = {
          "@type": "Place",
          geo: {
            "@type": "GeoCoordinates",
            latitude: image.latitude,
            longitude: image.longitude
          },
          ...image.location ? { name: image.location } : {}
        };
      }
      return imageObject;
    });
    if (album.images[0]) {
      structuredData.image = {
        "@type": "ImageObject",
        url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${album.images[0].storage_key}`,
        width: album.images[0].width,
        height: album.images[0].height
      };
    }
  }
  return structuredData;
}
function generateThoughtStructuredData(params) {
  const { thought, imgPrefix, lang, url } = params;
  const headline = thought.content_text.slice(0, 100);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SocialMediaPosting",
    headline,
    articleBody: thought.content_text,
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    datePublished: thought.created_at,
    url,
    inLanguage: lang
  };
  if (thought.images && thought.images.length > 0) {
    structuredData.image = thought.images.length === 1 ? {
      "@type": "ImageObject",
      url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=800/${thought.images[0].storage_key}`,
      width: thought.images[0].width,
      height: thought.images[0].height,
      caption: thought.images[0].alt
    } : thought.images.map((image) => ({
      "@type": "ImageObject",
      url: `${imgPrefix}/cdn-cgi/image/format=jpeg,width=800/${image.storage_key}`,
      width: image.width,
      height: image.height,
      caption: image.alt
    }));
  }
  if (thought.page_view) {
    structuredData.interactionStatistic = {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReadAction",
      userInteractionCount: thought.page_view
    };
  }
  if (thought.comments && thought.comments.length > 0) {
    structuredData.commentCount = thought.comments[0].count;
  }
  return structuredData;
}
function generatePersonStructuredData(params) {
  const { name, description, image, url, sameAs } = params;
  return {
    "@context": "https://schema.org",
    "@type": ["WebPage", "ProfilePage"],
    url,
    mainEntity: {
      "@type": "Person",
      name,
      description,
      image: {
        "@type": "ImageObject",
        url: image.url,
        width: image.width,
        height: image.height
      },
      url,
      sameAs: sameAs ?? [
        "https://x.com/darmau8964",
        "https://github.com/Darmau",
        "https://www.threads.com/@uedashishi",
        "https://www.youtube.com/@darmau"
      ]
    }
  };
}
function serializeStructuredData(data) {
  return JSON.stringify(data);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    lang,
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = "website",
    twitterCard = "summary_large_image",
    twitterCreator = "@darmau8964",
    pathWithoutLang,
    availableLangs,
    baseUrl,
    rssHref
  } = Astro2.props;
  const SITE_NAMES = { zh: "\u79EF\u85AA", en: "Firewood", jp: "\u7A4D\u85AA" };
  const siteName = SITE_NAMES[lang] ?? "\u79EF\u85AA";
  const alternateNames = ["\u79EF\u85AA", "Firewood", "\u7A4D\u85AA", "darmau.co"].filter((n) => n !== siteName);
  const websiteJsonLd = generateWebsiteStructuredData({
    baseUrl,
    name: siteName,
    alternateName: alternateNames,
    inLanguage: lang
  });
  const links = i18nLinks(baseUrl, lang, availableLangs, pathWithoutLang);
  const canonicalUrl = `${baseUrl}/${lang}/${pathWithoutLang}`.replace(/\/$/, "");
  const ogUrl = canonicalUrl;
  const env = Astro2.locals.runtime.env;
  const session = Astro2.locals.session;
  const navbarItems = NavbarItems(lang);
  const profileLabel = getLanguageLabel(ProfileText, lang);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const user = session ? {
    id: session.user.id,
    name: session.user.user_metadata?.name,
    email: session.user.user_metadata?.email
  } : null;
  return renderTemplate(_a || (_a = __template(["<html", ' class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.ico" type="image/x-icon"><meta property="og:site_name"', '><meta name="application-name"', "><title>", "</title>", '<meta property="og:title"', ">", '<meta property="og:type"', '><meta property="og:url"', ">", '<meta property="twitter:card"', '><meta property="twitter:title"', ">", "", '<meta property="twitter:creator"', ">", "", '<script type="application/ld+json">', "<\/script>", "", '</head> <body class="min-h-screen flex flex-col relative"> ', ' <main class="flex-1 w-full mt-[76px]"> ', " ", " </main> ", " ", " </body></html>"])), addAttribute(lang, "lang"), addAttribute(siteName, "content"), addAttribute(siteName, "content"), title, description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`, addAttribute(ogTitle ?? title, "content"), ogDescription && renderTemplate`<meta property="og:description"${addAttribute(ogDescription, "content")}>`, addAttribute(ogType, "content"), addAttribute(ogUrl, "content"), ogImage && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>`, addAttribute(twitterCard, "content"), addAttribute(ogTitle ?? title, "content"), ogDescription && renderTemplate`<meta property="twitter:description"${addAttribute(ogDescription, "content")}>`, ogImage && renderTemplate`<meta property="twitter:image"${addAttribute(ogImage, "content")}>`, addAttribute(twitterCreator, "content"), rssHref && renderTemplate`<link rel="alternate" type="application/rss+xml" title="RSS"${addAttribute(rssHref, "href")}>`, links.map(
    (link) => "tagName" in link ? link.rel === "canonical" ? renderTemplate`<link rel="canonical"${addAttribute(link.href, "href")}>` : renderTemplate`<link rel="alternate"${addAttribute(link.href, "href")}${addAttribute(link.hrefLang, "hreflang")}>` : renderTemplate`<meta${addAttribute(link.property, "property")}${addAttribute(link.content, "content")}>`
  ), unescapeHTML(serializeStructuredData(websiteJsonLd)), renderSlot($$result, $$slots["head"]), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "lang": lang, "items": navbarItems, "pathname": Astro2.url.pathname, "availableLangs": availableLangs, "user": user, "profileLabel": profileLabel, "client:component-hydration": "load", "client:component-path": "~/components/Navbar.tsx", "client:component-export": "default" }), renderComponent($$result, "Banners", Banners, { "client:load": true, "lang": lang, "client:component-hydration": "load", "client:component-path": "~/components/Banners.tsx", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "lang": lang, "currentYear": currentYear }), renderComponent($$result, "AuthProvider", AuthProvider, { "client:load": true, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "serverAccessToken": session?.access_token ?? null, "client:component-hydration": "load", "client:component-path": "~/components/AuthProvider.tsx", "client:component-export": "default" }));
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/layouts/Base.astro", void 0);

export { $$Base as $, ForwardRef$1 as F, GithubIcon as G, InstagramIcon as I, TwitterIcon as T, YoutubeIcon as Y, generateArticleStructuredData as a, buildCommentsStructuredData as b, createSupabaseBrowser as c, generateBreadcrumbStructuredData as d, generatePersonStructuredData as e, generateThoughtStructuredData as f, generateAlbumStructuredData as g, jsxRuntimeExports as j, reactDomExports as r, serializeStructuredData as s, throttle as t };
