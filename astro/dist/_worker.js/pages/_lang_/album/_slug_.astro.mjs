globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, aq as unescapeHTML, ac as maybeRenderHead, _ as addAttribute } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { r as reactDomExports, j as jsxRuntimeExports, g as generateAlbumStructuredData, d as generateBreadcrumbStructuredData, b as buildCommentsStructuredData, $ as $$Base, s as serializeStructuredData } from '../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Breadcrumb, b as ContentContainer, R as Reaction, C as CommentEditor, a as $$CommentBlock, P as PageViewTracker } from '../../../chunks/PageViewTracker_DDWphovL.mjs';
import { S as ShareButton } from '../../../chunks/ShareButton_BkkCYp0x.mjs';
/* empty css                                        */
import { r as reactExports } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
import { m as mapboxgl, s as setupMapboxLanguage, A as AlbumText } from '../../../chunks/mapbox_Ct0UpL2H.mjs';
/* empty css                                     */
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { g as getTime } from '../../../chunks/getTime_CcDELrHl.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';
import { F as ForwardRef$6 } from '../../../chunks/EyeIcon_BCB1a6Md.mjs';

function CameraIcon({
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
    d: "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
  }), /*#__PURE__*/reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
  }));
}
const ForwardRef$5 = /*#__PURE__*/ reactExports.forwardRef(CameraIcon);

function VideoCameraIcon({
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
    d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const ForwardRef$4 = /*#__PURE__*/ reactExports.forwardRef(VideoCameraIcon);

function MapPinIcon({
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
    d: "m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$3 = /*#__PURE__*/ reactExports.forwardRef(MapPinIcon);

function ArrowsPointingOutIcon({
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
    fillRule: "evenodd",
    d: "M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ reactExports.forwardRef(ArrowsPointingOutIcon);

function ChevronLeftIcon({
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
    fillRule: "evenodd",
    d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ reactExports.forwardRef(ChevronLeftIcon);

function ChevronRightIcon({
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
    fillRule: "evenodd",
    d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ reactExports.forwardRef(ChevronRightIcon);

const MODULE_CAROUSEL = "carousel";
const MODULE_CONTROLLER = "controller";
const MODULE_NAVIGATION = "navigation";
const MODULE_NO_SCROLL = "no-scroll";
const MODULE_PORTAL = "portal";
const MODULE_ROOT = "root";
const MODULE_TOOLBAR = "toolbar";
const PLUGIN_CAPTIONS = "captions";
const PLUGIN_FULLSCREEN = "fullscreen";
const PLUGIN_INLINE = "inline";
const PLUGIN_THUMBNAILS = "thumbnails";
const SLIDE_STATUS_LOADING = "loading";
const SLIDE_STATUS_ERROR = "error";
const SLIDE_STATUS_COMPLETE = "complete";
const SLIDE_STATUS_PLACEHOLDER = "placeholder";
const activeSlideStatus = (status) => `active-slide-${status}`;
const CLASS_FLEX_CENTER = "flex_center";
const CLASS_NO_SCROLL = "no_scroll";
const CLASS_NO_SCROLL_PADDING = "no_scroll_padding";
const CLASS_SLIDE = "slide";
const CLASS_SLIDE_WRAPPER = "slide_wrapper";
const ACTION_PREV = "prev";
const ACTION_NEXT = "next";
const ACTION_SWIPE = "swipe";
const ACTION_CLOSE = "close";
const EVENT_ON_POINTER_DOWN = "onPointerDown";
const EVENT_ON_POINTER_MOVE = "onPointerMove";
const EVENT_ON_POINTER_UP = "onPointerUp";
const EVENT_ON_POINTER_LEAVE = "onPointerLeave";
const EVENT_ON_POINTER_CANCEL = "onPointerCancel";
const EVENT_ON_KEY_DOWN = "onKeyDown";
const EVENT_ON_KEY_UP = "onKeyUp";
const EVENT_ON_WHEEL = "onWheel";
const VK_ESCAPE = "Escape";
const VK_ARROW_LEFT = "ArrowLeft";
const VK_ARROW_RIGHT = "ArrowRight";
const ELEMENT_BUTTON = "button";
const ELEMENT_ICON = "icon";
const IMAGE_FIT_CONTAIN = "contain";
const IMAGE_FIT_COVER = "cover";
const UNKNOWN_ACTION_TYPE = "Unknown action type";

const cssPrefix$3 = "yarl__";
function clsx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function cssClass(name) {
    return `${cssPrefix$3}${name}`;
}
function cssVar(name) {
    return `--${cssPrefix$3}${name}`;
}
function composePrefix(base, prefix) {
    return `${base}${prefix ? `_${prefix}` : ""}`;
}
function makeComposePrefix(base) {
    return (prefix) => composePrefix(base, prefix);
}
function translateLabel(labels, defaultLabel) {
    var _a;
    return (_a = labels === null || labels === void 0 ? void 0 : labels[defaultLabel]) !== null && _a !== void 0 ? _a : defaultLabel;
}
function translateSlideCounter(labels, slides, index) {
    return translateLabel(labels, "{index} of {total}")
        .replace(/\{index}/g, `${getSlideIndex(index, slides.length) + 1}`)
        .replace(/\{total}/g, `${slides.length}`);
}
function cleanup(...cleaners) {
    return () => {
        cleaners.forEach((cleaner) => {
            cleaner();
        });
    };
}
function makeUseContext(name, contextName, context) {
    return () => {
        const ctx = reactExports.useContext(context);
        if (!ctx) {
            throw new Error(`${name} must be used within a ${contextName}.Provider`);
        }
        return ctx;
    };
}
function hasWindow() {
    return typeof window !== "undefined";
}
function round(value, decimals = 0) {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}
function isImageSlide(slide) {
    return slide.type === undefined || slide.type === "image";
}
function isImageFitCover(image, imageFit) {
    return image.imageFit === IMAGE_FIT_COVER || (image.imageFit !== IMAGE_FIT_CONTAIN && imageFit === IMAGE_FIT_COVER);
}
function parseInt$1(value) {
    return typeof value === "string" ? Number.parseInt(value, 10) : value;
}
function parseLengthPercentage(input) {
    if (typeof input === "number") {
        return { pixel: input };
    }
    if (typeof input === "string") {
        const value = parseInt$1(input);
        return input.endsWith("%") ? { percent: value } : { pixel: value };
    }
    return { pixel: 0 };
}
function computeSlideRect(containerRect, padding) {
    const paddingValue = parseLengthPercentage(padding);
    const paddingPixels = paddingValue.percent !== undefined ? (containerRect.width / 100) * paddingValue.percent : paddingValue.pixel;
    return {
        width: Math.max(containerRect.width - 2 * paddingPixels, 0),
        height: Math.max(containerRect.height - 2 * paddingPixels, 0),
    };
}
function getSlideIndex(index, slidesCount) {
    return slidesCount > 0 ? ((index % slidesCount) + slidesCount) % slidesCount : 0;
}
function hasSlides(slides) {
    return slides.length > 0;
}
function getSlide(slides, index) {
    return slides[getSlideIndex(index, slides.length)];
}
function getSlideIfPresent(slides, index) {
    return hasSlides(slides) ? getSlide(slides, index) : undefined;
}
function getSlideKey(slide) {
    return isImageSlide(slide) ? slide.src : undefined;
}
function addToolbarButton(toolbar, key, button) {
    if (!button)
        return toolbar;
    const { buttons, ...restToolbar } = toolbar;
    const index = buttons.findIndex((item) => item === key);
    const buttonWithKey = reactExports.isValidElement(button) ? reactExports.cloneElement(button, { key }, null) : button;
    if (index >= 0) {
        const result = [...buttons];
        result.splice(index, 1, buttonWithKey);
        return { buttons: result, ...restToolbar };
    }
    return { buttons: [buttonWithKey, ...buttons], ...restToolbar };
}
function calculatePreload(carousel, slides, minimum = 0) {
    return Math.min(carousel.preload, Math.max(carousel.finite ? slides.length - 1 : Math.floor(slides.length / 2), minimum));
}
const isReact19 = Number(reactExports.version.split(".")[0]) >= 19;
function makeInertWhen(condition) {
    const legacyValue = condition ? "" : undefined;
    return { inert: isReact19 ? condition : legacyValue };
}
function reflow(node) {
    node.scrollTop;
}

const LightboxDefaultProps = {
    open: false,
    close: () => { },
    index: 0,
    slides: [],
    render: {},
    plugins: [],
    toolbar: { buttons: [ACTION_CLOSE] },
    labels: {},
    animation: {
        fade: 250,
        swipe: 500,
        easing: {
            fade: "ease",
            swipe: "ease-out",
            navigation: "ease-in-out",
        },
    },
    carousel: {
        finite: false,
        preload: 2,
        padding: "16px",
        spacing: "30%",
        imageFit: IMAGE_FIT_CONTAIN,
        imageProps: {},
    },
    controller: {
        ref: null,
        focus: true,
        aria: false,
        touchAction: "none",
        closeOnPullUp: false,
        closeOnPullDown: false,
        closeOnBackdropClick: false,
        closeOnEscape: true,
        preventDefaultWheelX: true,
        preventDefaultWheelY: false,
        disableSwipeNavigation: false,
    },
    portal: {},
    noScroll: {
        disabled: false,
    },
    on: {},
    styles: {},
    className: "",
};

function createModule(name, component) {
    return { name, component };
}
function createNode(module, children) {
    return { module, children };
}
function traverseNode(node, target, apply) {
    if (node.module.name === target) {
        return apply(node);
    }
    if (node.children) {
        return [
            createNode(node.module, node.children.flatMap((n) => { var _a; return (_a = traverseNode(n, target, apply)) !== null && _a !== void 0 ? _a : []; })),
        ];
    }
    return [node];
}
function traverse(nodes, target, apply) {
    return nodes.flatMap((node) => { var _a; return (_a = traverseNode(node, target, apply)) !== null && _a !== void 0 ? _a : []; });
}
function withPlugins(root, plugins = [], augmentations = []) {
    let config = root;
    const contains = (target) => {
        const nodes = [...config];
        while (nodes.length > 0) {
            const node = nodes.pop();
            if ((node === null || node === void 0 ? void 0 : node.module.name) === target)
                return true;
            if (node === null || node === void 0 ? void 0 : node.children)
                nodes.push(...node.children);
        }
        return false;
    };
    const addParent = (target, module) => {
        if (target === "") {
            config = [createNode(module, config)];
            return;
        }
        config = traverse(config, target, (node) => [createNode(module, [node])]);
    };
    const append = (target, module) => {
        config = traverse(config, target, (node) => [createNode(node.module, [createNode(module, node.children)])]);
    };
    const addChild = (target, module, precede) => {
        config = traverse(config, target, (node) => {
            var _a;
            return [
                createNode(node.module, [
                    ...(precede ? [createNode(module)] : []),
                    ...((_a = node.children) !== null && _a !== void 0 ? _a : []),
                    ...(!precede ? [createNode(module)] : []),
                ]),
            ];
        });
    };
    const addSibling = (target, module, precede) => {
        config = traverse(config, target, (node) => [
            ...(precede ? [createNode(module)] : []),
            node,
            ...(!precede ? [createNode(module)] : []),
        ]);
    };
    const addModule = (module) => {
        append(MODULE_CONTROLLER, module);
    };
    const replace = (target, module) => {
        config = traverse(config, target, (node) => [createNode(module, node.children)]);
    };
    const remove = (target) => {
        config = traverse(config, target, (node) => node.children);
    };
    const augment = (augmentation) => {
        augmentations.push(augmentation);
    };
    plugins.forEach((plugin) => {
        plugin({
            contains,
            addParent,
            append,
            addChild,
            addSibling,
            addModule,
            replace,
            remove,
            augment,
        });
    });
    return {
        config,
        augmentation: (props) => augmentations.reduce((acc, augmentation) => augmentation(acc), props),
    };
}

const A11yContext = reactExports.createContext(null);
const useA11yContext = makeUseContext("useA11yContext", "A11yContext", A11yContext);
function A11yContextProvider({ children }) {
    const [focusWithin, setFocusWithin] = reactExports.useState(false);
    const [autoPlaying, setAutoPlaying] = reactExports.useState(false);
    const context = reactExports.useMemo(() => {
        const trackFocusWithin = (onFocus, onBlur) => {
            const trackAndDelegate = (focusWithinValue) => (event) => {
                var _a;
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setFocusWithin(focusWithinValue);
                }
                (_a = (focusWithinValue ? onFocus : onBlur)) === null || _a === void 0 ? void 0 : _a(event);
            };
            return {
                onFocus: trackAndDelegate(true),
                onBlur: trackAndDelegate(false),
            };
        };
        return { focusWithin, trackFocusWithin, autoPlaying, setAutoPlaying };
    }, [focusWithin, autoPlaying]);
    return reactExports.createElement(A11yContext.Provider, { value: context }, children);
}

const DocumentContext = reactExports.createContext(null);
const useDocumentContext = makeUseContext("useDocument", "DocumentContext", DocumentContext);
function DocumentContextProvider({ nodeRef, children }) {
    const context = reactExports.useMemo(() => {
        const getOwnerDocument = (node) => { var _a; return ((_a = (node || nodeRef.current)) === null || _a === void 0 ? void 0 : _a.ownerDocument) || document; };
        const getOwnerWindow = (node) => { var _a; return ((_a = getOwnerDocument(node)) === null || _a === void 0 ? void 0 : _a.defaultView) || window; };
        return { getOwnerDocument, getOwnerWindow };
    }, [nodeRef]);
    return reactExports.createElement(DocumentContext.Provider, { value: context }, children);
}

const EventsContext = reactExports.createContext(null);
const useEvents = makeUseContext("useEvents", "EventsContext", EventsContext);
function EventsProvider({ children }) {
    const [subscriptions] = reactExports.useState({});
    reactExports.useEffect(() => () => {
        Object.keys(subscriptions).forEach((topic) => delete subscriptions[topic]);
    }, [subscriptions]);
    const context = reactExports.useMemo(() => {
        const unsubscribe = (topic, callback) => {
            var _a;
            (_a = subscriptions[topic]) === null || _a === void 0 ? void 0 : _a.splice(0, subscriptions[topic].length, ...subscriptions[topic].filter((cb) => cb !== callback));
        };
        const subscribe = (topic, callback) => {
            if (!subscriptions[topic]) {
                subscriptions[topic] = [];
            }
            subscriptions[topic].push(callback);
            return () => unsubscribe(topic, callback);
        };
        const publish = (...[topic, event]) => {
            var _a;
            (_a = subscriptions[topic]) === null || _a === void 0 ? void 0 : _a.forEach((callback) => callback(event));
        };
        return { publish, subscribe, unsubscribe };
    }, [subscriptions]);
    return reactExports.createElement(EventsContext.Provider, { value: context }, children);
}

const LightboxPropsContext = reactExports.createContext(null);
const useLightboxProps = makeUseContext("useLightboxProps", "LightboxPropsContext", LightboxPropsContext);
function LightboxPropsProvider({ children, ...props }) {
    return reactExports.createElement(LightboxPropsContext.Provider, { value: props }, children);
}

const LightboxStateContext = reactExports.createContext(null);
const useLightboxState = makeUseContext("useLightboxState", "LightboxStateContext", LightboxStateContext);
const LightboxDispatchContext = reactExports.createContext(null);
const useLightboxDispatch = makeUseContext("useLightboxDispatch", "LightboxDispatchContext", LightboxDispatchContext);
function reducer(state, action) {
    switch (action.type) {
        case "swipe": {
            const { slides } = state;
            const increment = (action === null || action === void 0 ? void 0 : action.increment) || 0;
            const globalIndex = state.globalIndex + increment;
            const currentIndex = getSlideIndex(globalIndex, slides.length);
            const currentSlide = getSlideIfPresent(slides, currentIndex);
            const animation = increment || action.duration !== undefined
                ? {
                    increment,
                    duration: action.duration,
                    easing: action.easing,
                }
                : undefined;
            return { slides, currentIndex, globalIndex, currentSlide, animation };
        }
        case "update":
            if (action.slides !== state.slides || action.index !== state.currentIndex) {
                return {
                    slides: action.slides,
                    currentIndex: action.index,
                    globalIndex: action.index,
                    currentSlide: getSlideIfPresent(action.slides, action.index),
                };
            }
            return state;
        default:
            throw new Error(UNKNOWN_ACTION_TYPE);
    }
}
function LightboxStateProvider({ slides, index, children }) {
    const [state, dispatch] = reactExports.useReducer(reducer, {
        slides,
        currentIndex: index,
        globalIndex: index,
        currentSlide: getSlideIfPresent(slides, index),
    });
    const [prevSlides, setPrevSlides] = reactExports.useState(slides);
    const [prevIndex, setPrevIndex] = reactExports.useState(index);
    if (slides !== prevSlides || index !== prevIndex) {
        setPrevSlides(slides);
        setPrevIndex(index);
        dispatch({ type: "update", slides, index });
    }
    const context = reactExports.useMemo(() => ({ ...state, state, dispatch }), [state, dispatch]);
    return (reactExports.createElement(LightboxDispatchContext.Provider, { value: dispatch },
        reactExports.createElement(LightboxStateContext.Provider, { value: context }, children)));
}

const RTLContext = reactExports.createContext(null);
const useRTLContext = makeUseContext("useRTLContext", "RTLContext", RTLContext);
function RTLContextProvider({ isRTL, children }) {
    const context = reactExports.useMemo(() => ({ isRTL }), [isRTL]);
    return reactExports.createElement(RTLContext.Provider, { value: context }, children);
}

const TimeoutsContext = reactExports.createContext(null);
const useTimeouts = makeUseContext("useTimeouts", "TimeoutsContext", TimeoutsContext);
function TimeoutsProvider({ children }) {
    const [timeouts] = reactExports.useState([]);
    reactExports.useEffect(() => () => {
        timeouts.forEach((tid) => window.clearTimeout(tid));
        timeouts.splice(0, timeouts.length);
    }, [timeouts]);
    const context = reactExports.useMemo(() => {
        const removeTimeout = (id) => {
            timeouts.splice(0, timeouts.length, ...timeouts.filter((tid) => tid !== id));
        };
        const setTimeout = (fn, delay) => {
            const id = window.setTimeout(() => {
                removeTimeout(id);
                fn();
            }, delay);
            timeouts.push(id);
            return id;
        };
        const clearTimeout = (id) => {
            if (id !== undefined) {
                removeTimeout(id);
                window.clearTimeout(id);
            }
        };
        return { setTimeout, clearTimeout };
    }, [timeouts]);
    return reactExports.createElement(TimeoutsContext.Provider, { value: context }, children);
}

const IconButton = reactExports.forwardRef(function IconButton({ label, className, icon: Icon, renderIcon, onClick, style, ...rest }, ref) {
    const { styles, labels } = useLightboxProps();
    const buttonLabel = translateLabel(labels, label);
    return (reactExports.createElement("button", { ref: ref, type: "button", title: buttonLabel, "aria-label": buttonLabel, className: clsx(cssClass(ELEMENT_BUTTON), className), onClick: onClick, style: { ...style, ...styles.button }, ...rest }, renderIcon ? renderIcon() : reactExports.createElement(Icon, { className: cssClass(ELEMENT_ICON), style: styles.icon })));
});

function svgIcon(name, children) {
    const icon = (props) => (reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24", "aria-hidden": "true", focusable: "false", ...props }, children));
    icon.displayName = name;
    return icon;
}
function createIcon(name, glyph) {
    return svgIcon(name, reactExports.createElement("g", { fill: "currentColor" },
        reactExports.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
        glyph));
}
function createIconDisabled(name, glyph) {
    return svgIcon(name, reactExports.createElement(reactExports.Fragment, null,
        reactExports.createElement("defs", null,
            reactExports.createElement("mask", { id: "strike" },
                reactExports.createElement("path", { d: "M0 0h24v24H0z", fill: "white" }),
                reactExports.createElement("path", { d: "M0 0L24 24", stroke: "black", strokeWidth: 4 }))),
        reactExports.createElement("path", { d: "M0.70707 2.121320L21.878680 23.292883", stroke: "currentColor", strokeWidth: 2 }),
        reactExports.createElement("g", { fill: "currentColor", mask: "url(#strike)" },
            reactExports.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
            glyph)));
}
const CloseIcon = createIcon("Close", reactExports.createElement("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }));
const PreviousIcon = createIcon("Previous", reactExports.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }));
const NextIcon = createIcon("Next", reactExports.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }));
const LoadingIcon = createIcon("Loading", reactExports.createElement(reactExports.Fragment, null, Array.from({ length: 8 }).map((_, index, array) => (reactExports.createElement("line", { key: index, x1: "12", y1: "6.5", x2: "12", y2: "1.8", strokeLinecap: "round", strokeWidth: "2.6", stroke: "currentColor", strokeOpacity: (1 / array.length) * (index + 1), transform: `rotate(${(360 / array.length) * index}, 12, 12)` })))));
const ErrorIcon = createIcon("Error", reactExports.createElement("path", { d: "M21.9,21.9l-8.49-8.49l0,0L3.59,3.59l0,0L2.1,2.1L0.69,3.51L3,5.83V19c0,1.1,0.9,2,2,2h13.17l2.31,2.31L21.9,21.9z M5,18 l3.5-4.5l2.5,3.01L12.17,15l3,3H5z M21,18.17L5.83,3H19c1.1,0,2,0.9,2,2V18.17z" }));

const useLayoutEffect = hasWindow() ? reactExports.useLayoutEffect : reactExports.useEffect;

function useMotionPreference() {
    const [reduceMotion, setReduceMotion] = reactExports.useState(false);
    reactExports.useEffect(() => {
        var _a, _b;
        const mediaQuery = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)");
        setReduceMotion(mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches);
        const listener = (event) => setReduceMotion(event.matches);
        (_b = mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.addEventListener) === null || _b === void 0 ? void 0 : _b.call(mediaQuery, "change", listener);
        return () => { var _a; return (_a = mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.removeEventListener) === null || _a === void 0 ? void 0 : _a.call(mediaQuery, "change", listener); };
    }, []);
    return reduceMotion;
}

function currentTransformation(node) {
    let x = 0;
    let y = 0;
    let z = 0;
    const matrix = window.getComputedStyle(node).transform;
    const matcher = matrix.match(/matrix.*\((.+)\)/);
    if (matcher) {
        const values = matcher[1].split(",").map(parseInt$1);
        if (values.length === 6) {
            x = values[4];
            y = values[5];
        }
        else if (values.length === 16) {
            x = values[12];
            y = values[13];
            z = values[14];
        }
    }
    return { x, y, z };
}
function useAnimation(nodeRef, computeAnimation) {
    const snapshot = reactExports.useRef(undefined);
    const animation = reactExports.useRef(undefined);
    const reduceMotion = useMotionPreference();
    useLayoutEffect(() => {
        var _a, _b, _c;
        if (nodeRef.current && snapshot.current !== undefined && !reduceMotion) {
            const { keyframes, duration, easing, onfinish } = computeAnimation(snapshot.current, nodeRef.current.getBoundingClientRect(), currentTransformation(nodeRef.current)) || {};
            if (keyframes && duration) {
                (_a = animation.current) === null || _a === void 0 ? void 0 : _a.cancel();
                animation.current = undefined;
                try {
                    animation.current = (_c = (_b = nodeRef.current).animate) === null || _c === void 0 ? void 0 : _c.call(_b, keyframes, { duration, easing });
                }
                catch (err) {
                    console.error(err);
                }
                if (animation.current) {
                    animation.current.onfinish = () => {
                        animation.current = undefined;
                        onfinish === null || onfinish === void 0 ? void 0 : onfinish();
                    };
                }
            }
        }
        snapshot.current = undefined;
    });
    return {
        prepareAnimation: (currentSnapshot) => {
            snapshot.current = currentSnapshot;
        },
        isAnimationPlaying: () => { var _a; return ((_a = animation.current) === null || _a === void 0 ? void 0 : _a.playState) === "running"; },
    };
}

function useContainerRect() {
    const containerRef = reactExports.useRef(null);
    const observerRef = reactExports.useRef(undefined);
    const [containerRect, setContainerRect] = reactExports.useState();
    const setContainerRef = reactExports.useCallback((node) => {
        containerRef.current = node;
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = undefined;
        }
        const updateContainerRect = () => {
            if (node) {
                const styles = window.getComputedStyle(node);
                const parse = (value) => parseFloat(value) || 0;
                setContainerRect({
                    width: Math.round(node.clientWidth - parse(styles.paddingLeft) - parse(styles.paddingRight)),
                    height: Math.round(node.clientHeight - parse(styles.paddingTop) - parse(styles.paddingBottom)),
                });
            }
            else {
                setContainerRect(undefined);
            }
        };
        updateContainerRect();
        if (node && typeof ResizeObserver !== "undefined") {
            observerRef.current = new ResizeObserver(updateContainerRect);
            observerRef.current.observe(node);
        }
    }, []);
    return { setContainerRef, containerRef, containerRect };
}

function useDelay() {
    const timeoutId = reactExports.useRef(undefined);
    const { setTimeout, clearTimeout } = useTimeouts();
    return reactExports.useCallback((callback, delay) => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(callback, delay > 0 ? delay : 0);
    }, [setTimeout, clearTimeout]);
}

function useEventCallback(fn) {
    const ref = reactExports.useRef(fn);
    useLayoutEffect(() => {
        ref.current = fn;
    });
    return reactExports.useCallback((...args) => { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref, ...args); }, []);
}

function setRef(ref, value) {
    if (typeof ref === "function") {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
}
function useForkRef(refA, refB) {
    return reactExports.useMemo(() => refA == null && refB == null
        ? null
        : (refValue) => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        }, [refA, refB]);
}

function useLoseFocus(focus, disabled = false) {
    const focused = reactExports.useRef(false);
    useLayoutEffect(() => {
        if (disabled && focused.current) {
            focused.current = false;
            focus();
        }
    }, [disabled, focus]);
    const onFocus = reactExports.useCallback(() => {
        focused.current = true;
    }, []);
    const onBlur = reactExports.useCallback(() => {
        focused.current = false;
    }, []);
    return { onFocus, onBlur };
}

function useRTL() {
    return useRTLContext().isRTL;
}

function useSensors() {
    const [subscribers] = reactExports.useState({});
    const notifySubscribers = reactExports.useCallback((type, event) => {
        var _a;
        (_a = subscribers[type]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => {
            if (!event.isPropagationStopped())
                listener(event);
        });
    }, [subscribers]);
    const registerSensors = reactExports.useMemo(() => ({
        onPointerDown: (event) => notifySubscribers(EVENT_ON_POINTER_DOWN, event),
        onPointerMove: (event) => notifySubscribers(EVENT_ON_POINTER_MOVE, event),
        onPointerUp: (event) => notifySubscribers(EVENT_ON_POINTER_UP, event),
        onPointerLeave: (event) => notifySubscribers(EVENT_ON_POINTER_LEAVE, event),
        onPointerCancel: (event) => notifySubscribers(EVENT_ON_POINTER_CANCEL, event),
        onKeyDown: (event) => notifySubscribers(EVENT_ON_KEY_DOWN, event),
        onKeyUp: (event) => notifySubscribers(EVENT_ON_KEY_UP, event),
        onWheel: (event) => notifySubscribers(EVENT_ON_WHEEL, event),
    }), [notifySubscribers]);
    const subscribeSensors = reactExports.useCallback((type, callback) => {
        if (!subscribers[type]) {
            subscribers[type] = [];
        }
        subscribers[type].unshift(callback);
        return () => {
            const listeners = subscribers[type];
            if (listeners) {
                listeners.splice(0, listeners.length, ...listeners.filter((el) => el !== callback));
            }
        };
    }, [subscribers]);
    return { registerSensors, subscribeSensors };
}

function useThrottle(callback, delay) {
    const lastCallbackTime = reactExports.useRef(0);
    const delayCallback = useDelay();
    const executeCallback = useEventCallback((...args) => {
        lastCallbackTime.current = Date.now();
        callback(args);
    });
    return reactExports.useCallback((...args) => {
        delayCallback(() => {
            executeCallback(args);
        }, delay - (Date.now() - lastCallbackTime.current));
    }, [delay, executeCallback, delayCallback]);
}

const slidePrefix = makeComposePrefix("slide");
const slideImagePrefix = makeComposePrefix("slide_image");
function ImageSlide({ slide: image, offset, render, rect, imageFit, imageProps, onClick, onLoad, onError, style, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [status, setStatus] = reactExports.useState(SLIDE_STATUS_LOADING);
    const { publish } = useEvents();
    const { setTimeout } = useTimeouts();
    const imageRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (offset === 0) {
            publish(activeSlideStatus(status));
        }
    }, [offset, status, publish]);
    const handleLoading = useEventCallback((img) => {
        ("decode" in img ? img.decode() : Promise.resolve())
            .catch(() => { })
            .then(() => {
            if (!img.parentNode) {
                return;
            }
            setStatus(SLIDE_STATUS_COMPLETE);
            setTimeout(() => {
                onLoad === null || onLoad === void 0 ? void 0 : onLoad(img);
            }, 0);
        });
    });
    const setImageRef = reactExports.useCallback((img) => {
        imageRef.current = img;
        if (img === null || img === void 0 ? void 0 : img.complete) {
            handleLoading(img);
        }
    }, [handleLoading]);
    const handleOnLoad = reactExports.useCallback((event) => {
        handleLoading(event.currentTarget);
    }, [handleLoading]);
    const handleOnError = useEventCallback(() => {
        setStatus(SLIDE_STATUS_ERROR);
        onError === null || onError === void 0 ? void 0 : onError();
    });
    const cover = isImageFitCover(image, imageFit);
    const nonInfinite = (value, fallback) => (Number.isFinite(value) ? value : fallback);
    const maxWidth = nonInfinite(Math.max(...((_b = (_a = image.srcSet) === null || _a === void 0 ? void 0 : _a.map((x) => x.width)) !== null && _b !== void 0 ? _b : []).concat(image.width ? [image.width] : []).filter(Boolean)), ((_c = imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalWidth) || 0);
    const maxHeight = nonInfinite(Math.max(...((_e = (_d = image.srcSet) === null || _d === void 0 ? void 0 : _d.map((x) => x.height)) !== null && _e !== void 0 ? _e : []).concat(image.height ? [image.height] : []).filter(Boolean)), ((_f = imageRef.current) === null || _f === void 0 ? void 0 : _f.naturalHeight) || 0);
    const defaultStyle = maxWidth && maxHeight
        ? {
            maxWidth: `min(${maxWidth}px, 100%)`,
            maxHeight: `min(${maxHeight}px, 100%)`,
        }
        : {
            maxWidth: "100%",
            maxHeight: "100%",
        };
    const srcSet = (_g = image.srcSet) === null || _g === void 0 ? void 0 : _g.slice().sort((a, b) => a.width - b.width).map((item) => `${item.src} ${item.width}w`).join(", ");
    const estimateActualWidth = () => rect && !cover && image.width && image.height ? (rect.height / image.height) * image.width : Number.MAX_VALUE;
    const sizes = srcSet && rect && hasWindow() ? `${Math.round(Math.min(estimateActualWidth(), rect.width))}px` : undefined;
    const { style: imagePropsStyle, className: imagePropsClassName, ...restImageProps } = (typeof imageProps === "function" ? imageProps(image) : imageProps) || {};
    return (reactExports.createElement(reactExports.Fragment, null,
        reactExports.createElement("img", { ref: setImageRef, onLoad: handleOnLoad, onError: handleOnError, onClick: onClick, draggable: false, className: clsx(cssClass(slideImagePrefix()), cover && cssClass(slideImagePrefix("cover")), status !== SLIDE_STATUS_COMPLETE && cssClass(slideImagePrefix("loading")), imagePropsClassName), style: { ...defaultStyle, ...style, ...imagePropsStyle }, ...restImageProps, alt: (_h = image.alt) !== null && _h !== void 0 ? _h : "", sizes: sizes, srcSet: srcSet, src: image.src }),
        status !== SLIDE_STATUS_COMPLETE && (reactExports.createElement("div", { className: cssClass(slidePrefix(SLIDE_STATUS_PLACEHOLDER)) },
            status === SLIDE_STATUS_LOADING &&
                ((render === null || render === void 0 ? void 0 : render.iconLoading) ? (render.iconLoading()) : (reactExports.createElement(LoadingIcon, { className: clsx(cssClass(ELEMENT_ICON), cssClass(slidePrefix(SLIDE_STATUS_LOADING))) }))),
            status === SLIDE_STATUS_ERROR &&
                ((render === null || render === void 0 ? void 0 : render.iconError) ? (render.iconError()) : (reactExports.createElement(ErrorIcon, { className: clsx(cssClass(ELEMENT_ICON), cssClass(slidePrefix(SLIDE_STATUS_ERROR))) })))))));
}

const LightboxRoot = reactExports.forwardRef(function LightboxRoot({ className, children, onFocus, onBlur, ...rest }, ref) {
    const nodeRef = reactExports.useRef(null);
    const [isRTL, setIsRTL] = reactExports.useState(false);
    const { trackFocusWithin } = useA11yContext();
    const detectRTL = useEventCallback(() => {
        if (nodeRef.current) {
            const rtl = window.getComputedStyle(nodeRef.current).direction === "rtl";
            if (rtl !== isRTL) {
                setIsRTL(rtl);
            }
        }
    });
    reactExports.useEffect(detectRTL);
    return (reactExports.createElement(DocumentContextProvider, { nodeRef: nodeRef },
        reactExports.createElement(RTLContextProvider, { isRTL: isRTL },
            reactExports.createElement("div", { ref: useForkRef(ref, nodeRef), className: clsx(cssClass("root"), className), ...trackFocusWithin(onFocus, onBlur), ...rest }, children))));
});

var SwipeState;
(function (SwipeState) {
    SwipeState[SwipeState["NONE"] = 0] = "NONE";
    SwipeState[SwipeState["SWIPE"] = 1] = "SWIPE";
    SwipeState[SwipeState["PULL"] = 2] = "PULL";
    SwipeState[SwipeState["ANIMATION"] = 3] = "ANIMATION";
})(SwipeState || (SwipeState = {}));

function usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled) {
    reactExports.useEffect(() => cleanup(subscribeSensors(EVENT_ON_POINTER_DOWN, onPointerDown), subscribeSensors(EVENT_ON_POINTER_MOVE, onPointerMove), subscribeSensors(EVENT_ON_POINTER_UP, onPointerUp), subscribeSensors(EVENT_ON_POINTER_LEAVE, onPointerUp), subscribeSensors(EVENT_ON_POINTER_CANCEL, onPointerUp))
        , [subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled]);
}

var Gesture;
(function (Gesture) {
    Gesture[Gesture["NONE"] = 0] = "NONE";
    Gesture[Gesture["SWIPE"] = 1] = "SWIPE";
    Gesture[Gesture["PULL"] = 2] = "PULL";
})(Gesture || (Gesture = {}));
const SWIPE_THRESHOLD = 30;
function usePointerSwipe({ disableSwipeNavigation, closeOnBackdropClick }, subscribeSensors, isSwipeValid, containerWidth, swipeAnimationDuration, onSwipeStart, onSwipeProgress, onSwipeFinish, onSwipeCancel, pullUpEnabled, pullDownEnabled, onPullStart, onPullProgress, onPullFinish, onPullCancel, onClose) {
    const offset = reactExports.useRef(0);
    const pointers = reactExports.useRef([]);
    const activePointer = reactExports.useRef(undefined);
    const startTime = reactExports.useRef(0);
    const gesture = reactExports.useRef(Gesture.NONE);
    const clearPointer = reactExports.useCallback((event) => {
        if (activePointer.current === event.pointerId) {
            activePointer.current = undefined;
            gesture.current = Gesture.NONE;
        }
        const currentPointers = pointers.current;
        currentPointers.splice(0, currentPointers.length, ...currentPointers.filter((p) => p.pointerId !== event.pointerId));
    }, []);
    const addPointer = reactExports.useCallback((event) => {
        clearPointer(event);
        event.persist();
        pointers.current.push(event);
    }, [clearPointer]);
    const lookupPointer = reactExports.useCallback((event) => pointers.current.find(({ pointerId }) => event.pointerId === pointerId), []);
    const onPointerDown = useEventCallback((event) => {
        addPointer(event);
    });
    const exceedsPullThreshold = (value, threshold) => (pullDownEnabled && value > threshold) || (pullUpEnabled && value < -threshold);
    const onPointerUp = useEventCallback((event) => {
        const pointer = lookupPointer(event);
        if (pointer) {
            if (activePointer.current === event.pointerId) {
                const duration = Date.now() - startTime.current;
                const currentOffset = offset.current;
                if (gesture.current === Gesture.SWIPE) {
                    if (Math.abs(currentOffset) > 0.3 * containerWidth ||
                        (Math.abs(currentOffset) > 5 && duration < swipeAnimationDuration)) {
                        onSwipeFinish(currentOffset, duration);
                    }
                    else {
                        onSwipeCancel(currentOffset);
                    }
                }
                else if (gesture.current === Gesture.PULL) {
                    if (exceedsPullThreshold(currentOffset, 2 * SWIPE_THRESHOLD)) {
                        onPullFinish(currentOffset, duration);
                    }
                    else {
                        onPullCancel(currentOffset);
                    }
                }
                offset.current = 0;
                gesture.current = Gesture.NONE;
            }
            else {
                const { target } = event;
                if (closeOnBackdropClick &&
                    target instanceof HTMLElement &&
                    target === pointer.target &&
                    (target.classList.contains(cssClass(CLASS_SLIDE)) || target.classList.contains(cssClass(CLASS_SLIDE_WRAPPER)))) {
                    onClose();
                }
            }
        }
        clearPointer(event);
    });
    const onPointerMove = useEventCallback((event) => {
        const pointer = lookupPointer(event);
        if (pointer) {
            const isCurrentPointer = activePointer.current === event.pointerId;
            if (event.buttons === 0) {
                if (isCurrentPointer && offset.current !== 0) {
                    onPointerUp(event);
                }
                else {
                    clearPointer(pointer);
                }
                return;
            }
            const deltaX = event.clientX - pointer.clientX;
            const deltaY = event.clientY - pointer.clientY;
            if (activePointer.current === undefined) {
                const startGesture = (newGesture) => {
                    addPointer(event);
                    activePointer.current = event.pointerId;
                    startTime.current = Date.now();
                    gesture.current = newGesture;
                };
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && isSwipeValid(deltaX)) {
                    if (!disableSwipeNavigation) {
                        startGesture(Gesture.SWIPE);
                        onSwipeStart();
                    }
                }
                else if (Math.abs(deltaY) > Math.abs(deltaX) && exceedsPullThreshold(deltaY, SWIPE_THRESHOLD)) {
                    startGesture(Gesture.PULL);
                    onPullStart();
                }
            }
            else if (isCurrentPointer) {
                if (gesture.current === Gesture.SWIPE) {
                    offset.current = deltaX;
                    onSwipeProgress(deltaX);
                }
                else if (gesture.current === Gesture.PULL) {
                    offset.current = deltaY;
                    onPullProgress(deltaY);
                }
            }
        }
    });
    usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp);
}

function usePreventWheelDefaults({ preventDefaultWheelX, preventDefaultWheelY, }) {
    const ref = reactExports.useRef(null);
    const listener = useEventCallback((event) => {
        const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
        if ((horizontal && preventDefaultWheelX) || (!horizontal && preventDefaultWheelY) || event.ctrlKey) {
            event.preventDefault();
        }
    });
    return reactExports.useCallback((node) => {
        var _a;
        if (node) {
            node.addEventListener("wheel", listener, { passive: false });
        }
        else {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("wheel", listener);
        }
        ref.current = node;
    }, [listener]);
}

function useWheelSwipe(swipeState, subscribeSensors, isSwipeValid, containerWidth, swipeAnimationDuration, onSwipeStart, onSwipeProgress, onSwipeFinish, onSwipeCancel) {
    const offset = reactExports.useRef(0);
    const intent = reactExports.useRef(0);
    const intentCleanup = reactExports.useRef(undefined);
    const resetCleanup = reactExports.useRef(undefined);
    const wheelInertia = reactExports.useRef(0);
    const wheelInertiaCleanup = reactExports.useRef(undefined);
    const startTime = reactExports.useRef(0);
    const { setTimeout, clearTimeout } = useTimeouts();
    const cancelSwipeIntentCleanup = reactExports.useCallback(() => {
        if (intentCleanup.current) {
            clearTimeout(intentCleanup.current);
            intentCleanup.current = undefined;
        }
    }, [clearTimeout]);
    const cancelSwipeResetCleanup = reactExports.useCallback(() => {
        if (resetCleanup.current) {
            clearTimeout(resetCleanup.current);
            resetCleanup.current = undefined;
        }
    }, [clearTimeout]);
    const handleCleanup = useEventCallback(() => {
        if (swipeState !== SwipeState.SWIPE) {
            offset.current = 0;
            startTime.current = 0;
            cancelSwipeIntentCleanup();
            cancelSwipeResetCleanup();
        }
    });
    reactExports.useEffect(handleCleanup, [swipeState, handleCleanup]);
    const handleCancelSwipe = useEventCallback((currentSwipeOffset) => {
        resetCleanup.current = undefined;
        if (offset.current === currentSwipeOffset) {
            onSwipeCancel(offset.current);
        }
    });
    const onWheel = useEventCallback((event) => {
        if (event.ctrlKey) {
            return;
        }
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            return;
        }
        const setWheelInertia = (inertia) => {
            wheelInertia.current = inertia;
            clearTimeout(wheelInertiaCleanup.current);
            wheelInertiaCleanup.current =
                inertia > 0
                    ? setTimeout(() => {
                        wheelInertia.current = 0;
                        wheelInertiaCleanup.current = undefined;
                    }, 300)
                    : undefined;
        };
        if (swipeState === SwipeState.NONE) {
            if (Math.abs(event.deltaX) <= 1.2 * Math.abs(wheelInertia.current)) {
                setWheelInertia(event.deltaX);
                return;
            }
            if (!isSwipeValid(-event.deltaX)) {
                return;
            }
            intent.current += event.deltaX;
            cancelSwipeIntentCleanup();
            if (Math.abs(intent.current) > 30) {
                intent.current = 0;
                setWheelInertia(0);
                startTime.current = Date.now();
                onSwipeStart();
            }
            else {
                const currentSwipeIntent = intent.current;
                intentCleanup.current = setTimeout(() => {
                    intentCleanup.current = undefined;
                    if (currentSwipeIntent === intent.current) {
                        intent.current = 0;
                    }
                }, swipeAnimationDuration);
            }
        }
        else if (swipeState === SwipeState.SWIPE) {
            let newSwipeOffset = offset.current - event.deltaX;
            newSwipeOffset = Math.min(Math.abs(newSwipeOffset), containerWidth) * Math.sign(newSwipeOffset);
            offset.current = newSwipeOffset;
            onSwipeProgress(newSwipeOffset);
            cancelSwipeResetCleanup();
            if (Math.abs(newSwipeOffset) > 0.2 * containerWidth) {
                setWheelInertia(event.deltaX);
                onSwipeFinish(newSwipeOffset, Date.now() - startTime.current);
                return;
            }
            resetCleanup.current = setTimeout(() => handleCancelSwipe(newSwipeOffset), 2 * swipeAnimationDuration);
        }
        else {
            setWheelInertia(event.deltaX);
        }
    });
    reactExports.useEffect(() => subscribeSensors(EVENT_ON_WHEEL, onWheel), [subscribeSensors, onWheel]);
}

const cssContainerPrefix = makeComposePrefix("container");
const ControllerContext = reactExports.createContext(null);
const useController = makeUseContext("useController", "ControllerContext", ControllerContext);
function Controller({ children, ...props }) {
    var _a;
    const { carousel, animation, controller, on, styles, render } = props;
    const { closeOnPullUp, closeOnPullDown, preventDefaultWheelX, preventDefaultWheelY } = controller;
    const [toolbarWidth, setToolbarWidth] = reactExports.useState();
    const state = useLightboxState();
    const dispatch = useLightboxDispatch();
    const [swipeState, setSwipeState] = reactExports.useState(SwipeState.NONE);
    const swipeOffset = reactExports.useRef(0);
    const pullOffset = reactExports.useRef(0);
    const pullOpacity = reactExports.useRef(1);
    const { registerSensors, subscribeSensors } = useSensors();
    const { subscribe, publish } = useEvents();
    const cleanupAnimationIncrement = useDelay();
    const cleanupSwipeOffset = useDelay();
    const cleanupPullOffset = useDelay();
    const { containerRef, setContainerRef, containerRect } = useContainerRect();
    const handleContainerRef = useForkRef(usePreventWheelDefaults({ preventDefaultWheelX, preventDefaultWheelY }), setContainerRef);
    const carouselRef = reactExports.useRef(null);
    const setCarouselRef = useForkRef(carouselRef, undefined);
    const { getOwnerDocument } = useDocumentContext();
    const isRTL = useRTL();
    const rtl = (value) => (isRTL ? -1 : 1) * (typeof value === "number" ? value : 1);
    const focus = useEventCallback(() => { var _a; return (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
    const getLightboxProps = useEventCallback(() => props);
    const getLightboxState = useEventCallback(() => state);
    const prev = reactExports.useCallback((params) => publish(ACTION_PREV, params), [publish]);
    const next = reactExports.useCallback((params) => publish(ACTION_NEXT, params), [publish]);
    const close = reactExports.useCallback(() => publish(ACTION_CLOSE), [publish]);
    const isSwipeValid = (offset) => !(carousel.finite &&
        ((rtl(offset) > 0 && state.currentIndex === 0) ||
            (rtl(offset) < 0 && state.currentIndex === state.slides.length - 1)));
    const setSwipeOffset = (offset) => {
        var _a;
        swipeOffset.current = offset;
        (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty(cssVar("swipe_offset"), `${Math.round(offset)}px`);
    };
    const setPullOffset = (offset) => {
        var _a, _b;
        pullOffset.current = offset;
        pullOpacity.current = (() => {
            const threshold = 60;
            const minOpacity = 0.5;
            const offsetValue = (() => {
                if (closeOnPullDown && offset > 0)
                    return offset;
                if (closeOnPullUp && offset < 0)
                    return -offset;
                return 0;
            })();
            return Math.min(Math.max(round(1 - (offsetValue / threshold) * (1 - minOpacity), 2), minOpacity), 1);
        })();
        (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty(cssVar("pull_offset"), `${Math.round(offset)}px`);
        (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.style.setProperty(cssVar("pull_opacity"), `${pullOpacity.current}`);
    };
    const { prepareAnimation: preparePullAnimation } = useAnimation(carouselRef, (snapshot, rect, translate) => {
        if (carouselRef.current && containerRect) {
            return {
                keyframes: [
                    {
                        transform: `translate(0, ${snapshot.rect.y - rect.y + translate.y}px)`,
                        opacity: snapshot.opacity,
                    },
                    { transform: "translate(0, 0)", opacity: 1 },
                ],
                duration: snapshot.duration,
                easing: animation.easing.fade,
            };
        }
        return undefined;
    });
    const pull = (offset, cancel) => {
        if (closeOnPullUp || closeOnPullDown) {
            setPullOffset(offset);
            let duration = 0;
            if (carouselRef.current) {
                duration = animation.fade * (cancel ? 2 : 1);
                preparePullAnimation({
                    rect: carouselRef.current.getBoundingClientRect(),
                    opacity: pullOpacity.current,
                    duration,
                });
            }
            cleanupPullOffset(() => {
                setPullOffset(0);
                setSwipeState(SwipeState.NONE);
            }, duration);
            setSwipeState(SwipeState.ANIMATION);
            if (!cancel) {
                close();
            }
        }
    };
    const { prepareAnimation, isAnimationPlaying } = useAnimation(carouselRef, (snapshot, rect, translate) => {
        var _a;
        if (carouselRef.current && containerRect && ((_a = state.animation) === null || _a === void 0 ? void 0 : _a.duration)) {
            const parsedSpacing = parseLengthPercentage(carousel.spacing);
            const spacingValue = (parsedSpacing.percent ? (parsedSpacing.percent * containerRect.width) / 100 : parsedSpacing.pixel) || 0;
            return {
                keyframes: [
                    {
                        transform: `translate(${rtl(state.globalIndex - snapshot.index) * (containerRect.width + spacingValue) +
                            snapshot.rect.x -
                            rect.x +
                            translate.x}px, 0)`,
                    },
                    { transform: "translate(0, 0)" },
                ],
                duration: state.animation.duration,
                easing: state.animation.easing,
            };
        }
        return undefined;
    });
    const swipe = useEventCallback((action) => {
        var _a, _b;
        const currentSwipeOffset = action.offset || 0;
        const swipeDuration = !currentSwipeOffset ? ((_a = animation.navigation) !== null && _a !== void 0 ? _a : animation.swipe) : animation.swipe;
        const swipeEasing = !currentSwipeOffset && !isAnimationPlaying() ? animation.easing.navigation : animation.easing.swipe;
        let { direction } = action;
        const count = (_b = action.count) !== null && _b !== void 0 ? _b : 1;
        let newSwipeState = SwipeState.ANIMATION;
        let newSwipeAnimationDuration = swipeDuration * count;
        if (!direction) {
            const containerWidth = containerRect === null || containerRect === void 0 ? void 0 : containerRect.width;
            const elapsedTime = action.duration || 0;
            const expectedTime = containerWidth
                ? (swipeDuration / containerWidth) * Math.abs(currentSwipeOffset)
                : swipeDuration;
            if (count !== 0) {
                if (elapsedTime < expectedTime) {
                    newSwipeAnimationDuration =
                        (newSwipeAnimationDuration / expectedTime) * Math.max(elapsedTime, expectedTime / 5);
                }
                else if (containerWidth) {
                    newSwipeAnimationDuration =
                        (swipeDuration / containerWidth) * (containerWidth - Math.abs(currentSwipeOffset));
                }
                direction = rtl(currentSwipeOffset) > 0 ? ACTION_PREV : ACTION_NEXT;
            }
            else {
                newSwipeAnimationDuration = swipeDuration / 2;
            }
        }
        let increment = 0;
        if (direction === ACTION_PREV) {
            if (isSwipeValid(rtl(1))) {
                increment = -count;
            }
            else {
                newSwipeState = SwipeState.NONE;
                newSwipeAnimationDuration = swipeDuration;
            }
        }
        else if (direction === ACTION_NEXT) {
            if (isSwipeValid(rtl(-1))) {
                increment = count;
            }
            else {
                newSwipeState = SwipeState.NONE;
                newSwipeAnimationDuration = swipeDuration;
            }
        }
        newSwipeAnimationDuration = Math.round(newSwipeAnimationDuration);
        cleanupSwipeOffset(() => {
            setSwipeOffset(0);
            setSwipeState(SwipeState.NONE);
        }, newSwipeAnimationDuration);
        if (carouselRef.current) {
            prepareAnimation({
                rect: carouselRef.current.getBoundingClientRect(),
                index: state.globalIndex,
            });
        }
        setSwipeState(newSwipeState);
        publish(ACTION_SWIPE, {
            type: "swipe",
            increment,
            duration: newSwipeAnimationDuration,
            easing: swipeEasing,
        });
    });
    reactExports.useEffect(() => {
        var _a, _b;
        if (((_a = state.animation) === null || _a === void 0 ? void 0 : _a.increment) && ((_b = state.animation) === null || _b === void 0 ? void 0 : _b.duration)) {
            cleanupAnimationIncrement(() => dispatch({ type: "swipe", increment: 0 }), state.animation.duration);
        }
    }, [state.animation, dispatch, cleanupAnimationIncrement]);
    const swipeParams = [
        subscribeSensors,
        isSwipeValid,
        (containerRect === null || containerRect === void 0 ? void 0 : containerRect.width) || 0,
        animation.swipe,
        () => setSwipeState(SwipeState.SWIPE),
        (offset) => setSwipeOffset(offset),
        (offset, duration) => swipe({ offset, duration, count: 1 }),
        (offset) => swipe({ offset, count: 0 }),
    ];
    const pullParams = [
        () => {
            if (closeOnPullDown) {
                setSwipeState(SwipeState.PULL);
            }
        },
        (offset) => setPullOffset(offset),
        (offset) => pull(offset),
        (offset) => pull(offset, true),
    ];
    usePointerSwipe(controller, ...swipeParams, closeOnPullUp, closeOnPullDown, ...pullParams, close);
    useWheelSwipe(swipeState, ...swipeParams);
    const focusOnMount = useEventCallback(() => {
        if (controller.focus &&
            getOwnerDocument().querySelector(`.${cssClass(MODULE_PORTAL)} .${cssClass(cssContainerPrefix())}`)) {
            focus();
        }
    });
    reactExports.useEffect(focusOnMount, [focusOnMount]);
    const onViewCallback = useEventCallback(() => {
        var _a;
        (_a = on.view) === null || _a === void 0 ? void 0 : _a.call(on, { index: state.currentIndex });
    });
    reactExports.useEffect(onViewCallback, [state.globalIndex, onViewCallback]);
    reactExports.useEffect(() => cleanup(subscribe(ACTION_PREV, (action) => swipe({ direction: ACTION_PREV, ...action })), subscribe(ACTION_NEXT, (action) => swipe({ direction: ACTION_NEXT, ...action })), subscribe(ACTION_SWIPE, (action) => dispatch(action))), [subscribe, swipe, dispatch]);
    const context = reactExports.useMemo(() => ({
        prev,
        next,
        close,
        focus,
        slideRect: containerRect ? computeSlideRect(containerRect, carousel.padding) : { width: 0, height: 0 },
        containerRect: containerRect || { width: 0, height: 0 },
        subscribeSensors,
        containerRef,
        setCarouselRef,
        toolbarWidth,
        setToolbarWidth,
    }), [
        prev,
        next,
        close,
        focus,
        subscribeSensors,
        containerRect,
        containerRef,
        setCarouselRef,
        toolbarWidth,
        setToolbarWidth,
        carousel.padding,
    ]);
    reactExports.useImperativeHandle(controller.ref, () => ({
        prev,
        next,
        close,
        focus,
        getLightboxProps,
        getLightboxState,
    }), [prev, next, close, focus, getLightboxProps, getLightboxState]);
    return (reactExports.createElement("div", { ref: handleContainerRef, className: clsx(cssClass(cssContainerPrefix()), cssClass(CLASS_FLEX_CENTER)), style: {
            ...(swipeState === SwipeState.SWIPE
                ? { [cssVar("swipe_offset")]: `${Math.round(swipeOffset.current)}px` }
                : null),
            ...(swipeState === SwipeState.PULL
                ? {
                    [cssVar("pull_offset")]: `${Math.round(pullOffset.current)}px`,
                    [cssVar("pull_opacity")]: `${pullOpacity.current}`,
                }
                : null),
            ...(controller.touchAction !== "none" ? { [cssVar("controller_touch_action")]: controller.touchAction } : null),
            ...styles.container,
        }, tabIndex: -1, ...registerSensors }, containerRect && (reactExports.createElement(ControllerContext.Provider, { value: context },
        children, (_a = render.controls) === null || _a === void 0 ? void 0 :
        _a.call(render)))));
}
const ControllerModule = createModule(MODULE_CONTROLLER, Controller);

function cssPrefix$2(value) {
    return composePrefix(MODULE_CAROUSEL, value);
}
function cssSlidePrefix(value) {
    return composePrefix(CLASS_SLIDE, value);
}
function CarouselSlide({ slide, offset }) {
    const containerRef = reactExports.useRef(null);
    const { currentIndex, slides } = useLightboxState();
    const { slideRect, focus } = useController();
    const { render, carousel: { imageFit, imageProps }, on: { click: onClick }, styles: { slide: style }, labels, } = useLightboxProps();
    const { getOwnerDocument } = useDocumentContext();
    const offscreen = offset !== 0;
    reactExports.useEffect(() => {
        var _a;
        if (offscreen && ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(getOwnerDocument().activeElement))) {
            focus();
        }
    }, [offscreen, focus, getOwnerDocument]);
    const renderSlide = () => {
        var _a, _b, _c, _d;
        let rendered = (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, { slide, offset, rect: slideRect });
        if (!rendered && isImageSlide(slide)) {
            rendered = (reactExports.createElement(ImageSlide, { slide: slide, offset: offset, render: render, rect: slideRect, imageFit: imageFit, imageProps: imageProps, onClick: !offscreen ? () => onClick === null || onClick === void 0 ? void 0 : onClick({ index: currentIndex }) : undefined }));
        }
        return rendered ? (reactExports.createElement(reactExports.Fragment, null, (_b = render.slideHeader) === null || _b === void 0 ? void 0 :
            _b.call(render, { slide }),
            ((_c = render.slideContainer) !== null && _c !== void 0 ? _c : (({ children }) => children))({ slide, children: rendered }), (_d = render.slideFooter) === null || _d === void 0 ? void 0 :
            _d.call(render, { slide }))) : null;
    };
    return (reactExports.createElement("div", { ref: containerRef, className: clsx(cssClass(cssSlidePrefix()), !offscreen && cssClass(cssSlidePrefix("current")), cssClass(CLASS_FLEX_CENTER)), ...makeInertWhen(offscreen), style: style, role: "group", "aria-roledescription": translateLabel(labels, "Slide"), "aria-label": translateSlideCounter(labels, slides, currentIndex + offset) }, renderSlide()));
}
function Placeholder() {
    const style = useLightboxProps().styles.slide;
    return reactExports.createElement("div", { className: cssClass(CLASS_SLIDE), style: style });
}
function Carousel({ carousel, labels }) {
    const { slides, currentIndex, globalIndex } = useLightboxState();
    const { setCarouselRef } = useController();
    const { autoPlaying, focusWithin } = useA11yContext();
    const spacingValue = parseLengthPercentage(carousel.spacing);
    const paddingValue = parseLengthPercentage(carousel.padding);
    const preload = calculatePreload(carousel, slides, 1);
    const items = [];
    if (hasSlides(slides)) {
        for (let index = currentIndex - preload; index <= currentIndex + preload; index += 1) {
            const slide = getSlide(slides, index);
            const key = globalIndex - currentIndex + index;
            const placeholder = carousel.finite && (index < 0 || index > slides.length - 1);
            items.push(!placeholder
                ? {
                    key: [`${key}`, getSlideKey(slide)].filter(Boolean).join("|"),
                    offset: index - currentIndex,
                    slide,
                }
                : { key });
        }
    }
    return (reactExports.createElement("div", { ref: setCarouselRef, className: clsx(cssClass(cssPrefix$2()), items.length > 0 && cssClass(cssPrefix$2("with_slides"))), style: {
            [`${cssVar(cssPrefix$2("slides_count"))}`]: items.length,
            [`${cssVar(cssPrefix$2("spacing_px"))}`]: spacingValue.pixel || 0,
            [`${cssVar(cssPrefix$2("spacing_percent"))}`]: spacingValue.percent || 0,
            [`${cssVar(cssPrefix$2("padding_px"))}`]: paddingValue.pixel || 0,
            [`${cssVar(cssPrefix$2("padding_percent"))}`]: paddingValue.percent || 0,
        }, role: "region", "aria-live": autoPlaying && !focusWithin ? "off" : "polite", "aria-roledescription": translateLabel(labels, "Carousel"), "aria-label": translateLabel(labels, "Photo gallery") }, items.map(({ key, slide, offset }) => slide ? reactExports.createElement(CarouselSlide, { key: key, slide: slide, offset: offset }) : reactExports.createElement(Placeholder, { key: key }))));
}
const CarouselModule = createModule(MODULE_CAROUSEL, Carousel);

function useNavigationState() {
    const { carousel } = useLightboxProps();
    const { slides, currentIndex } = useLightboxState();
    const prevDisabled = slides.length === 0 || (carousel.finite && currentIndex === 0);
    const nextDisabled = slides.length === 0 || (carousel.finite && currentIndex === slides.length - 1);
    return { prevDisabled, nextDisabled };
}

function useKeyboardNavigation(subscribeSensors) {
    var _a;
    const isRTL = useRTL();
    const { publish } = useEvents();
    const { animation, controller } = useLightboxProps();
    const { prevDisabled, nextDisabled } = useNavigationState();
    const throttle = ((_a = animation.navigation) !== null && _a !== void 0 ? _a : animation.swipe) / 2;
    const prev = useThrottle(() => publish(ACTION_PREV), throttle);
    const next = useThrottle(() => publish(ACTION_NEXT), throttle);
    const handleKeyDown = useEventCallback((event) => {
        switch (event.key) {
            case VK_ESCAPE:
                if (!controller.closeOnEscape)
                    return;
                publish(ACTION_CLOSE);
                break;
            case VK_ARROW_LEFT:
                if (!(isRTL ? nextDisabled : prevDisabled))
                    (isRTL ? next : prev)();
                break;
            case VK_ARROW_RIGHT:
                if (!(isRTL ? prevDisabled : nextDisabled))
                    (isRTL ? prev : next)();
                break;
            default:
                return;
        }
        event.stopPropagation();
    });
    reactExports.useEffect(() => subscribeSensors(EVENT_ON_KEY_DOWN, handleKeyDown), [subscribeSensors, handleKeyDown]);
}

function NavigationButton({ label, icon, renderIcon, action, onClick, disabled, style }) {
    return (reactExports.createElement(IconButton, { label: label, icon: icon, renderIcon: renderIcon, className: cssClass(`navigation_${action}`), disabled: disabled, onClick: onClick, style: style, ...useLoseFocus(useController().focus, disabled) }));
}
function Navigation({ render: { buttonPrev, buttonNext, iconPrev, iconNext }, styles }) {
    const { prev, next, subscribeSensors } = useController();
    const { prevDisabled, nextDisabled } = useNavigationState();
    useKeyboardNavigation(subscribeSensors);
    return (reactExports.createElement(reactExports.Fragment, null,
        buttonPrev ? (buttonPrev()) : (reactExports.createElement(NavigationButton, { label: "Previous", action: ACTION_PREV, icon: PreviousIcon, renderIcon: iconPrev, style: styles.navigationPrev, disabled: prevDisabled, onClick: prev })),
        buttonNext ? (buttonNext()) : (reactExports.createElement(NavigationButton, { label: "Next", action: ACTION_NEXT, icon: NextIcon, renderIcon: iconNext, style: styles.navigationNext, disabled: nextDisabled, onClick: next }))));
}
const NavigationModule = createModule(MODULE_NAVIGATION, Navigation);

const noScroll = cssClass(CLASS_NO_SCROLL);
const noScrollPadding = cssClass(CLASS_NO_SCROLL_PADDING);
function isHTMLElement(element) {
    return "style" in element;
}
function padScrollbar(element, padding, rtl) {
    const styles = window.getComputedStyle(element);
    const property = rtl ? "padding-left" : "padding-right";
    const computedValue = rtl ? styles.paddingLeft : styles.paddingRight;
    const originalValue = element.style.getPropertyValue(property);
    element.style.setProperty(property, `${(parseInt$1(computedValue) || 0) + padding}px`);
    return () => {
        if (originalValue) {
            element.style.setProperty(property, originalValue);
        }
        else {
            element.style.removeProperty(property);
        }
    };
}
function NoScroll({ noScroll: { disabled }, children }) {
    const rtl = useRTL();
    const { getOwnerDocument, getOwnerWindow } = useDocumentContext();
    reactExports.useEffect(() => {
        if (disabled)
            return () => { };
        const cleanup = [];
        const ownerWindow = getOwnerWindow();
        const { body, documentElement } = getOwnerDocument();
        const scrollbar = Math.round(ownerWindow.innerWidth - documentElement.clientWidth);
        if (scrollbar > 0) {
            cleanup.push(padScrollbar(body, scrollbar, rtl));
            const elements = body.getElementsByTagName("*");
            for (let i = 0; i < elements.length; i += 1) {
                const element = elements[i];
                if (isHTMLElement(element) &&
                    ownerWindow.getComputedStyle(element).getPropertyValue("position") === "fixed" &&
                    !element.classList.contains(noScrollPadding)) {
                    cleanup.push(padScrollbar(element, scrollbar, rtl));
                }
            }
        }
        body.classList.add(noScroll);
        return () => {
            body.classList.remove(noScroll);
            cleanup.forEach((clean) => clean());
        };
    }, [rtl, disabled, getOwnerDocument, getOwnerWindow]);
    return reactExports.createElement(reactExports.Fragment, null, children);
}
const NoScrollModule = createModule(MODULE_NO_SCROLL, NoScroll);

function cssPrefix$1$1(value) {
    return composePrefix(MODULE_PORTAL, value);
}
function setAttribute(element, attribute, value) {
    const previousValue = element.getAttribute(attribute);
    element.setAttribute(attribute, value);
    return () => {
        if (previousValue) {
            element.setAttribute(attribute, previousValue);
        }
        else {
            element.removeAttribute(attribute);
        }
    };
}
function Portal({ portal: { root, container: { className: containerClassName, style: containerStyle, ...containerRest } = {} }, animation, styles, className, on, close, labels, children, }) {
    const [mounted, setMounted] = reactExports.useState(false);
    const [visible, setVisible] = reactExports.useState(false);
    const cleanup = reactExports.useRef([]);
    const restoreFocus = reactExports.useRef(null);
    const { setTimeout } = useTimeouts();
    const { subscribe } = useEvents();
    const reduceMotion = useMotionPreference();
    const animationDuration = !reduceMotion ? animation.fade : 0;
    reactExports.useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
            setVisible(false);
        };
    }, []);
    const handleCleanup = useEventCallback(() => {
        cleanup.current.forEach((clean) => clean());
        cleanup.current = [];
    });
    const handleClose = useEventCallback(() => {
        var _a;
        setVisible(false);
        handleCleanup();
        (_a = on.exiting) === null || _a === void 0 ? void 0 : _a.call(on);
        setTimeout(() => {
            var _a;
            (_a = on.exited) === null || _a === void 0 ? void 0 : _a.call(on);
            close();
        }, animationDuration);
    });
    reactExports.useEffect(() => subscribe(ACTION_CLOSE, handleClose), [subscribe, handleClose]);
    const handleEnter = useEventCallback((node) => {
        var _a, _b, _c;
        reflow(node);
        setVisible(true);
        (_a = on.entering) === null || _a === void 0 ? void 0 : _a.call(on);
        const elements = (_c = (_b = node.parentNode) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : [];
        for (let i = 0; i < elements.length; i += 1) {
            const element = elements[i];
            if (["TEMPLATE", "SCRIPT", "STYLE"].indexOf(element.tagName) === -1 && element !== node) {
                cleanup.current.push(setAttribute(element, "inert", ""));
                cleanup.current.push(setAttribute(element, "aria-hidden", "true"));
            }
        }
        cleanup.current.push(() => {
            var _a, _b;
            (_b = (_a = restoreFocus.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
        setTimeout(() => {
            var _a;
            (_a = on.entered) === null || _a === void 0 ? void 0 : _a.call(on);
        }, animationDuration);
    });
    const handleRef = reactExports.useCallback((node) => {
        if (node) {
            handleEnter(node);
        }
        else {
            handleCleanup();
        }
    }, [handleEnter, handleCleanup]);
    return mounted
        ? reactDomExports.createPortal(reactExports.createElement(LightboxRoot, { ref: handleRef, className: clsx(className, containerClassName, cssClass(cssPrefix$1$1()), cssClass(CLASS_NO_SCROLL_PADDING), visible && cssClass(cssPrefix$1$1("open"))), "aria-modal": true, role: "dialog", "aria-label": translateLabel(labels, "Lightbox"), style: {
                ...(animation.fade !== LightboxDefaultProps.animation.fade
                    ? { [cssVar("fade_animation_duration")]: `${animationDuration}ms` }
                    : null),
                ...(animation.easing.fade !== LightboxDefaultProps.animation.easing.fade
                    ? { [cssVar("fade_animation_timing_function")]: animation.easing.fade }
                    : null),
                ...styles.root,
                ...containerStyle,
            }, onFocus: (event) => {
                if (!restoreFocus.current) {
                    restoreFocus.current = event.relatedTarget;
                }
            }, ...containerRest }, children), (typeof root === "function" ? root() : root) || document.body)
        : null;
}
const PortalModule = createModule(MODULE_PORTAL, Portal);

function Root({ children }) {
    return reactExports.createElement(reactExports.Fragment, null, children);
}
const RootModule = createModule(MODULE_ROOT, Root);

function cssPrefix$4(value) {
    return composePrefix(MODULE_TOOLBAR, value);
}
function Toolbar({ toolbar: { buttons }, render: { buttonClose, iconClose }, styles }) {
    const { close, setToolbarWidth } = useController();
    const { setContainerRef, containerRect } = useContainerRect();
    useLayoutEffect(() => {
        setToolbarWidth(containerRect === null || containerRect === void 0 ? void 0 : containerRect.width);
    }, [setToolbarWidth, containerRect === null || containerRect === void 0 ? void 0 : containerRect.width]);
    const renderCloseButton = () => {
        if (buttonClose)
            return buttonClose();
        return reactExports.createElement(IconButton, { key: ACTION_CLOSE, label: "Close", icon: CloseIcon, renderIcon: iconClose, onClick: close });
    };
    return (reactExports.createElement("div", { ref: setContainerRef, style: styles.toolbar, className: cssClass(cssPrefix$4()) }, buttons === null || buttons === void 0 ? void 0 : buttons.map((button) => (button === ACTION_CLOSE ? renderCloseButton() : button))));
}
const ToolbarModule = createModule(MODULE_TOOLBAR, Toolbar);

function renderNode(node, props) {
    var _a;
    return reactExports.createElement(node.module.component, { key: node.module.name, ...props }, (_a = node.children) === null || _a === void 0 ? void 0 : _a.map((child) => renderNode(child, props)));
}
function mergeAnimation(defaultAnimation, animation = {}) {
    const { easing: defaultAnimationEasing, ...restDefaultAnimation } = defaultAnimation;
    const { easing, ...restAnimation } = animation;
    return {
        easing: { ...defaultAnimationEasing, ...easing },
        ...restDefaultAnimation,
        ...restAnimation,
    };
}
function Lightbox({ carousel, animation, render, toolbar, controller, noScroll, on, plugins, slides, index, ...restProps }) {
    const { animation: defaultAnimation, carousel: defaultCarousel, render: defaultRender, toolbar: defaultToolbar, controller: defaultController, noScroll: defaultNoScroll, on: defaultOn, slides: defaultSlides, index: defaultIndex, plugins: defaultPlugins, ...restDefaultProps } = LightboxDefaultProps;
    const { config, augmentation } = withPlugins([
        createNode(PortalModule, [
            createNode(NoScrollModule, [
                createNode(ControllerModule, [
                    createNode(CarouselModule),
                    createNode(ToolbarModule),
                    createNode(NavigationModule),
                ]),
            ]),
        ]),
    ], plugins || defaultPlugins);
    const props = augmentation({
        animation: mergeAnimation(defaultAnimation, animation),
        carousel: { ...defaultCarousel, ...carousel },
        render: { ...defaultRender, ...render },
        toolbar: { ...defaultToolbar, ...toolbar },
        controller: { ...defaultController, ...controller },
        noScroll: { ...defaultNoScroll, ...noScroll },
        on: { ...defaultOn, ...on },
        ...restDefaultProps,
        ...restProps,
    });
    if (!props.open)
        return null;
    return (reactExports.createElement(LightboxPropsProvider, { ...props },
        reactExports.createElement(LightboxStateProvider, { slides: slides || defaultSlides, index: parseInt$1(index || defaultIndex) },
            reactExports.createElement(TimeoutsProvider, null,
                reactExports.createElement(EventsProvider, null,
                    reactExports.createElement(A11yContextProvider, null, renderNode(createNode(RootModule, config), props)))))));
}

const cssPrefix$1 = (className) => cssClass(`slide_${className}`);

const defaultCaptionsProps = {
    descriptionTextAlign: "start",
    descriptionMaxLines: 3,
    showToggle: false,
    hidden: false,
};
const resolveCaptionsProps = (captions) => ({
    ...defaultCaptionsProps,
    ...captions,
});
function useCaptionsProps() {
    const { captions } = useLightboxProps();
    return resolveCaptionsProps(captions);
}

const CaptionsContext = reactExports.createContext(null);
const useCaptions = makeUseContext("useCaptions", "CaptionsContext", CaptionsContext);
function CaptionsContextProvider({ captions, children }) {
    const { ref, hidden } = resolveCaptionsProps(captions);
    const [visible, setVisible] = reactExports.useState(!hidden);
    const context = reactExports.useMemo(() => ({
        visible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
    }), [visible]);
    reactExports.useImperativeHandle(ref, () => context, [context]);
    return reactExports.createElement(CaptionsContext.Provider, { value: context }, children);
}

function Title({ title }) {
    const { toolbarWidth } = useController();
    const { styles } = useLightboxProps();
    const { visible } = useCaptions();
    if (!visible)
        return null;
    return (reactExports.createElement("div", { role: "heading", "aria-level": 2, style: styles.captionsTitleContainer, className: clsx(cssPrefix$1("captions_container"), cssPrefix$1("title_container")) },
        reactExports.createElement("div", { className: cssPrefix$1("title"), style: {
                ...(toolbarWidth ? { [cssVar("toolbar_width")]: `${toolbarWidth}px` } : null),
                ...styles.captionsTitle,
            } }, title)));
}

function Description({ description }) {
    const { descriptionTextAlign, descriptionMaxLines } = useCaptionsProps();
    const { styles, labels } = useLightboxProps();
    const { visible } = useCaptions();
    if (!visible)
        return null;
    return (reactExports.createElement("div", { style: styles.captionsDescriptionContainer, className: clsx(cssPrefix$1("captions_container"), cssPrefix$1("description_container")) },
        reactExports.createElement("div", { className: cssPrefix$1("description"), style: {
                ...(descriptionTextAlign !== defaultCaptionsProps.descriptionTextAlign ||
                    descriptionMaxLines !== defaultCaptionsProps.descriptionMaxLines
                    ? {
                        [cssVar("slide_description_text_align")]: descriptionTextAlign,
                        [cssVar("slide_description_max_lines")]: descriptionMaxLines,
                    }
                    : null),
                ...styles.captionsDescription,
            }, role: "paragraph", "aria-roledescription": translateLabel(labels, "Caption") }, typeof description === "string"
            ? description.split("\n").flatMap((line, index) => [...(index > 0 ? [reactExports.createElement("br", { key: index })] : []), line])
            : description)));
}

const captionsIcon = () => (reactExports.createElement(reactExports.Fragment, null,
    reactExports.createElement("path", { strokeWidth: 2, stroke: "currentColor", strokeLinejoin: "round", fill: "none", d: "M3 5l18 0l0 14l-18 0l0-14z" }),
    reactExports.createElement("path", { d: "M7 15h3c.55 0 1-.45 1-1v-1H9.5v.5h-2v-3h2v.5H11v-1c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1v-1h-1.5v.5h-2v-3h2v.5H18v-1c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1z" })));
const CaptionsVisible = createIcon("CaptionsVisible", captionsIcon());
const CaptionsHidden = createIconDisabled("CaptionsVisible", captionsIcon());
function CaptionsButton() {
    const { visible, show, hide } = useCaptions();
    const { render } = useLightboxProps();
    if (render.buttonCaptions) {
        return reactExports.createElement(reactExports.Fragment, null, render.buttonCaptions({ visible, show, hide }));
    }
    return (reactExports.createElement(IconButton, { label: visible ? "Hide captions" : "Show captions", icon: visible ? CaptionsVisible : CaptionsHidden, renderIcon: visible ? render.iconCaptionsVisible : render.iconCaptionsHidden, onClick: visible ? hide : show }));
}

function Captions({ augment, addModule }) {
    augment(({ captions: captionsProps, render: { slideFooter: renderFooter, ...restRender }, toolbar, ...restProps }) => {
        const captions = resolveCaptionsProps(captionsProps);
        return {
            render: {
                slideFooter: ({ slide }) => (reactExports.createElement(reactExports.Fragment, null, renderFooter === null || renderFooter === void 0 ? void 0 :
                    renderFooter({ slide }),
                    slide.title && reactExports.createElement(Title, { title: slide.title }),
                    slide.description && reactExports.createElement(Description, { description: slide.description }))),
                ...restRender,
            },
            toolbar: addToolbarButton(toolbar, PLUGIN_CAPTIONS, captions.showToggle ? reactExports.createElement(CaptionsButton, null) : null),
            captions,
            ...restProps,
        };
    });
    addModule(createModule(PLUGIN_CAPTIONS, CaptionsContextProvider));
}

function InlineContainer({ inline: { className, style, ...rest } = {}, styles, children }) {
    return (reactExports.createElement(LightboxRoot, { className: clsx(cssClass("relative"), className), style: { [cssVar("controller_overscroll_behavior")]: "contain auto", ...styles.root, ...style }, ...rest }, children));
}

function Inline({ augment, replace, remove }) {
    augment(({ toolbar: { buttons, ...restToolbar }, open, close, controller: { focus, aria, touchAction, ...restController }, className, ...restProps }) => ({
        open: true,
        close: () => { },
        toolbar: {
            buttons: buttons.filter((button) => button !== ACTION_CLOSE),
            ...restToolbar,
        },
        inline: { style: { width: "100%", height: "100%" }, className },
        controller: { focus: false, aria: true, touchAction: "pan-y", ...restController },
        className,
        ...restProps,
    }));
    remove(MODULE_NO_SCROLL);
    replace(MODULE_PORTAL, createModule(PLUGIN_INLINE, InlineContainer));
}

const defaultThumbnailsProps = {
    ref: null,
    position: "bottom",
    width: 120,
    height: 80,
    border: 1,
    borderRadius: 4,
    padding: 4,
    gap: 16,
    imageFit: "contain",
    vignette: true,
    hidden: false,
    showToggle: false,
};
const resolveThumbnailsProps = (thumbnails) => ({
    ...defaultThumbnailsProps,
    ...thumbnails,
});
function useThumbnailsProps() {
    const { thumbnails } = useLightboxProps();
    return resolveThumbnailsProps(thumbnails);
}

const cssPrefix = (value) => composePrefix(PLUGIN_THUMBNAILS, value);
const cssThumbnailPrefix = (value) => cssPrefix(composePrefix("thumbnail", value));

const VideoThumbnailIcon = createIcon("VideoThumbnail", reactExports.createElement("path", { d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }));
const UnknownThumbnailIcon = createIcon("UnknownThumbnail", reactExports.createElement("path", { d: "M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z" }));
function renderThumbnail({ slide, render, rect, imageFit }) {
    var _a;
    const customThumbnail = (_a = render.thumbnail) === null || _a === void 0 ? void 0 : _a.call(render, { slide, render, rect, imageFit });
    if (customThumbnail) {
        return customThumbnail;
    }
    const imageSlideProps = { render, rect, imageFit };
    if (slide.thumbnail) {
        return reactExports.createElement(ImageSlide, { slide: { src: slide.thumbnail }, ...imageSlideProps });
    }
    if (isImageSlide(slide)) {
        return reactExports.createElement(ImageSlide, { slide: slide, ...imageSlideProps });
    }
    const thumbnailIconClass = cssClass(cssThumbnailPrefix(ELEMENT_ICON));
    if (slide.type === "video") {
        return (reactExports.createElement(reactExports.Fragment, null,
            slide.poster && reactExports.createElement(ImageSlide, { slide: { src: slide.poster }, ...imageSlideProps }),
            reactExports.createElement(VideoThumbnailIcon, { className: thumbnailIconClass })));
    }
    return reactExports.createElement(UnknownThumbnailIcon, { className: thumbnailIconClass });
}
const activePrefix = makeComposePrefix("active");
const fadeInPrefix = makeComposePrefix("fadein");
const fadeOutPrefix = makeComposePrefix("fadeout");
const placeholderPrefix = makeComposePrefix("placeholder");
const DELAY = "delay";
const DURATION = "duration";
function Thumbnail({ slide, index, onClick, fadeIn, fadeOut, placeholder, onLoseFocus }) {
    const ref = reactExports.useRef(null);
    const { render, styles, labels } = useLightboxProps();
    const { slides, globalIndex } = useLightboxState();
    const { getOwnerDocument } = useDocumentContext();
    const { width, height, imageFit } = useThumbnailsProps();
    const rect = { width, height };
    const active = index === globalIndex;
    const onLoseFocusCallback = useEventCallback(onLoseFocus);
    reactExports.useEffect(() => {
        if (fadeOut && getOwnerDocument().activeElement === ref.current) {
            onLoseFocusCallback();
        }
    }, [fadeOut, onLoseFocusCallback, getOwnerDocument]);
    return (reactExports.createElement("button", { ref: ref, type: "button", className: clsx(cssClass(CLASS_FLEX_CENTER), cssClass(cssThumbnailPrefix()), active && cssClass(cssThumbnailPrefix(activePrefix())), fadeIn && cssClass(cssThumbnailPrefix(fadeInPrefix())), fadeOut && cssClass(cssThumbnailPrefix(fadeOutPrefix())), placeholder && cssClass(cssThumbnailPrefix(placeholderPrefix()))), style: {
            ...(fadeIn
                ? {
                    [cssVar(cssThumbnailPrefix(fadeInPrefix(DURATION)))]: `${fadeIn.duration}ms`,
                    [cssVar(cssThumbnailPrefix(fadeInPrefix(DELAY)))]: `${fadeIn.delay}ms`,
                }
                : null),
            ...(fadeOut
                ? {
                    [cssVar(cssThumbnailPrefix(fadeOutPrefix(DURATION)))]: `${fadeOut.duration}ms`,
                    [cssVar(cssThumbnailPrefix(fadeOutPrefix(DELAY)))]: `${fadeOut.delay}ms`,
                }
                : null),
            ...styles.thumbnail,
        }, onClick: onClick, "aria-current": active ? true : undefined, "aria-label": translateSlideCounter(labels, slides, index) }, slide && renderThumbnail({ slide, render, rect, imageFit })));
}

function isHorizontal(position) {
    return ["top", "bottom"].includes(position);
}
function boxSize(thumbnails, dimension) {
    return dimension + 2 * (thumbnails.border + thumbnails.padding) + thumbnails.gap;
}
function getThumbnailKey(slide) {
    const { thumbnail, poster } = slide || { thumbnail: "placeholder" };
    return ((typeof thumbnail === "string" && thumbnail) ||
        (typeof poster === "string" && poster) ||
        (slide && getSlideKey(slide)) ||
        undefined);
}
function ThumbnailsTrack({ visible, containerRef }) {
    const track = reactExports.useRef(null);
    const isRTL = useRTL();
    const { publish, subscribe } = useEvents();
    const { carousel, styles, labels } = useLightboxProps();
    const { slides, globalIndex, animation } = useLightboxState();
    const { registerSensors, subscribeSensors } = useSensors();
    useKeyboardNavigation(subscribeSensors);
    const thumbnails = useThumbnailsProps();
    const { position, width, height, border, borderStyle, borderColor, borderRadius, padding, gap, vignette } = thumbnails;
    const offset = ((animation === null || animation === void 0 ? void 0 : animation.duration) !== undefined && (animation === null || animation === void 0 ? void 0 : animation.increment)) || 0;
    const animationDuration = (animation === null || animation === void 0 ? void 0 : animation.duration) || 0;
    const { prepareAnimation } = useAnimation(track, (snapshot) => ({
        keyframes: isHorizontal(position)
            ? [
                {
                    transform: `translateX(${(isRTL ? -1 : 1) * boxSize(thumbnails, width) * offset + snapshot}px)`,
                },
                { transform: "translateX(0)" },
            ]
            : [
                {
                    transform: `translateY(${boxSize(thumbnails, height) * offset + snapshot}px)`,
                },
                { transform: "translateY(0)" },
            ],
        duration: animationDuration,
        easing: animation === null || animation === void 0 ? void 0 : animation.easing,
    }));
    const handleControllerSwipe = useEventCallback(() => {
        let animationOffset = 0;
        if (containerRef.current && track.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const trackRect = track.current.getBoundingClientRect();
            animationOffset = isHorizontal(position)
                ? trackRect.left - containerRect.left - (containerRect.width - trackRect.width) / 2
                : trackRect.top - containerRect.top - (containerRect.height - trackRect.height) / 2;
        }
        prepareAnimation(animationOffset);
    });
    reactExports.useEffect(() => cleanup(subscribe(ACTION_SWIPE, handleControllerSwipe)), [subscribe, handleControllerSwipe]);
    const preload = calculatePreload(carousel, slides);
    const items = [];
    if (hasSlides(slides)) {
        for (let index = globalIndex - preload - Math.abs(offset); index <= globalIndex + preload + Math.abs(offset); index += 1) {
            const placeholder = (carousel.finite && (index < 0 || index > slides.length - 1)) ||
                (offset < 0 && index < globalIndex - preload) ||
                (offset > 0 && index > globalIndex + preload);
            const slide = !placeholder ? getSlide(slides, index) : null;
            const key = [`${index}`, getThumbnailKey(slide)].filter(Boolean).join("|");
            items.push({ key, index, slide });
        }
    }
    const handleClick = (slideIndex) => () => {
        if (slideIndex > globalIndex) {
            publish(ACTION_NEXT, { count: slideIndex - globalIndex });
        }
        else if (slideIndex < globalIndex) {
            publish(ACTION_PREV, { count: globalIndex - slideIndex });
        }
    };
    return (reactExports.createElement("div", { className: clsx(cssClass(cssPrefix("container")), cssClass(CLASS_FLEX_CENTER)), style: {
            ...(!visible ? { display: "none" } : null),
            ...(width !== defaultThumbnailsProps.width ? { [cssVar(cssThumbnailPrefix("width"))]: `${width}px` } : null),
            ...(height !== defaultThumbnailsProps.height
                ? { [cssVar(cssThumbnailPrefix("height"))]: `${height}px` }
                : null),
            ...(border !== defaultThumbnailsProps.border
                ? { [cssVar(cssThumbnailPrefix("border"))]: `${border}px` }
                : null),
            ...(borderStyle ? { [cssVar(cssThumbnailPrefix("border_style"))]: borderStyle } : null),
            ...(borderColor ? { [cssVar(cssThumbnailPrefix("border_color"))]: borderColor } : null),
            ...(borderRadius !== defaultThumbnailsProps.borderRadius
                ? { [cssVar(cssThumbnailPrefix("border_radius"))]: `${borderRadius}px` }
                : null),
            ...(padding !== defaultThumbnailsProps.padding
                ? { [cssVar(cssThumbnailPrefix("padding"))]: `${padding}px` }
                : null),
            ...(gap !== defaultThumbnailsProps.gap ? { [cssVar(cssThumbnailPrefix("gap"))]: `${gap}px` } : null),
            ...styles.thumbnailsContainer,
        } },
        reactExports.createElement("nav", { ref: track, style: styles.thumbnailsTrack, className: clsx(cssClass(cssPrefix("track")), cssClass(CLASS_FLEX_CENTER)), "aria-label": translateLabel(labels, "Thumbnails"), tabIndex: -1, ...registerSensors }, items.map(({ key, index, slide }) => {
            const fadeAnimationDuration = animationDuration / Math.abs(offset || 1);
            const fadeIn = (offset > 0 && index > globalIndex + preload - offset && index <= globalIndex + preload) ||
                (offset < 0 && index < globalIndex - preload - offset && index >= globalIndex - preload)
                ? {
                    duration: fadeAnimationDuration,
                    delay: ((offset > 0 ? index - (globalIndex + preload - offset) : globalIndex - preload - offset - index) -
                        1) *
                        fadeAnimationDuration,
                }
                : undefined;
            const fadeOut = (offset > 0 && index < globalIndex - preload) || (offset < 0 && index > globalIndex + preload)
                ? {
                    duration: fadeAnimationDuration,
                    delay: (offset > 0
                        ? offset - (globalIndex - preload - index)
                        : -offset - (index - (globalIndex + preload))) * fadeAnimationDuration,
                }
                : undefined;
            return (reactExports.createElement(Thumbnail, { key: key, index: index, slide: slide, fadeIn: fadeIn, fadeOut: fadeOut, placeholder: !slide, onClick: handleClick(index), onLoseFocus: () => { var _a; return (_a = track.current) === null || _a === void 0 ? void 0 : _a.focus(); } }));
        })),
        vignette && reactExports.createElement("div", { className: cssClass(cssPrefix("vignette")) })));
}

const ThumbnailsContext = reactExports.createContext(null);
const useThumbnails = makeUseContext("useThumbnails", "ThumbnailsContext", ThumbnailsContext);
function ThumbnailsContextProvider({ children, ...props }) {
    const { ref, position, hidden } = resolveThumbnailsProps(props.thumbnails);
    const [visible, setVisible] = reactExports.useState(!hidden);
    const containerRef = reactExports.useRef(null);
    const context = reactExports.useMemo(() => ({
        visible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
    }), [visible]);
    reactExports.useImperativeHandle(ref, () => context, [context]);
    return (reactExports.createElement(LightboxPropsProvider, { ...props },
        reactExports.createElement(ThumbnailsContext.Provider, { value: context },
            reactExports.createElement("div", { ref: containerRef, className: clsx(cssClass(cssPrefix()), cssClass(cssPrefix(`${position}`))) },
                ["start", "top"].includes(position) && reactExports.createElement(ThumbnailsTrack, { containerRef: containerRef, visible: visible }),
                reactExports.createElement("div", { className: cssClass(cssPrefix("wrapper")) }, children),
                ["end", "bottom"].includes(position) && reactExports.createElement(ThumbnailsTrack, { containerRef: containerRef, visible: visible })))));
}

const thumbnailsIcon = () => (reactExports.createElement(reactExports.Fragment, null,
    reactExports.createElement("path", { strokeWidth: 2, stroke: "currentColor", strokeLinejoin: "round", fill: "none", d: "M3 5l18 0l0 14l-18 0l0-14z" }),
    reactExports.createElement("path", { d: "M5 14h4v3h-4zM10 14h4v3h-4zM15 14h4v3h-4z" })));
const ThumbnailsVisible = createIcon("ThumbnailsVisible", thumbnailsIcon());
const ThumbnailsHidden = createIconDisabled("ThumbnailsHidden", thumbnailsIcon());
function ThumbnailsButton() {
    const { visible, show, hide } = useThumbnails();
    const { render } = useLightboxProps();
    if (render.buttonThumbnails) {
        return reactExports.createElement(reactExports.Fragment, null, render.buttonThumbnails({ visible, show, hide }));
    }
    return (reactExports.createElement(IconButton, { label: visible ? "Hide thumbnails" : "Show thumbnails", icon: visible ? ThumbnailsVisible : ThumbnailsHidden, renderIcon: visible ? render.iconThumbnailsVisible : render.iconThumbnailsHidden, onClick: visible ? hide : show }));
}

function Thumbnails({ augment, contains, append, addParent }) {
    augment(({ thumbnails: thumbnailsProps, toolbar, ...restProps }) => {
        const thumbnails = resolveThumbnailsProps(thumbnailsProps);
        return {
            toolbar: addToolbarButton(toolbar, PLUGIN_THUMBNAILS, thumbnails.showToggle ? reactExports.createElement(ThumbnailsButton, null) : null),
            thumbnails,
            ...restProps,
        };
    });
    const module = createModule(PLUGIN_THUMBNAILS, ThumbnailsContextProvider);
    if (contains(PLUGIN_FULLSCREEN)) {
        append(PLUGIN_FULLSCREEN, module);
    }
    else {
        addParent(MODULE_CONTROLLER, module);
    }
}

function FocalIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M16.6822 3.08341C16.966 2.94218 17.081 2.59869 16.9391 2.31622C16.7972 2.03375 16.4522 1.91926 16.1684 2.0605L13.9989 3.14029L13.9859 3.12107L13.8354 3.22165L10.2761 4.99314L10.2738 4.98794C10.0513 5.0829 9.83626 5.19218 9.62986 5.31477L1.31756 9.45186C1.1233 9.54854 1.00043 9.746 1 9.96219C0.999571 10.1784 1.12166 10.3763 1.31552 10.4738L16.1665 17.9385C16.4497 18.0808 16.7952 17.9677 16.9382 17.6858C17.0812 17.4039 16.9676 17.06 16.6844 16.9176L14.5986 15.8692C15.5854 14.0521 16.101 12.012 16.09 9.9352C16.0793 7.89876 15.5627 5.90289 14.5942 4.12264L16.6822 3.08341ZM2.85394 9.96584L7.4968 7.65506C7.18011 8.32325 7.00278 9.05173 6.9793 9.7962C6.95188 10.6656 7.13525 11.5264 7.51081 12.3066L2.85394 9.96584ZM10.4825 13.7799L10.4742 13.7961L13.5726 15.3535C14.4779 13.6977 14.9511 11.8363 14.9411 9.94121C14.9313 8.08093 14.4562 6.25798 13.5659 4.63441L10.3505 6.23475C10.7178 6.62344 11.0266 7.06526 11.2656 7.54666C11.6393 8.29951 11.832 9.12854 11.8285 9.96826C11.825 10.808 11.6255 11.6354 11.2456 12.3852C11.0021 12.8657 10.6888 13.3059 10.3172 13.6922C10.3715 13.7226 10.4267 13.7518 10.4825 13.7799ZM9.39234 12.997C9.72739 12.6699 10.0073 12.2895 10.2197 11.8702C10.5194 11.2787 10.6769 10.626 10.6796 9.96356C10.6823 9.30114 10.5303 8.64716 10.2355 8.05327C10.0255 7.63025 9.74722 7.24597 9.41284 6.91521C9.21265 7.11059 9.03127 7.32591 8.87184 7.55859C8.41147 8.23048 8.15331 9.0192 8.12767 9.83209C8.10203 10.645 8.30999 11.4483 8.72712 12.1476C8.91291 12.4591 9.13676 12.7441 9.39234 12.997Z",
      fill: "currentColor"
    }
  ) });
}

function ISOIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M9.0734 8.25543C8.96248 8.10994 8.80442 7.98963 8.59923 7.8945C8.39958 7.79378 8.19715 7.74341 7.99196 7.74341C7.86995 7.74341 7.74794 7.7602 7.62593 7.79378C7.50392 7.82176 7.393 7.86932 7.29318 7.93647C7.19335 7.99802 7.11016 8.08196 7.04361 8.18828C6.98261 8.28901 6.95211 8.41212 6.95211 8.55761C6.95211 8.69191 6.97984 8.80662 7.0353 8.90175C7.09075 8.99688 7.16562 9.07802 7.2599 9.14517C7.35973 9.21232 7.47896 9.27107 7.61761 9.32144C7.75626 9.3718 7.90877 9.42216 8.07514 9.47252C8.2637 9.53408 8.45781 9.60403 8.65746 9.68237C8.86266 9.76071 9.04844 9.86423 9.21482 9.99294C9.38674 10.1216 9.52539 10.2839 9.63076 10.4798C9.74168 10.6756 9.79713 10.919 9.79713 11.21C9.79713 11.529 9.7389 11.8088 9.62244 12.0494C9.50598 12.2844 9.35069 12.4803 9.15659 12.637C8.96248 12.7936 8.7351 12.9112 8.47445 12.9895C8.21379 13.0678 7.93927 13.107 7.65089 13.107C7.26822 13.107 6.89388 13.0371 6.52785 12.8972C6.16182 12.7517 5.86234 12.539 5.62942 12.2592L6.37811 11.5542C6.5223 11.7556 6.71363 11.9151 6.95211 12.0326C7.19612 12.1501 7.4346 12.2089 7.66752 12.2089C7.78953 12.2089 7.91431 12.1949 8.04187 12.1669C8.16942 12.1333 8.28311 12.0802 8.38294 12.0074C8.48831 11.9347 8.5715 11.8452 8.6325 11.7388C8.69905 11.6269 8.73233 11.4898 8.73233 11.3275C8.73233 11.1709 8.69628 11.0422 8.62418 10.9414C8.55209 10.8351 8.45504 10.7456 8.33303 10.6728C8.21102 10.5945 8.06683 10.5273 7.90045 10.4714L7.37637 10.2951C7.1989 10.2392 7.02143 10.172 6.84396 10.0937C6.66649 10.0153 6.50566 9.9118 6.36147 9.78309C6.22283 9.65439 6.10914 9.49771 6.0204 9.31304C5.93167 9.12279 5.8873 8.88776 5.8873 8.60797C5.8873 8.30579 5.94831 8.04559 6.07031 7.82735C6.19787 7.60911 6.36147 7.43005 6.56112 7.29015C6.76632 7.14466 6.99647 7.03834 7.25158 6.97119C7.51224 6.89844 7.77567 6.86207 8.04187 6.86207C8.34135 6.86207 8.64359 6.91523 8.94862 7.02155C9.25919 7.12787 9.52816 7.28735 9.75554 7.5L9.0734 8.25543Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.72253 7.01316H4.7707V12.9559H3.72253V7.01316Z", fill: "currentColor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.7972 8.68351C10.6419 9.06403 10.5643 9.49211 10.5643 9.96775C10.5643 10.4322 10.6419 10.8575 10.7972 11.2436C10.958 11.6241 11.1771 11.9543 11.4544 12.2341C11.7372 12.5083 12.07 12.7237 12.4526 12.8804C12.8409 13.0315 13.2623 13.107 13.7171 13.107C14.1774 13.107 14.6017 13.0315 14.9899 12.8804C15.3781 12.7237 15.7136 12.5083 15.9965 12.2341C16.2793 11.9543 16.4984 11.6241 16.6536 11.2436C16.8145 10.8575 16.8949 10.4322 16.8949 9.96775C16.8949 9.49211 16.8145 9.06403 16.6536 8.68351C16.4984 8.2974 16.2793 7.97005 15.9965 7.70145C15.7136 7.43285 15.3781 7.2258 14.9899 7.08031C14.6017 6.93482 14.1774 6.86207 13.7171 6.86207C13.2623 6.86207 12.8409 6.93482 12.4526 7.08031C12.07 7.2258 11.7372 7.43285 11.4544 7.70145C11.1771 7.97005 10.958 8.2974 10.7972 8.68351ZM11.8454 10.8491C11.7511 10.5805 11.704 10.2867 11.704 9.96775C11.704 9.65998 11.7511 9.3746 11.8454 9.11159C11.9452 8.84859 12.0839 8.61916 12.2613 8.42331C12.4388 8.22745 12.6495 8.07357 12.8935 7.96165C13.1431 7.84974 13.4204 7.79378 13.7254 7.79378C14.0304 7.79378 14.3077 7.84974 14.5573 7.96165C14.8069 8.07357 15.0204 8.22745 15.1979 8.42331C15.3753 8.61916 15.5112 8.84859 15.6055 9.11159C15.7053 9.3746 15.7552 9.65998 15.7552 9.96775C15.7552 10.2867 15.7053 10.5805 15.6055 10.8491C15.5112 11.1121 15.3725 11.3415 15.1895 11.5374C15.0121 11.7332 14.7985 11.8871 14.549 11.999C14.2994 12.1054 14.0249 12.1585 13.7254 12.1585C13.4259 12.1585 13.1514 12.1054 12.9019 11.999C12.6578 11.8871 12.4443 11.7332 12.2613 11.5374C12.0839 11.3415 11.9452 11.1121 11.8454 10.8491Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1 16V4H19V16H1ZM2.28571 5.2973H17.7143V14.7027H2.28571V5.2973Z",
        fill: "currentColor"
      }
    )
  ] });
}

function ShutterIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M11.1059 3.10588C11.1059 3.71664 10.6108 4.21176 10 4.21176C9.38925 4.21176 8.89412 3.71664 8.89412 3.10588C8.89412 2.49512 9.38925 2 10 2C10.6108 2 11.1059 2.49512 11.1059 3.10588Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M12.2597 2.89681C12.3772 2.60615 12.7081 2.46579 12.9988 2.58331C14.5011 3.19073 15.7835 4.24004 16.6763 5.59235C17.5691 6.94465 18.0301 8.5362 17.9985 10.1563C17.9668 11.7764 17.4439 13.3488 16.499 14.6651C15.554 15.9815 14.2316 16.9799 12.7067 17.5282C11.1819 18.0764 9.52644 18.1487 7.9596 17.7354C6.39276 17.3221 4.98836 16.4428 3.9323 15.2137C2.87624 13.9847 2.2183 12.4639 2.04558 10.8527C1.87286 9.24152 2.19349 7.61585 2.96505 6.19089C3.11433 5.91518 3.45885 5.8127 3.73455 5.96198C4.01026 6.11126 4.11275 6.45578 3.96346 6.73149C3.30141 7.95421 3.02628 9.34916 3.17449 10.7317C3.3227 12.1142 3.88726 13.4192 4.79344 14.4738C5.69963 15.5284 6.90471 16.283 8.24918 16.6376C9.59365 16.9922 11.0141 16.9302 12.3226 16.4598C13.631 15.9893 14.7658 15.1326 15.5766 14.0031C16.3874 12.8735 16.8361 11.5243 16.8633 10.1341C16.8905 8.74394 16.4948 7.37828 15.7288 6.21789C14.9627 5.05751 13.8623 4.15712 12.5732 3.63591C12.2825 3.51838 12.1422 3.18748 12.2597 2.89681Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M9.52345 10.927L5.04696 5.00517L10.9437 9.45558C11.2124 9.6426 11.3882 9.9537 11.3882 10.3059C11.3882 10.8777 10.9247 11.3412 10.3529 11.3412C10.0139 11.3412 9.71294 11.1782 9.5241 10.9263L9.52345 10.927Z",
        fill: "currentColor"
      }
    )
  ] });
}

function ApertureIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11.0723 16.7911C10.7229 16.8458 10.3647 16.8742 10 16.8742C8.65843 16.8742 7.40661 16.4899 6.34864 15.8253L7.20511 12.0559L11.0723 16.7911ZM12.3224 16.472L9.90934 13.5173H15.9074C15.0972 14.8752 13.8321 15.9302 12.3224 16.472ZM16.463 12.3472C16.7291 11.6148 16.8742 10.8244 16.8742 10C16.8742 9.23075 16.7478 8.49101 16.5148 7.80041L12.7046 12.3472H16.463ZM15.9832 6.61296C15.15 5.14423 13.7916 4.01252 12.1633 3.47311L13.5287 9.54208L15.9832 6.61296ZM10.8989 3.18405L11.7707 7.05878L5.94527 4.4484C7.08198 3.61677 8.48366 3.12581 10 3.12581C10.3047 3.12581 10.6047 3.14563 10.8989 3.18405ZM4.98378 5.29974C3.89421 6.46208 3.20399 8.00331 3.13204 9.70449L8.53897 6.89283L4.98378 5.29974ZM3.19653 10.9898C3.42614 12.582 4.20148 13.9979 5.32685 15.0415L6.65622 9.19071L3.19653 10.9898ZM8.98025 12.3797L7.53393 10.6087L8.01689 8.48314L9.90123 7.50327L12.0915 8.48472L12.5832 10.6704L11.178 12.3472H8.98025V12.3797Z",
      fill: "currentColor"
    }
  ) });
}

function shutterSpeed(exposureTime) {
  if (!exposureTime) return void 0;
  const time = parseFloat(exposureTime);
  if (Number.isNaN(time)) return void 0;
  if (time >= 1) return `${Math.round(time)}`;
  const fraction = Math.round(1 / time);
  return `1/${fraction}`;
}
function EXIF({ exif }) {
  if (!exif) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 text-sm gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$5, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        exif.Make,
        " ",
        exif.Model
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ApertureIcon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "ƒ ",
        exif.FNumber
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShutterIcon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: shutterSpeed(exif.ExposureTime) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$4, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: exif.LensModel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ISOIcon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: exif.ISO })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-start gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FocalIcon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: exif.FocalLength })
    ] })
  ] });
}

function generateSlides(images, prefix, target) {
  return images.map((p) => ({
    src: `${prefix}/cdn-cgi/image/format=auto,width=${target}/${p.image.storage_key}`,
    alt: p.image.alt,
    width: p.image.width,
    height: p.image.height,
    title: p.image.caption,
    srcSet: [
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=640/${p.image.storage_key}`,
        width: 640,
        height: Math.floor(640 * p.image.height / p.image.width)
      },
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=1080/${p.image.storage_key}`,
        width: 1080,
        height: Math.floor(1080 * p.image.height / p.image.width)
      },
      {
        src: `${prefix}/cdn-cgi/image/format=auto,width=1920/${p.image.storage_key}`,
        width: 1920,
        height: Math.floor(1920 * p.image.height / p.image.width)
      }
    ]
  }));
}
function GallerySlide({ albumImages, prefix }) {
  const [open, setOpen] = reactExports.useState(false);
  const [index, setIndex] = reactExports.useState(0);
  const defaultSlides = generateSlides(albumImages, prefix, 1280);
  const fullscreenSlides = generateSlides(albumImages, prefix, 2400);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Lightbox,
        {
          index,
          plugins: [Inline, Thumbnails],
          inline: {
            style: { width: "100%", maxWidth: "1280", aspectRatio: "5 / 4" }
          },
          slides: defaultSlides,
          styles: {
            container: { backgroundColor: "transparent" },
            thumbnail: { gap: "16px" },
            thumbnailsContainer: { backgroundColor: "transparent" },
            button: { filter: "none" },
            slide: { padding: 0 }
          },
          thumbnails: {
            imageFit: "contain",
            vignette: false,
            padding: 0,
            border: 3,
            borderColor: "#52525b"
          },
          render: {
            iconPrev: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-full bg-white/60 backdrop-blur-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-5 w-5 text-black" }) }),
            iconNext: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-full bg-white/60 backdrop-blur-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-5 w-5 text-black" }) }),
            slideFooter: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block p-4 absolute w-full bottom-0 bg-linear-to-t from-black/60 to-transparent text-white", children: [
              albumImages[index].image.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: albumImages[index].image.caption }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(EXIF, { exif: albumImages[index].image.exif })
            ] })
          },
          on: {
            view: ({ index: currentIndex }) => setIndex(currentIndex)
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Full Screen",
          onClick: () => setOpen(true),
          className: "absolute top-8 right-8 z-50 p-2 rounded-full bg-white/60 backdrop-blur-2xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        open,
        close: () => setOpen(false),
        slides: fullscreenSlides,
        plugins: [Thumbnails, Captions]
      }
    )
  ] });
}

function Mapbox({ mapboxToken, coords, lang = "en" }) {
  const mapContainer = reactExports.useRef(null);
  const map = reactExports.useRef(null);
  const marker = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    mapboxgl.accessToken = mapboxToken;
    const instance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [104.32, 30.23],
      zoom: 2
    });
    map.current = instance;
    setupMapboxLanguage(instance, lang);
    instance.on("load", () => {
      const lat = coords?.latitude;
      const lng = coords?.longitude;
      if (lat == null || lng == null) return;
      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (Number.isNaN(latNum) || Number.isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180)
        return;
      const target = [lngNum, latNum];
      instance.flyTo({ center: target, zoom: 13 });
      marker.current = new mapboxgl.Marker().setLngLat(target).addTo(instance);
    });
    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      instance.remove();
      map.current = null;
    };
  }, [mapboxToken, lang, coords?.latitude, coords?.longitude]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapContainer, style: { width: "100%", height: "400px" } });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { lang, slug } = Astro2.params;
  if (!lang || !LOCALES.includes(lang) || !slug) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }
  const supabase = Astro2.locals.supabase;
  const session = Astro2.locals.session;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const mapboxToken = env.MAPBOX_TOKEN;
  const url = new URL(Astro2.request.url);
  const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  const limit = url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit")) : 20;
  const { data: albumContent } = await supabase.from("photo").select(
    `id, title, slug, abstract, published_at, content_json, content_text, topic,
     page_view, reactions,
     category (title, slug),
     language!inner (lang)`
  ).eq("slug", slug).eq("language.lang", lang).single();
  if (!albumContent) {
    return new Response(null, { status: 404, statusText: "Album not exists" });
  }
  const [imagesResult, commentsResult, commentCountResult, availableAlbumsResult] = await Promise.all([
    supabase.from("photo_image").select(
      `order, image (alt, caption, height, width, storage_key, exif, location, latitude, longitude)`
    ).eq("photo_id", albumContent.id).order("order", { ascending: true }),
    supabase.from("comment").select(
      `id, user_id, name, website, content_text, created_at, is_anonymous,
       users (id, name, role, website),
       reply_to (id, content_text, is_anonymous, name, users (id, name))`
    ).eq("to_photo", albumContent.id).eq("is_blocked", false).eq("is_public", true).order("created_at", { ascending: false }).range((page - 1) * limit, page * limit - 1),
    supabase.from("comment").select("id", { count: "exact" }).eq("to_photo", albumContent.id).eq("is_blocked", false).eq("is_public", true),
    supabase.from("photo").select(`language!inner (lang)`).eq("slug", slug)
  ]);
  const albumImages = imagesResult.data ?? [];
  const comments = commentsResult.data ?? [];
  const count = commentCountResult.count ?? 0;
  const totalPage = count ? Math.ceil(count / limit) : 1;
  const availableLangs = (availableAlbumsResult.data ?? []).map((item) => item.language?.lang).filter((l) => Boolean(l));
  const label = getLanguageLabel(AlbumText, lang);
  const currentUrl = `${baseUrl}/${lang}/album/${slug}`;
  const pageViewNodeId = `album-${albumContent.id}-page-view`;
  const breadcrumbPages = [
    { name: label.latest_albums, to: `albums/all/1`, current: false },
    { name: albumContent.title ?? "", to: `album/${albumContent.slug}`, current: true }
  ];
  const firstImage = albumImages[0]?.image;
  const firstCoords = firstImage ? { latitude: firstImage.latitude ?? null, longitude: firstImage.longitude ?? null } : { latitude: null, longitude: null };
  const processedImages = albumImages.map((entry, idx) => {
    const img = entry.image;
    if (!img) return null;
    return {
      id: idx,
      alt: img.alt ?? null,
      caption: img.caption ?? null,
      storage_key: img.storage_key,
      width: img.width,
      height: img.height,
      exif: img.exif,
      location: img.location ?? null,
      latitude: img.latitude ?? null,
      longitude: img.longitude ?? null
    };
  }).filter((img) => img !== null);
  const albumJsonLd = generateAlbumStructuredData({
    album: {
      id: albumContent.id || 0,
      title: albumContent.title || "",
      slug: albumContent.slug || "",
      abstract: albumContent.abstract,
      published_at: albumContent.published_at || (/* @__PURE__ */ new Date()).toISOString(),
      page_view: albumContent.page_view || 0,
      images: processedImages,
      comments: [{ count }]
    },
    imgPrefix,
    lang,
    url: currentUrl
  });
  const breadcrumbJsonLd = generateBreadcrumbStructuredData([
    { name: "Home", url: `${baseUrl}/${lang}` },
    { name: "Albums", url: `${baseUrl}/${lang}/albums/all/1` },
    { name: albumContent.title || "Album", url: currentUrl }
  ]);
  const commentJsonLd = buildCommentsStructuredData(
    comments,
    baseUrl,
    currentUrl
  );
  const ogImage = firstImage ? `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${firstImage.storage_key}` : void 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": albumContent.title ?? "", "description": albumContent.abstract ?? albumContent.content_text ?? void 0, "ogTitle": albumContent.title ?? void 0, "ogDescription": albumContent.abstract ?? albumContent.content_text ?? void 0, "ogImage": ogImage, "ogType": "article", "pathWithoutLang": `album/${slug}`, "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/album/rss.xml` }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="w-full max-w-8xl mx-auto p-4 md:py-8 lg:mb-16"> ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "lang": lang, "pages": breadcrumbPages })} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="col-span-1 lg:col-span-2 lg:self-start"> ${albumImages.length > 0 && renderTemplate`${renderComponent($$result2, "GallerySlide", GallerySlide, { "client:load": true, "albumImages": albumImages, "prefix": imgPrefix, "client:component-hydration": "load", "client:component-path": "~/components/GallerySlide.tsx", "client:component-export": "default" })}`} </div> <div class="col-span-1 lg:row-span-2 space-y-4"> <h2 class="text-sm text-violet-700 font-medium">${albumContent.category?.title}</h2> <h1 class="text-zinc-800 font-medium text-3xl">${albumContent.title}</h1> <p class="text-zinc-600 text-sm">${getTime(albumContent.published_at, lang)}</p> <div class="flex gap-1 items-center justify-start"> ${renderComponent($$result2, "EyeIcon", ForwardRef$6, { "className": "h-4 w-4 inline-block text-zinc-500" })} <p${addAttribute(pageViewNodeId, "id")} class="text-zinc-500 text-sm">${albumContent.page_view}</p> </div> ${albumContent.content_json && renderTemplate`${renderComponent($$result2, "ContentContainer", ContentContainer, { "client:visible": true, "content": albumContent.content_json, "prefix": imgPrefix, "client:component-hydration": "visible", "client:component-path": "~/components/ContentContainer.tsx", "client:component-export": "default" })}`} ${albumContent.topic && renderTemplate`<ol class="flex gap-2 flex-wrap"> ${albumContent.topic.map((topic) => renderTemplate`<li class="text-sm text-zinc-600">#${topic}</li>`)} </ol>`} ${renderComponent($$result2, "Reaction", Reaction, { "client:load": true, "contentType": "photo", "contentId": albumContent.id, "reactions": albumContent.reactions, "pathname": Astro2.url.pathname, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "load", "client:component-path": "~/components/Reaction.tsx", "client:component-export": "default" })} ${firstImage?.location && renderTemplate`<div class="flex gap-2 justify-start items-center"> ${renderComponent($$result2, "MapPinIcon", ForwardRef$3, { "className": "w-6 h-6 text-violet-700 inline-block" })} <p class="text-sm text-zinc-500">${firstImage.location}</p> </div>`} ${(firstCoords.latitude || firstCoords.longitude) && mapboxToken && renderTemplate`${renderComponent($$result2, "Mapbox", Mapbox, { "client:visible": true, "mapboxToken": mapboxToken, "coords": firstCoords, "lang": lang, "client:component-hydration": "visible", "client:component-path": "~/components/Mapbox.tsx", "client:component-export": "default" })}`} ${renderComponent($$result2, "ShareButton", ShareButton, { "client:load": true, "url": currentUrl, "title": albumContent.title ?? "", "lang": lang, "contentType": "album", "client:component-hydration": "load", "client:component-path": "~/components/ShareButton.tsx", "client:component-export": "default" })} </div> <div class="col-span-1 lg:col-span-2 lg:self-start"> ${renderComponent($$result2, "CommentEditor", CommentEditor, { "client:load": true, "contentTable": "to_photo", "contentId": albumContent.id, "session": session, "lang": lang, "turnstileSiteKey": env.TURNSTILE_SITE_KEY, "endpoint": "/api/comments", "client:component-hydration": "load", "client:component-path": "~/components/CommentEditor.tsx", "client:component-export": "default" })} <div class="flex flex-col gap-4 divide-y divide-none"> ${comments.map((comment) => renderTemplate`${renderComponent($$result2, "CommentBlock", $$CommentBlock, { "comment": comment, "lang": lang })}`)} </div> <div class="py-8 flex justify-between"> ${page > 1 && renderTemplate`<a${addAttribute(`?page=${page - 1}&limit=${limit}#comment-editor`, "href")} class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.previous} </a>`} ${page < totalPage && renderTemplate`<a${addAttribute(`?page=${page + 1}&limit=${limit}#comment-editor`, "href")} class="ml-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> ${label.next} </a>`} </div> </div> </div> </div> ${renderComponent($$result2, "PageViewTracker", PageViewTracker, { "client:idle": true, "contentType": "album", "contentId": albumContent.id, "countNodeId": pageViewNodeId, "supabaseUrl": env.SUPABASE_URL, "supabaseAnonKey": env.SUPABASE_ANON_KEY, "client:component-hydration": "idle", "client:component-path": "~/components/PageViewTracker.tsx", "client:component-export": "default" })} `, "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>", ""])), unescapeHTML(serializeStructuredData(albumJsonLd)), unescapeHTML(serializeStructuredData(breadcrumbJsonLd)), commentJsonLd.map((c) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(serializeStructuredData(c))))) })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/album/[slug].astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/album/[slug].astro";
const $$url = "/[lang]/album/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
