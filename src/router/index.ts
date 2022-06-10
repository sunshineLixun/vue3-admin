import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/layout";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		redirect: "/home/home",
		component: Layout,
		meta: {
			title: "首页"
		},
		children: []
	},
	{
		path: "/home",
		redirect: "/home/home",
		component: Layout,
		name: "home",
		meta: {
			title: "首页"
		},
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/views/HomeView.vue"),
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
				component: () => import("@/views/AboutView.vue"),
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
