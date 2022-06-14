import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/layout";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		redirect: "/dashboard/index",
		component: Layout,
		meta: {
			title: "工作台",
			icon: "icon-dashboard",
			keepAlive: true
		}
	},
	{
		path: "/dashboard",
		name: "dashboard",
		redirect: "/dashboard/index",
		component: Layout,
		meta: {
			title: "工作台",
			icon: "icon-dashboard"
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
		path: "/table",
		component: Layout,
		redirect: "/table/index",
		name: "table",
		meta: {
			title: "列表页",
			icon: "icon-dianzan"
		},
		children: [
			{
				path: "index",
				name: "table",
				component: () => import("@/views/table/index.vue"),
				meta: {
					title: "查询表格",
					icon: "icon-dianzan",
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
			title: "表单页",
			icon: "icon-dianzan"
		},
		children: [
			{
				path: "index",
				name: "form",
				component: () => import("@/views/form/index.vue"),
				meta: {
					title: "基础表单",
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
