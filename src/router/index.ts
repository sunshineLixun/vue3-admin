import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/layout";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		redirect: "/dashboard",
		component: Layout,
		meta: {
			title: "工作台"
		},
		children: []
	},
	{
		path: "/dashboard",
		name: "dashboard",
		redirect: "/dashboard/index",
		component: Layout,
		meta: {
			title: "工作台"
		},
		children: [
			{
				path: "index",
				name: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "工作台"
				}
			}
		]
	},
	{
		path: "/home",
		name: "home",
		redirect: "/home/home",
		component: Layout,
		meta: {
			title: "首页"
		},
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/views/home.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页"
				}
			}
		]
	},
	{
		path: "/about",
		component: Layout,
		redirect: "/about/index",
		name: "about",
		meta: {
			title: "关于"
		},
		children: [
			{
				path: "index",
				name: "about",
				component: () => import("@/views/about.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "关于",
					key: "about"
				}
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
