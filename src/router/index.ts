import { createRouter, createWebHistory } from "vue-router";
import { Layout } from "@/router/layout";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/home",
			component: Layout,
			children: [
				{
					path: "home",
					name: "home",
					component: () => import("@/views/HomeView.vue"),
					meta: {
						keepAlive: true,
						requiresAuth: true,
						title: "首页",
						key: "home"
					}
				}
			]
		},
		{
			path: "/about",
			component: Layout,
			redirect: "/about/index",
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
	]
});

export default router;
