import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/layout";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		redirect: "/dashboard",
		component: Layout,
		meta: {
			title: "工作台",
			icon: "icon-dianzan",
			keepAlive: true
		},
		children: []
	},
	{
		path: "/dashboard",
		name: "dashboard",
		redirect: "/dashboard/index",
		component: Layout,
		meta: {
			title: "工作台",
			icon: "icon-dianzan"
		},
		children: [
			{
				path: "index",
				name: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				meta: {
					title: "工作台",
					icon: "icon-dianzan",
					keepAlive: true
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
			title: "首页",
			icon: "icon-dianzan"
		},
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/views/home.vue"),
				meta: {
					title: "首页",
					icon: "icon-dianzan",
					keepAlive: true
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
			title: "关于",
			icon: "icon-dianzan"
		},
		children: [
			{
				path: "index",
				name: "about",
				component: () => import("@/views/about.vue"),
				meta: {
					title: "关于",
					icon: "icon-dianzan",
					keepAlive: true
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
