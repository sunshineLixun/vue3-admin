import "vue-router";

declare module "vue-router" {
	interface RouteMeta {
		/**路由标题 */
		title: string;
		/**路由icon */
		icon?: string;
		/**缓存 */
		keepAlive?: boolean;
	}
}
