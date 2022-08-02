import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/layout";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "dashboard",
		redirect: "/dashboard/index",
		component: Layout,
		meta: {
			title: "routes.dashboard.dashboard",
			icon: "icon-qq"
		},
		children: [
			{
				path: "index",
				name: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				meta: {
					title: "routes.dashboard.dashboard",
					icon: "icon-qq",
					keepAlive: true
				}
			}
		]
	},
	{
		path: "/table",
		component: Layout,
		redirect: "/table/index",
		name: "table",
		meta: {
			title: "routes.table.table",
			icon: "icon-github"
		},
		children: [
			{
				path: "index",
				name: "table",
				component: () => import("@/views/table/index.vue"),
				meta: {
					title: "routes.table.searchTable",
					icon: "icon-github",
					keepAlive: true
				}
			}
		]
	},
	{
		path: "/form",
		component: Layout,
		redirect: "/form/index",
		name: "form",
		meta: {
			title: "routes.form.form",
			icon: "icon-facebook"
		},
		children: [
			{
				path: "index",
				name: "form",
				component: () => import("@/views/form/index.vue"),
				meta: {
					title: "routes.form.basicForm",
					icon: "icon-facebook",
					keepAlive: true
				}
			}
		]
	}
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});
