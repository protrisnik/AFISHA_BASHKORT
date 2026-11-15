//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CPu9DQTr.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/events",
			"/favorites"
		],
		preloads: [
			"/assets/index-mB5SrQ21.js",
			"/assets/useSelector-dW4koh07.js",
			"/assets/site-ODNUZaKX.js",
			"/assets/root-DLTE-HSj.js",
			"/assets/preload-helper-BYPswf59.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-mB5SrQ21.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DJbNR-3k.js"]
	},
	"/events": {
		filePath: "/workspace/src/routes/events.tsx",
		children: ["/events/$id", "/events/"],
		preloads: ["/assets/events-De4U6VrR.js"]
	},
	"/favorites": {
		filePath: "/workspace/src/routes/favorites.tsx",
		children: void 0,
		preloads: ["/assets/favorites-DXldXctj.js"]
	},
	"/events/$id": {
		filePath: "/workspace/src/routes/events.$id.tsx",
		children: void 0,
		preloads: ["/assets/events._id-Dc_VBH3S.js"]
	},
	"/events/": {
		filePath: "/workspace/src/routes/events.index.tsx",
		children: void 0,
		preloads: ["/assets/events.index-DlXN8Mka.js"]
	}
} });
//#endregion
export { tsrStartManifest };
