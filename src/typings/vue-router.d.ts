import "vue-router";

declare module "vue-router" {
	interface RouteMeta {
		title: string;
		icon?: string;
		keepAlive?: boolean;
	}
}
