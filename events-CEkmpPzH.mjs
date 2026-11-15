import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as searchEvents, b as weekendRange, g as moscowToday, p as listingSearch, r as addDays } from "./catalog-s0mofIJw.mjs";
import { a as DateStrip, d as useUi, l as kindLead, o as EventCard, r as Route$2, u as pageTitle } from "./router-DvgBSO8E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-CEkmpPzH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const search = Route$2.useSearch();
	const navigate = Route$2.useNavigate();
	const city = useUi((state) => state.city);
	const today = moscowToday();
	let from = today;
	let to = addDays(today, 120);
	if (search.date) {
		from = search.date;
		to = search.date;
	} else if (search.when === "weekend") [from, to] = weekendRange(today);
	else if (search.when === "week") to = addDays(today, 6);
	const kind = search.kind ?? "all";
	const sort = search.sort ?? "date";
	const free = Boolean(search.free);
	const events = searchEvents({
		city,
		kind,
		q: search.q,
		from,
		to,
		free,
		sort
	});
	const [sortOpen, setSortOpen] = (0, import_react.useState)(false);
	const lead = kindLead(kind);
	const sortLabel = sort === "price" ? "Сначала дешевле" : sort === "price-desc" ? "Сначала дороже" : "По дате";
	function patch(next) {
		navigate({ search: listingSearch({
			...search,
			...next
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-extrabold tracking-tight sm:text-5xl",
				children: pageTitle(kind, city)
			}),
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: lead
			}) : null,
			search.q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: ["Запрос: ", search.q]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateStrip, {
					value: search.date,
					onChange: (date) => patch({
						date,
						when: void 0
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-full bg-chip px-4 py-2 text-sm font-medium",
							onClick: () => setSortOpen((open) => !open),
							children: sortLabel
						}), sortOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute z-20 mt-2 w-48 rounded-2xl border border-line bg-bg p-1 shadow-lg",
							children: [
								["date", "По дате"],
								["price", "Сначала дешевле"],
								["price-desc", "Сначала дороже"]
							].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-soft",
								onClick: () => {
									patch({ sort: value });
									setSortOpen(false);
								},
								children: label
							}, value))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `rounded-full px-4 py-2 text-sm font-medium ${free ? "bg-ink text-accent-fg" : "bg-chip"}`,
						onClick: () => patch({ free: !free }),
						children: "Бесплатно"
					}),
					kind !== "kids" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-full bg-chip px-4 py-2 text-sm font-medium",
						onClick: () => patch({ kind: "kids" }),
						children: "Детям"
					}) : null
				]
			}),
			events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event }, event.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-xl text-muted",
				children: "Ничего не нашлось. Снимите фильтр цены или выберите другой день — каталог собран по открытым страницам ноября 2026 года."
			})
		]
	});
}
//#endregion
export { EventsPage as component };
