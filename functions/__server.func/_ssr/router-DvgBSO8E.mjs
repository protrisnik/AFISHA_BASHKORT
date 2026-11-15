import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, X as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { _ as searchEvents, a as dayNumber, c as formatWhen, f as isWeekend, g as moscowToday, h as monthTitle, i as coverFor, n as NAV, o as daysFrom, p as listingSearch, r as addDays, s as formatPrice, t as CITIES, u as headingFor, y as weekdayShort } from "./catalog-s0mofIJw.mjs";
import { a as Search, c as ChevronRight, d as Calendar, i as Send, l as ChevronLeft, n as TriangleAlert, o as MapPin, r as Ticket, s as Heart, t as X, u as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DvgBSO8E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askAfisha = createServerFn({ method: "POST" }).validator((data) => {
	const message = String(data?.message ?? "").trim().slice(0, 400);
	if (!message) throw new Error("Напишите вопрос");
	return {
		message,
		city: data?.city === "Стерлитамак" ? "Стерлитамак" : "Уфа",
		history: Array.isArray(data?.history) ? data.history.slice(-4).map((turn) => ({
			role: turn?.role === "assistant" ? "assistant" : "user",
			content: String(turn?.content ?? "").slice(0, 500)
		})) : []
	};
}).handler(createSsrRpc("77f7c3438155bcecea347c717cf3acc2ac1c4c0f42fce09a34e1fa90a9140689"));
var useUi = create()(persist((set, get) => ({
	city: "Уфа",
	setCity: (city) => set({ city }),
	favs: [],
	toggle: (id) => {
		const favs = get().favs;
		set({ favs: favs.includes(id) ? favs.filter((item) => item !== id) : [...favs, id] });
	},
	has: (id) => get().favs.includes(id)
}), {
	name: "afisha-ui",
	skipHydration: true
}));
function HydrateStore() {
	(0, import_react.useEffect)(() => {
		useUi.persist.rehydrate();
	}, []);
	return null;
}
function Header() {
	const city = useUi((state) => state.city);
	const setCity = useUi((state) => state.setCity);
	const favs = useUi((state) => state.favs.length);
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const search = useRouterState({ select: (state) => state.location.search });
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [cityOpen, setCityOpen] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const kind = pathname === "/events" ? search.kind ?? "all" : pathname === "/" ? "all" : void 0;
	const results = (0, import_react.useMemo)(() => {
		const text = query.trim();
		if (text.length < 2) return [];
		return searchEvents({
			city,
			q: text,
			from: moscowToday(),
			to: addDays(moscowToday(), 365)
		}).slice(0, 6);
	}, [city, query]);
	function go(partial) {
		setOpen(false);
		setCityOpen(false);
		navigate({
			to: "/events",
			search: listingSearch(partial)
		});
	}
	function submitSearch() {
		const text = query.trim();
		if (!text) return;
		go({
			q: text,
			kind: "all"
		});
		setQuery("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					onSubmit: (event) => {
						event.preventDefault();
						submitSearch();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-0 flex-1 items-center gap-2 rounded-full bg-soft px-4 py-2.5 ring-2 ring-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Событие, персона, площадка",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-faint",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-ink px-3 py-2 text-sm font-semibold text-accent-fg",
							disabled: !query.trim(),
							children: "Найти"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "px-2 py-2 text-sm font-medium",
							onClick: () => setOpen(false),
							children: "✕"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex min-w-0 shrink-0 items-center",
						onClick: () => setOpen(false),
						"aria-label": "Афиша Уфы — главная",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo-ufa.png",
							alt: "Уфа — Протрузия",
							className: "h-10 w-auto max-w-[180px] object-contain sm:h-12 sm:max-w-[220px]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 shrink-0 place-items-center rounded-full bg-soft md:hidden",
						"aria-label": "Поиск",
						onClick: () => {
							setOpen(true);
							setTimeout(() => inputRef.current?.focus(), 0);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "hidden min-w-0 flex-1 items-center gap-2 rounded-full bg-soft px-4 py-2.5 md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => {
								setQuery(event.target.value);
								setOpen(true);
							},
							onFocus: () => setOpen(true),
							onKeyDown: (event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									submitSearch();
								}
							},
							placeholder: "Событие, персона, площадка",
							className: "w-full bg-transparent text-sm outline-none placeholder:text-faint"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex items-center gap-1 rounded-full px-2 py-2 text-sm font-medium",
							onClick: () => setCityOpen((value) => !value),
							"aria-expanded": cityOpen,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: city
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" })
							]
						}), cityOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-0 z-40 mt-1 w-44 rounded-2xl border border-line bg-bg p-1 shadow-lg",
							children: CITIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-soft",
								onClick: () => {
									setCity(item);
									setCityOpen(false);
								},
								children: item
							}, item))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/favorites",
						className: "inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-accent-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Избранное"
							}),
							favs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-accent-fg/80",
								children: favs
							}) : null
						]
					})
				] })
			}),
			open && query.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-line bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-3 sm:px-6",
					children: [results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line",
						children: results.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/events/$id",
							params: { id: event.id },
							className: "flex items-center gap-3 py-2",
							onClick: () => setOpen(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: coverFor(event),
								alt: "",
								className: "size-12 rounded-xl object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold",
									children: event.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-xs text-muted",
									children: [
										formatWhen(event.date_start),
										" · ",
										event.venue
									]
								})]
							})]
						}) }, event.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-3 text-sm text-muted",
						children: "В каталоге нет такого запроса. Попробуйте площадку или название."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-1 text-sm font-semibold",
						onClick: submitSearch,
						children: "Все результаты"
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mx-auto max-w-6xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "no-scrollbar flex gap-5 overflow-x-auto",
					children: NAV.map((item) => {
						const active = kind === item.kind;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "shrink-0",
							children: item.kind === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: `inline-block border-b-2 py-3 text-sm ${active ? "border-fg font-semibold" : "border-transparent text-fg/80"}`,
								children: item.label
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/events",
								search: listingSearch({ kind: item.kind }),
								className: `inline-block border-b-2 py-3 text-sm ${active ? "border-fg font-semibold" : "border-transparent text-fg/80"}`,
								children: item.label
							})
						}, item.kind);
					})
				})
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Независимый информационный сервис. Не является официальным сайтом Министерства культуры Республики Башкортостан и не продаёт билеты." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Спросить афишу в Telegram:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "font-semibold text-fg",
					href: "https://t.me/afisha_bash_demo_bot",
					children: "@afisha_bash_demo_bot"
				})
			] })]
		})
	});
}
function DateStrip({ value, onChange }) {
	const today = moscowToday();
	const days = daysFrom(today, 40);
	const scroller = (0, import_react.useRef)(null);
	const [calendar, setCalendar] = (0, import_react.useState)(false);
	const groups = [];
	for (const day of days) {
		const month = monthTitle(day);
		const last = groups[groups.length - 1];
		if (!last || last.month !== month) groups.push({
			month,
			days: [day]
		});
		else last.days.push(day);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex items-end gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Календарь",
				className: "mb-1 grid size-11 shrink-0 place-items-center rounded-2xl bg-soft",
				onClick: () => setCalendar((open) => !open),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				className: "no-scrollbar min-w-0 flex-1 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-2",
					children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-center text-sm text-faint",
						children: capitalize(group.month)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex",
						children: group.days.map((day) => {
							const weekend = isWeekend(day);
							const selected = value === day;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onChange(selected ? void 0 : day),
								className: "flex w-11 flex-col items-center rounded-xl py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-base ${selected ? "font-extrabold" : "font-semibold"} ${weekend ? "text-accent" : "text-fg"} ${selected ? "underline decoration-2 underline-offset-4" : ""}`,
									children: dayNumber(day)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs ${weekend ? "text-accent" : "text-faint"}`,
									children: weekdayShort(day)
								})]
							}, day);
						})
					})] }, group.month))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Дальше по датам",
				className: "mb-1 grid size-11 shrink-0 place-items-center rounded-full bg-soft",
				onClick: () => scroller.current?.scrollBy({
					left: 320,
					behavior: "smooth"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
			}),
			calendar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-14 left-0 z-20 w-72 rounded-3xl border border-line bg-bg p-4 shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCalendar, {
					selected: value,
					onPick: (day) => {
						onChange(day);
						setCalendar(false);
					}
				})
			}) : null
		]
	});
}
function MiniCalendar({ selected, onPick }) {
	const today = moscowToday();
	const [year, month] = today.split("-").map(Number);
	const months = [0, 1].map((offset) => {
		const date = new Date(Date.UTC(year, month - 1 + offset, 1));
		return {
			year: date.getUTCFullYear(),
			month: date.getUTCMonth()
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: months.map((item) => {
			const startPad = (new Date(Date.UTC(item.year, item.month, 1)).getUTCDay() + 6) % 7;
			const count = new Date(Date.UTC(item.year, item.month + 1, 0)).getUTCDate();
			const cells = [...Array(startPad).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
			const label = monthTitle(`${item.year}-${String(item.month + 1).padStart(2, "0")}-01`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-sm font-semibold",
					children: capitalize(label)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1 text-center text-xs text-faint",
					children: [
						"пн",
						"вт",
						"ср",
						"чт",
						"пт",
						"сб",
						"вс"
					].map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }, name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid grid-cols-7 gap-1",
					children: cells.map((day, index) => {
						if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `e-${index}`);
						const key = `${item.year}-${String(item.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
						const past = key < today;
						const weekend = isWeekend(key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: past,
							onClick: () => onPick(key),
							className: `rounded-lg py-1 text-sm ${selected === key ? "bg-ink text-accent-fg" : weekend ? "text-accent" : "text-fg"} disabled:text-faint`,
							children: day
						}, key);
					})
				})
			] }, `${item.year}-${item.month}`);
		})
	});
}
function capitalize(value) {
	return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
function EventCard({ event, className = "" }) {
	const fav = useUi((state) => state.favs.includes(event.id));
	const toggle = useUi((state) => state.toggle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/events/$id",
				params: { id: event.id },
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: coverFor(event),
					alt: "",
					className: "aspect-video w-full rounded-3xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-3 left-3 rounded-full bg-bg px-3 py-1 text-xs font-semibold shadow-sm",
					children: formatPrice(event)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": fav ? "Убрать из избранного" : "В избранное",
				onClick: () => toggle(event.id),
				className: "absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-bg shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: fav ? "size-5 fill-accent text-accent" : "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/events/$id",
			params: { id: event.id },
			className: "mt-3 block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 text-base font-bold leading-snug",
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: formatWhen(event.date_start)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-1 text-sm text-muted",
					children: event.venue
				})
			]
		})]
	});
}
function Rail({ title, events, more }) {
	const scroller = (0, import_react.useRef)(null);
	if (!events.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-extrabold tracking-tight sm:text-3xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/events",
						search: more,
						className: "hidden rounded-full bg-chip px-4 py-2 text-xs font-semibold tracking-wide sm:inline",
						children: "ПОКАЗАТЬ ЕЩЁ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Листать назад",
						className: "grid size-11 place-items-center rounded-full bg-chip",
						onClick: () => scroller.current?.scrollBy({
							left: -320,
							behavior: "smooth"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Листать вперёд",
						className: "grid size-11 place-items-center rounded-full bg-chip",
						onClick: () => scroller.current?.scrollBy({
							left: 320,
							behavior: "smooth"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scroller,
			className: "no-scrollbar flex gap-4 overflow-x-auto pb-2",
			children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
				event,
				className: "w-64 shrink-0 sm:w-72"
			}, event.id))
		})]
	});
}
function InfoRow({ icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(icon === "pin" ? MapPin : icon === "date" ? Calendar : Ticket, { className: "mt-0.5 size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold",
			children: title
		}), text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted",
			children: text
		}) : null] })]
	});
}
function pageTitle(kind, city) {
	return headingFor(kind, city);
}
function kindLead(kind) {
	if (kind === "kids") return "Куда сходить с детьми. Спектакли, концерты и экскурсии с возрастом до 12 лет.";
	if (kind === "excursion") return "Прогулки и обзорные маршруты. Время и цена — как в каталоге.";
	return null;
}
var PROMPTS = [
	"Что сегодня в Уфе?",
	"Спектакль до 1000 рублей",
	"Куда с детьми на выходных?",
	"Есть бесплатные события?"
];
function Assistant() {
	const city = useUi((state) => state.city);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Спросите про дату, цену или жанр — отвечу только событиями из каталога Уфы и Стерлитамака."
	}]);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [messages, open]);
	async function send(value) {
		const message = value.trim();
		if (!message || pending) return;
		const history = messages.filter((item) => item.content && item.role).slice(-4).map((item) => ({
			role: item.role,
			content: item.content
		}));
		setMessages((current) => [...current, {
			role: "user",
			content: message
		}]);
		setText("");
		setPending(true);
		try {
			const result = await askAfisha({ data: {
				message,
				city,
				history
			} });
			setMessages((current) => {
				const next = [...current];
				if (next[next.length - 1]?.role === "assistant") next[next.length - 1] = {
					role: "assistant",
					content: result.text,
					events: result.events
				};
				else next.push({
					role: "assistant",
					content: result.text,
					events: result.events
				});
				return next;
			});
		} catch {
			setMessages((current) => [...current, {
				role: "assistant",
				content: "Не получилось спросить модель. Попробуйте ещё раз или откройте каталог."
			}]);
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: `fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-accent-fg shadow-lg ${open ? "hidden" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Спросить"]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "fixed right-3 bottom-3 z-40 flex h-[32rem] max-h-[80vh] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-bold",
					children: "Спросить афишу"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted",
					children: [
						"Каталог ",
						city,
						" · тот же ответ, что у бота"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Закрыть",
					className: "grid size-10 place-items-center",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3",
				children: [
					messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: message.role === "user" ? "text-right" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `inline-block max-w-[95%] rounded-2xl px-3 py-2 text-left text-sm whitespace-pre-wrap ${message.role === "user" ? "bg-ink text-accent-fg" : "bg-soft"}`,
							children: message.content
						}), message.events?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2 text-left",
							children: message.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/events/$id",
								params: { id: event.id },
								className: "flex gap-2 rounded-2xl bg-soft p-2",
								onClick: () => setOpen(false),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: event.cover,
									alt: "",
									className: "size-14 rounded-xl object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-semibold",
											children: event.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-xs text-muted",
											children: [
												event.when,
												" · ",
												event.price
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs text-muted",
											children: event.venue
										})
									]
								})]
							}) }, event.id))
						}) : null]
					}, `${message.role}-${index}`)),
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Ищу в каталоге…"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar flex gap-2 overflow-x-auto px-3 pb-2",
				children: PROMPTS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "shrink-0 rounded-full bg-chip px-3 py-1.5 text-xs",
					onClick: () => void send(prompt),
					children: prompt
				}, prompt))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-center gap-2 border-t border-line p-3",
				onSubmit: (event) => {
					event.preventDefault();
					send(text);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: text,
					onChange: (event) => setText(event.target.value),
					placeholder: "Например, опера на выходных",
					className: "min-w-0 flex-1 rounded-full bg-soft px-4 py-2.5 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending || !text.trim(),
					className: "grid size-11 place-items-center rounded-full bg-accent text-accent-fg disabled:opacity-40",
					"aria-label": "Отправить",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	}) : null] });
}
var styles_default = "/assets/styles-BL9xLNvf.css";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Афиша Уфы" },
			{
				name: "description",
				content: "Концерты, спектакли, выставки и экскурсии в Уфе и Стерлитамаке. Независимый каталог."
			},
			{
				name: "theme-color",
				content: "#ffffff"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateStore, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assistant, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-Evjjupr4.mjs");
var Route$3 = createFileRoute("/")({
	validateSearch: (search) => ({ date: typeof search.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.date) ? search.date : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./events-CEkmpPzH.mjs");
var KINDS = [
	"all",
	"concert",
	"performance",
	"exhibition",
	"excursion",
	"standup",
	"kids",
	"quiz"
];
var Route$2 = createFileRoute("/events")({
	validateSearch: (search) => {
		const kind = KINDS.includes(search.kind) ? search.kind : "all";
		const sort = search.sort === "price" || search.sort === "price-desc" ? search.sort : "date";
		const when = search.when === "weekend" || search.when === "week" ? search.when : void 0;
		const date = typeof search.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.date) ? search.date : void 0;
		const q = typeof search.q === "string" ? search.q.trim().slice(0, 80) : "";
		return listingSearch({
			kind,
			sort,
			free: search.free === true || search.free === "true" || search.free === "1",
			date,
			q: q || void 0,
			when
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./favorites-BnJMLq00.mjs");
var Route$1 = createFileRoute("/favorites")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./events._id-4vW1pfsY.mjs");
var Route = createFileRoute("/events/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var EventsRoute = Route$2.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$4
});
var FavoritesRoute = Route$1.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$4
});
var EventsRouteChildren = { EventsIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EventsRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	EventsRoute: EventsRoute._addFileChildren(EventsRouteChildren),
	FavoritesRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { DateStrip as a, Rail as c, useUi as d, Route$3 as i, kindLead as l, Route as n, EventCard as o, Route$2 as r, InfoRow as s, router_exports as t, pageTitle as u };
