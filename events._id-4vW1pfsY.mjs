import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatWhen, i as coverFor, l as getEvent, s as formatPrice, v as similarEvents } from "./catalog-s0mofIJw.mjs";
import { s as Heart } from "../_libs/lucide-react.mjs";
import { d as useUi, n as Route, o as EventCard, s as InfoRow } from "./router-DvgBSO8E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._id-4vW1pfsY.js
var import_jsx_runtime = require_jsx_runtime();
function EventPage() {
	const { id } = Route.useParams();
	const event = getEvent(id);
	const fav = useUi((state) => state.favs.includes(id));
	const toggle = useUi((state) => state.toggle);
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold",
				children: "Событие не найдено"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Возможно, ссылка устарела."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-block font-semibold",
				children: "На афишу"
			})
		]
	});
	const clock = event.date_start.slice(11, 16);
	const when = formatWhen(event.date_start);
	const similar = similarEvents(event);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: event.city
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl",
				children: event.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_22rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: coverFor(event),
						alt: "",
						className: "aspect-video w-full rounded-3xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": fav ? "Убрать из избранного" : "В избранное",
						onClick: () => toggle(event.id),
						className: "absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-bg shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: fav ? "size-5 fill-accent text-accent" : "size-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-5 rounded-3xl bg-soft p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: "pin",
							title: event.venue || event.city,
							text: event.address || void 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: "date",
							title: when,
							text: clock && clock !== "00:00" ? void 0 : "Время на странице не указано"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: "ticket",
							title: formatPrice(event),
							text: `${event.age_limit}+`
						}),
						event.source_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-accent-fg transition hover:opacity-90",
							href: event.source_url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "🎟️"
							}), " Билеты и подробности"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Ссылка на покупку билетов пока не указана."
						})
					]
				})]
			}),
			event.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-3xl text-base leading-relaxed text-fg",
				children: event.description
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-3xl text-sm text-muted",
				children: "Карточка собрана из открытого каталога. Перед походом сверьте время на сайте площадки — сервис билеты не продаёт."
			}),
			similar.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-extrabold",
					children: "Похожие события"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: similar.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: item }, item.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { EventPage as component };
