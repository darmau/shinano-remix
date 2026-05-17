globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './Base_De4mBBde.mjs';
import { r as reactExports } from './_@astro-renderers_BA3-2LID.mjs';

function ResponsiveImage({
  image,
  width,
  classList,
  prefix
}) {
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const imgRef = reactExports.useRef(null);
  const base = image.width > image.height ? "width" : "height";
  const highResSrc = `${prefix}/cdn-cgi/image/format=auto,${base}=${width}/${image.storage_key}`;
  const highResSrcSet = `${highResSrc} 1x, ${prefix}/cdn-cgi/image/format=auto,${base}=${width * 2}/${image.storage_key} 2x`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${classList} relative overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        className: `scale-105 brightness-110 absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`,
        src: `${prefix}/cdn-cgi/image/format=jpeg,${base}=24/${image.storage_key}`,
        alt: image.alt ?? "",
        width,
        style: { filter: "blur(32px)" }
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
              alt: image.alt ?? "",
              width,
              loading: "lazy",
              decoding: "async",
              onLoad: () => setImageLoaded(true),
              onError: () => setImageLoaded(true)
            }
          )
        ]
      }
    )
  ] });
}

export { ResponsiveImage as R };
