globalThis.process ??= {}; globalThis.process.env ??= {};
import { a2 as createComponent, ae as renderComponent, al as renderTemplate, a1 as createAstro, ac as maybeRenderHead } from '../../../chunks/astro/server_D3oA7eJe.mjs';
import { j as jsxRuntimeExports, $ as $$Base } from '../../../chunks/Base_De4mBBde.mjs';
import { $ as $$Subnav } from '../../../chunks/Subnav_Ba7eeqYw.mjs';
import { r as reactExports } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
export { a as renderers } from '../../../chunks/_@astro-renderers_BA3-2LID.mjs';
/* empty css                                          */
import { H as HomepageText } from '../../../chunks/homepage_z-D1mxuI.mjs';
import { g as getLanguageLabel } from '../../../chunks/getLanguageLabel_D4hYx-hS.mjs';
import { L as LOCALES } from '../../../chunks/getLang_DVpWAtTa.mjs';

//#region src/utils/clsx.ts
function clsx(...classes) {
	return classes.filter(Boolean).join(" ");
}
//#endregion
//#region src/utils/css.ts
function cssClass(suffix) {
	return ["react-photo-album", suffix].filter(Boolean).join("--");
}
function cssVar(suffix) {
	return `--${cssClass(suffix)}`;
}
//#endregion
//#region src/utils/ratio.ts
function ratio({ width, height }) {
	const result = width / height;
	return Number.isFinite(result) ? result : 1;
}
//#endregion
//#region src/utils/responsive.ts
var breakpoints = Object.freeze([
	1200,
	600,
	300,
	0
]);
function unwrap(value, arg) {
	return typeof value === "function" ? value(arg) : value;
}
function unwrapParameter(value, containerWidth) {
	return containerWidth !== void 0 ? unwrap(value, containerWidth) : void 0;
}
function selectResponsiveValue(values, containerWidth) {
	const index = breakpoints.findIndex((breakpoint) => breakpoint <= containerWidth);
	return unwrap(values[Math.max(index, 0)], containerWidth);
}
function resolveResponsiveParameter(parameter, containerWidth, values, minValue = 0) {
	if (containerWidth === void 0) return void 0;
	const value = unwrapParameter(parameter, containerWidth);
	return Math.round(Math.max(value === void 0 ? selectResponsiveValue(values, containerWidth) : value, minValue));
}
function resolveCommonProps(containerWidth, { spacing, padding, componentsProps, render }) {
	return {
		spacing: resolveResponsiveParameter(spacing, containerWidth, [
			20,
			15,
			10,
			5
		]),
		padding: resolveResponsiveParameter(padding, containerWidth, [
			0,
			0,
			0,
			0
		]),
		componentsProps: unwrap(componentsProps, containerWidth) || {},
		render: unwrap(render, containerWidth)
	};
}
//#endregion
//#region src/utils/round.ts
function round(value, decimals = 0) {
	const factor = 10 ** decimals;
	return Math.round((value + Number.EPSILON) * factor) / factor;
}
//#endregion
//#region src/utils/sizes.ts
function srcSetAndSizes(photo, responsiveSizes, photoWidth, containerWidth, photosCount, spacing, padding) {
	let srcSet;
	let sizes;
	const calcSizes = (base) => {
		const gaps = spacing * (photosCount - 1) + 2 * padding * photosCount;
		return `calc((${base.match(/^\s*calc\((.*)\)\s*$/)?.[1] ?? base} - ${gaps}px) / ${round((containerWidth - gaps) / photoWidth, 5)})`;
	};
	const images = photo.srcSet;
	if (images && images.length > 0) srcSet = images.concat(!images.some(({ width }) => width === photo.width) ? [{
		src: photo.src,
		width: photo.width,
		height: photo.height
	}] : []).sort((first, second) => first.width - second.width).map((image) => `${image.src} ${image.width}w`).join(", ");
	if (responsiveSizes?.size) sizes = (responsiveSizes.sizes || []).map(({ viewport, size }) => `${viewport} ${calcSizes(size)}`).concat(calcSizes(responsiveSizes.size)).join(", ");
	else sizes = `${Math.ceil(photoWidth / containerWidth * 100)}vw`;
	return {
		srcSet,
		sizes
	};
}

//#region src/static/Component.tsx
function Component({ as, render, context, classes = [], variables = {}, style: styleProp, className: classNameProp, children, ...rest }, ref) {
	const className = clsx(...(Array.isArray(classes) ? classes : [classes]).filter((el) => typeof el === "string").map(cssClass), classNameProp);
	const props = {
		style: {
			...Object.fromEntries(Object.entries(variables).map(([key, value]) => [cssVar(key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()), typeof value === "number" ? round(value, 5) : value])),
			...styleProp
		},
		className,
		children,
		...rest
	};
	if (render) {
		const rendered = render({
			ref,
			...props
		}, context);
		if (rendered) return rendered;
	}
	return jsxRuntimeExports.jsx(as || "div", {
		ref,
		...props
	});
}
var Component_default = reactExports.forwardRef(Component);
//#endregion
//#region src/static/PhotoComponent.tsx
function PhotoComponent({ photo, index, width, height, onClick, render: { wrapper, link, button, image, extras } = {}, componentsProps: { link: linkProps, button: buttonProps, wrapper: wrapperProps, image: imageProps } = {} }, ref) {
	const { href } = photo;
	const context = {
		photo,
		index,
		width: round(width, 3),
		height: round(height, 3)
	};
	let props;
	if (href) props = {
		...linkProps,
		as: "a",
		render: link,
		classes: ["photo", "link"],
		href,
		onClick
	};
	else if (onClick) props = {
		...buttonProps,
		as: "button",
		type: "button",
		render: button,
		classes: ["photo", "button"],
		onClick
	};
	else props = {
		...wrapperProps,
		render: wrapper,
		classes: "photo"
	};
	return jsxRuntimeExports.jsxs(Component_default, {
		ref,
		variables: {
			photoWidth: context.width,
			photoHeight: context.height
		},
		context,
		...props,
		children: [jsxRuntimeExports.jsx(Component_default, {
			as: "img",
			classes: "image",
			render: image,
			context,
			...imageProps
		}), extras?.({}, context)]
	});
}
var PhotoComponent_default = reactExports.forwardRef(PhotoComponent);
//#endregion
//#region src/static/StaticPhotoAlbum.tsx
function StaticPhotoAlbum({ layout, sizes, model, skeleton, onClick: onClickCallback, render: { container, track, photo: renderPhoto, ...restRender } = {}, componentsProps: { container: containerProps, track: trackProps, link: linkProps, button: buttonProps, wrapper: wrapperProps, image: imageProps } = {} }, ref) {
	const { spacing, padding, containerWidth, tracks, variables, horizontal } = model || {};
	return jsxRuntimeExports.jsxs(Component_default, {
		role: "group",
		"aria-label": "Photo album",
		...containerProps,
		variables: {
			spacing,
			padding,
			containerWidth,
			...variables
		},
		classes: ["", layout],
		render: container,
		ref,
		children: [spacing !== void 0 && padding !== void 0 && containerWidth !== void 0 && tracks?.map(({ photos, variables: trackVariables }, trackIndex) => {
			const trackSize = photos.length;
			const photosCount = horizontal ? trackSize : tracks.length;
			return reactExports.createElement(Component_default, {
				...trackProps,
				key: trackIndex,
				render: track,
				classes: "track",
				variables: {
					trackSize,
					...trackVariables
				}
			}, photos.map((context) => {
				const { photo, index, width } = context;
				const { key, src, alt = "", title, label } = photo;
				const onClick = onClickCallback ? (event) => {
					onClickCallback({
						event,
						photo,
						index
					});
				} : void 0;
				if (renderPhoto) {
					const rendered = renderPhoto({ onClick }, context);
					if (rendered) return rendered;
				}
				const ariaLabel = (props) => {
					return label ? {
						"aria-label": label,
						...props
					} : props;
				};
				return jsxRuntimeExports.jsx(PhotoComponent_default, {
					onClick,
					render: restRender,
					componentsProps: {
						image: {
							loading: "lazy",
							decoding: "async",
							src,
							alt,
							title,
							...srcSetAndSizes(photo, sizes, width, containerWidth, photosCount, spacing, padding),
							...unwrap(imageProps, context)
						},
						link: ariaLabel(unwrap(linkProps, context)),
						button: ariaLabel(unwrap(buttonProps, context)),
						wrapper: unwrap(wrapperProps, context)
					},
					...context
				}, key ?? index);
			}));
		}), containerWidth === void 0 && skeleton]
	});
}
var StaticPhotoAlbum_default = reactExports.forwardRef(StaticPhotoAlbum);

//#region src/client/rows/resolveRowsProps.ts
function resolveRowsProps(containerWidth, { photos, targetRowHeight, rowConstraints, ...rest }) {
	const { spacing, padding, componentsProps, render } = resolveCommonProps(containerWidth, rest);
	const { singleRowMaxHeight, minPhotos, maxPhotos } = unwrapParameter(rowConstraints, containerWidth) || {};
	if (singleRowMaxHeight !== void 0 && spacing !== void 0 && padding !== void 0) {
		const maxWidth = Math.floor(photos.reduce((acc, { width, height }) => acc + width / height * singleRowMaxHeight + 2 * padding, spacing * (photos.length - 1)));
		if (maxWidth > 0) {
			componentsProps.container = { ...componentsProps.container };
			componentsProps.container.style = {
				maxWidth,
				...componentsProps.container.style
			};
		}
	}
	return {
		...rest,
		targetRowHeight: resolveResponsiveParameter(targetRowHeight, containerWidth, [
			(w) => w / 5,
			(w) => w / 4,
			(w) => w / 3,
			(w) => w / 2
		]),
		render,
		spacing,
		padding,
		minPhotos,
		maxPhotos,
		componentsProps
	};
}

//#region src/layouts/rows/rows.ts
var TIEBREAKER_EPSILON$1 = 1.005;
function findMaxPhotosPerRow(photos, containerWidth, targetRowHeight, minPhotos) {
	return round(containerWidth / targetRowHeight / Math.min(...photos.map((photo) => ratio(photo)))) + (minPhotos || 0) + 2;
}
function getCommonHeight(photos, containerWidth, spacing, padding) {
	return (containerWidth - (photos.length - 1) * spacing - 2 * padding * photos.length) / photos.reduce((acc, photo) => acc + ratio(photo), 0);
}
function cost(photos, i, j, width, spacing, padding, targetRowHeight) {
	const row = photos.slice(i, j);
	const commonHeight = getCommonHeight(row, width, spacing, padding);
	return commonHeight > 0 ? (commonHeight - targetRowHeight) ** 2 * row.length : void 0;
}
function computeRowsLayout(photos, spacing, padding, containerWidth, targetRowHeight, minPhotos, maxPhotos) {
	const maxPerRow = Math.min(findMaxPhotosPerRow(photos, containerWidth, targetRowHeight, minPhotos), maxPhotos || Infinity);
	const minPerRow = minPhotos || 1;
	const n = photos.length;
	const dp = new Array(n + 1).fill(Infinity);
	const prev = new Array(n + 1).fill(-1);
	dp[0] = 0;
	for (let j = 1; j <= n; j += 1) for (let i = j - minPerRow; i >= Math.max(0, j - maxPerRow); i -= 1) {
		if (dp[i] === Infinity) continue;
		const c = cost(photos, i, j, containerWidth, spacing, padding, targetRowHeight);
		if (c === void 0) break;
		const newCost = dp[i] + c;
		if (dp[j] === Infinity || dp[j] > newCost && (dp[j] / newCost > TIEBREAKER_EPSILON$1 || prev[j] !== -1 && prev[j] < i)) {
			dp[j] = newCost;
			prev[j] = i;
		}
	}
	if (dp[n] === Infinity) return void 0;
	const path = [];
	for (let node = n; node !== 0; node = prev[node]) path.push(node);
	path.push(0);
	path.reverse();
	const tracks = [];
	for (let i = 1; i < path.length; i += 1) {
		const row = photos.slice(path[i - 1], path[i]).map((photo, j) => ({
			photo,
			index: path[i - 1] + j
		}));
		const height = getCommonHeight(row.map(({ photo }) => photo), containerWidth, spacing, padding);
		tracks.push({ photos: row.map(({ photo, index }) => ({
			photo,
			index,
			width: height * ratio(photo),
			height
		})) });
	}
	return {
		spacing,
		padding,
		containerWidth,
		tracks,
		horizontal: true
	};
}

//#region src/client/columns/resolveColumnsProps.ts
function resolveColumnsProps(containerWidth, { columns, ...rest }) {
	return {
		...rest,
		...resolveCommonProps(containerWidth, rest),
		columns: resolveResponsiveParameter(columns, containerWidth, [
			5,
			4,
			3,
			2
		], 1)
	};
}

//#region src/layouts/columns/partition.ts
var TIEBREAKER_EPSILON = 1.0001;
function computePartition(costFn, partitions, start, end) {
	const dp = /* @__PURE__ */ new Map();
	const queue = /* @__PURE__ */ new Set();
	queue.add(start);
	for (let partition = 0; partition < partitions; partition += 1) {
		const currentQueue = [...queue.keys()];
		queue.clear();
		currentQueue.forEach((splitPoint) => {
			const accumulatedCost = partition > 0 ? dp.get(splitPoint)[partition][1] : 0;
			costFn(splitPoint).forEach(([next, cost]) => {
				let entry = dp.get(next);
				if (!entry) {
					entry = [];
					dp.set(next, entry);
				}
				const newCost = accumulatedCost + cost;
				const existing = entry[partition + 1];
				if (!existing || existing[1] > newCost && (existing[1] / newCost > TIEBREAKER_EPSILON || splitPoint < existing[0])) entry[partition + 1] = [splitPoint, newCost];
				if (partition < partitions - 1 && next !== end) queue.add(next);
			});
		});
	}
	return dp;
}
function reconstructPartition(dp, partitions, end) {
	const splitPoints = [end];
	for (let item = end, k = partitions; k > 0; k -= 1) {
		[item] = dp.get(item)[k];
		splitPoints.push(item);
	}
	return splitPoints.reverse();
}
function findOptimalPartition(costFn, partitions, start, end) {
	return reconstructPartition(computePartition(costFn, partitions, start, end), partitions, end);
}
//#endregion
//#region src/layouts/columns/columns.ts
function makePartitionCostFn(photos, spacing, padding, targetColumnWidth, targetColumnHeight) {
	return (splitPoint) => {
		const results = [];
		const cutOffHeight = targetColumnHeight * 1.5;
		let height = targetColumnWidth / ratio(photos[splitPoint]) + 2 * padding;
		for (let i = splitPoint + 1; i < photos.length + 1; i += 1) {
			results.push([i, (targetColumnHeight - height) ** 2]);
			if (height > cutOffHeight || i === photos.length) break;
			height += targetColumnWidth / ratio(photos[i]) + spacing + 2 * padding;
		}
		return results;
	};
}
function buildColumnsModel(path, photos, spacing, padding, containerWidth, columnsGaps, columnsRatios) {
	const tracks = [];
	const totalRatio = columnsRatios.reduce((total, columnRatio) => total + columnRatio, 0);
	for (let i = 0; i < path.length - 1; i += 1) {
		const column = photos.slice(path[i], path[i + 1]).map((photo, j) => ({
			photo,
			index: path[i] + j
		}));
		const adjustedGaps = columnsRatios.reduce((total, columnRatio, index) => total + (columnsGaps[i] - columnsGaps[index]) * columnRatio, 0);
		const columnWidth = (containerWidth - (path.length - 2) * spacing - 2 * (path.length - 1) * padding - adjustedGaps) * columnsRatios[i] / totalRatio;
		tracks.push({
			photos: column.map(({ photo, index }) => ({
				photo,
				index,
				width: columnWidth,
				height: columnWidth / ratio(photo)
			})),
			variables: {
				adjustedGaps,
				columnRatio: columnsRatios[i]
			}
		});
	}
	return {
		tracks,
		variables: { totalRatio }
	};
}
function computeColumnsModel(photos, spacing, padding, containerWidth, targetColumnWidth, columns) {
	const columnsGaps = [];
	const columnsRatios = [];
	if (photos.length <= columns) {
		const averageRatio = photos.length > 0 ? photos.reduce((acc, photo) => acc + ratio(photo), 0) / photos.length : 1;
		for (let i = 0; i < columns; i += 1) {
			columnsGaps[i] = 2 * padding;
			columnsRatios[i] = i < photos.length ? ratio(photos[i]) : averageRatio;
		}
		return buildColumnsModel(Array.from({ length: columns + 1 }, (_, index) => Math.min(index, photos.length)), photos, spacing, padding, containerWidth, columnsGaps, columnsRatios);
	}
	const path = findOptimalPartition(makePartitionCostFn(photos, spacing, padding, targetColumnWidth, (photos.reduce((acc, photo) => acc + targetColumnWidth / ratio(photo), 0) + spacing * (photos.length - columns) + 2 * padding * photos.length) / columns), columns, 0, photos.length);
	for (let i = 0; i < path.length - 1; i += 1) {
		const column = photos.slice(path[i], path[i + 1]);
		columnsGaps[i] = spacing * (column.length - 1) + 2 * padding * column.length;
		columnsRatios[i] = 1 / column.reduce((acc, photo) => acc + 1 / ratio(photo), 0);
	}
	return buildColumnsModel(path, photos, spacing, padding, containerWidth, columnsGaps, columnsRatios);
}
function computeColumnsLayout(photos, spacing, padding, containerWidth, columns) {
	const { tracks, variables } = computeColumnsModel(photos, spacing, padding, containerWidth, (containerWidth - spacing * (columns - 1) - 2 * padding * columns) / columns, columns);
	if (tracks.some((track) => track.photos.some(({ width, height }) => width <= 0 || height <= 0))) return columns > 1 ? computeColumnsLayout(photos, spacing, padding, containerWidth, columns - 1) : void 0;
	return {
		tracks,
		spacing,
		padding,
		containerWidth,
		variables: {
			columns,
			...variables
		}
	};
}

//#region src/client/masonry/resolveMasonryProps.ts
function resolveMasonryProps(containerWidth, { columns, ...rest }) {
	return {
		...rest,
		...resolveCommonProps(containerWidth, rest),
		columns: resolveResponsiveParameter(columns, containerWidth, [
			5,
			4,
			3,
			2
		], 1)
	};
}

//#region src/layouts/masonry/masonry.ts
function computeMasonryLayout(photos, spacing, padding, containerWidth, columns) {
	const columnWidth = (containerWidth - spacing * (columns - 1) - 2 * padding * columns) / columns;
	if (columnWidth <= 0) return columns > 1 ? computeMasonryLayout(photos, spacing, padding, containerWidth, columns - 1) : void 0;
	const columnsCurrentTopPositions = [];
	for (let i = 0; i < columns; i += 1) columnsCurrentTopPositions[i] = 0;
	const columnsModel = photos.reduce((model, photo, index) => {
		const shortestColumn = columnsCurrentTopPositions.reduce((currentShortestColumn, item, i) => item < columnsCurrentTopPositions[currentShortestColumn] - 1 ? i : currentShortestColumn, 0);
		columnsCurrentTopPositions[shortestColumn] = columnsCurrentTopPositions[shortestColumn] + columnWidth / ratio(photo) + spacing + 2 * padding;
		model[shortestColumn].push({
			photo,
			index
		});
		return model;
	}, Array.from({ length: columns }, () => []));
	return {
		spacing,
		padding,
		containerWidth,
		variables: { columns },
		tracks: columnsModel.map((column) => ({ photos: column.map(({ photo, index }) => ({
			photo,
			index,
			width: columnWidth,
			height: columnWidth / ratio(photo)
		})) }))
	};
}

//#region src/ssr/breakpoints/useBreakpoints.ts
function convertBreakpoints(breakpoints) {
	if (!breakpoints || breakpoints.length === 0) return [];
	const allBreakpoints = [Math.min(...breakpoints) / 2, ...breakpoints];
	allBreakpoints.sort((a, b) => a - b);
	return allBreakpoints;
}
function useBreakpoints(prefix, breakpoints) {
	const uid = `${prefix}-${reactExports.useId().replace(/[«»:_]/g, "")}`;
	return {
		containerClass: cssClass(uid),
		breakpointClass: (breakpoint) => cssClass(`${uid}-${breakpoint}`),
		breakpoints: convertBreakpoints(breakpoints)
	};
}
//#endregion
//#region src/ssr/breakpoints/StyledBreakpoints.tsx
function StyledBreakpoints({ breakpoints, containerClass, breakpointClass }) {
	return jsxRuntimeExports.jsx("style", { children: [
		`.${containerClass}{container-type:inline-size}`,
		`${breakpoints.map((breakpoint) => `.${breakpointClass(breakpoint)}`).join()}{display:none}`,
		...breakpoints.map((breakpoint, index, array) => `@container(min-width:${index > 0 ? breakpoint : 0}px)${index < array.length - 1 ? ` and (max-width:${array[index + 1] - 1}px)` : ""}{.${breakpointClass(breakpoint)}{display:block}}`)
	].join("\n") });
}

//#region src/server/ServerPhotoAlbum.tsx
function ServerPhotoAlbum({ layout, unstyled, classNames, breakpoints: breakpointsProp, ...props }) {
	const { photos } = props;
	const { breakpoints, containerClass, breakpointClass } = useBreakpoints("server", breakpointsProp);
	if (!Array.isArray(photos) || !Array.isArray(breakpoints) || breakpoints.length === 0) return null;
	const computeModel = (breakpoint) => {
		if (layout === "rows") {
			const { spacing, padding, targetRowHeight, minPhotos, maxPhotos, ...rest } = resolveRowsProps(breakpoint, props);
			return {
				...rest,
				model: computeRowsLayout(photos, spacing, padding, breakpoint, targetRowHeight, minPhotos, maxPhotos)
			};
		}
		if (layout === "columns") {
			const { spacing, padding, columns, ...rest } = resolveColumnsProps(breakpoint, props);
			return {
				...rest,
				model: computeColumnsLayout(photos, spacing, padding, breakpoint, columns)
			};
		}
		if (layout === "masonry") {
			const { spacing, padding, columns, ...rest } = resolveMasonryProps(breakpoint, props);
			return {
				...rest,
				model: computeMasonryLayout(photos, spacing, padding, breakpoint, columns)
			};
		}
		return null;
	};
	return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [!unstyled && jsxRuntimeExports.jsx(StyledBreakpoints, {
		breakpoints,
		containerClass,
		breakpointClass
	}), jsxRuntimeExports.jsx("div", {
		className: clsx(containerClass, classNames?.container),
		children: breakpoints.map((breakpoint) => jsxRuntimeExports.jsx("div", {
			className: clsx(breakpointClass(breakpoint), classNames?.breakpoints?.[breakpoint]),
			children: jsxRuntimeExports.jsx(StaticPhotoAlbum_default, {
				layout,
				...computeModel(breakpoint)
			})
		}, breakpoint))
	})] });
}

function GalleryImage({ image, width, classList, prefix }) {
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const imgRef = reactExports.useRef(null);
  const base = image.width > image.height ? "width" : "height";
  reactExports.useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true);
  }, [image.storage_key]);
  const highResSrc = `${prefix}/cdn-cgi/image/format=auto,${base}=${width}/${image.storage_key}`;
  const highResSrcSet = `${highResSrc} 1x, ${prefix}/cdn-cgi/image/format=auto,${base}=${width * 2}/${image.storage_key} 2x`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${classList} relative overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        className: `scale-110 brightness-110 absolute inset-0 transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`,
        src: `${prefix}/cdn-cgi/image/format=auto,${base}=24/${image.storage_key}`,
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
              className: "group-hover:scale-105 transition-all duration-300",
              src: highResSrc,
              srcSet: highResSrcSet,
              sizes: "(max-width: 720px) 100vw, 2x",
              alt: image.alt ?? "",
              width,
              onLoad: () => setImageLoaded(true)
            }
          )
        ]
      }
    )
  ] });
}

function FeaturedPhotoGrid({ photos, prefix }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ServerPhotoAlbum,
    {
      layout: "masonry",
      photos,
      breakpoints: [480, 720, 960],
      spacing: 0,
      columns: (containerWidth) => {
        if (containerWidth < 480) return 1;
        if (containerWidth < 720) return 2;
        if (containerWidth < 960) return 3;
        return 4;
      },
      render: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        photo: (_props, { photo }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: photo.href,
            className: "group m-1 md:m-2 relative rounded-md overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-20 absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium text-base", children: photo.title }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryImage, { image: photo, width: 640, classList: "w-full h-full group", prefix })
            ]
          },
          photo.key
        )
      }
    }
  );
}

function generatePhotoAlbum(featuredPhotos, prefix, lang) {
  return featuredPhotos.map((p) => ({
    key: p.id.toString(),
    src: `${prefix}/cdn-cgi/image/format=auto,width=560/${p.cover.storage_key}`,
    width: p.cover.width,
    height: p.cover.height,
    alt: p.title,
    href: `/${lang}/album/${p.slug}`,
    label: p.title,
    storage_key: p.cover.storage_key,
    title: p.title
  }));
}

const $$Astro = createAstro();
const prerender = false;
const $$Featured = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Featured;
  const { lang } = Astro2.params;
  if (!lang || !LOCALES.includes(lang)) {
    return new Response(null, { status: 404, statusText: "No such language" });
  }
  const supabase = Astro2.locals.supabase;
  const env = Astro2.locals.runtime.env;
  const baseUrl = env.BASE_URL;
  const imgPrefix = env.IMG_PREFIX;
  const table = `random_${lang}_photos`;
  const { data: rawFeatured, error } = await supabase.from(table).select(
    `id, slug, title, page_view, language!inner (lang),
     cover (id, alt, storage_key, width, height)`
  ).limit(32);
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  const isRecord = (value) => typeof value === "object" && value !== null;
  const featuredPhotos = (rawFeatured ?? []).map((row) => {
    if (!isRecord(row)) return null;
    const id = row["id"];
    if (typeof id !== "number") return null;
    const cover = row["cover"];
    const language = row["language"];
    if (!isRecord(cover) || typeof cover["storage_key"] !== "string") return null;
    return {
      id,
      slug: typeof row["slug"] === "string" ? row["slug"] : null,
      title: typeof row["title"] === "string" ? row["title"] : "",
      language: {
        lang: isRecord(language) && typeof language["lang"] === "string" ? language["lang"] : lang
      },
      cover: {
        id: String(cover["id"]),
        alt: typeof cover["alt"] === "string" ? cover["alt"] : null,
        storage_key: cover["storage_key"],
        width: typeof cover["width"] === "number" ? cover["width"] : 0,
        height: typeof cover["height"] === "number" ? cover["height"] : 0
      }
    };
  }).filter((f) => f !== null);
  const photos = generatePhotoAlbum(featuredPhotos, imgPrefix, lang);
  const label = getLanguageLabel(HomepageText, lang);
  const availableLangs = ["zh", "en", "jp"];
  const ogStorage = featuredPhotos[0]?.cover.storage_key ?? "a2b148a3-5799-4be0-a8d4-907f9355f20f";
  const ogImage = `${imgPrefix}/cdn-cgi/image/format=jpeg,width=960/${ogStorage}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Base, { "lang": lang, "title": label.featured_albums_title, "description": label.featured_albums_description, "ogTitle": label.featured_albums_title, "ogDescription": label.featured_albums_description, "ogImage": ogImage, "pathWithoutLang": "albums/featured", "availableLangs": availableLangs, "baseUrl": baseUrl, "rssHref": `${baseUrl}/${lang}/album/rss.xml` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Subnav", $$Subnav, { "lang": lang, "active": "photography" })} ${maybeRenderHead()}<h1 class="sr-only">Featured Photography</h1> <div class="w-full max-w-8xl mx-auto p-4 md:py-8 lg:mb-16"> ${renderComponent($$result2, "FeaturedPhotoGrid", FeaturedPhotoGrid, { "photos": photos, "prefix": imgPrefix })} </div> ` })}`;
}, "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/featured.astro", void 0);

const $$file = "/Users/darmau/Code/darmau-co/shinano-remix/astro/src/pages/[lang]/albums/featured.astro";
const $$url = "/[lang]/albums/featured";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Featured,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
