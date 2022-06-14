import { defineComponent, ref, watch } from "vue";
import { routes } from "@/router/index";
import { useRoute, useRouter } from "vue-router";

import { Menu as AMenu } from "ant-design-vue";
import { AMenuItem } from "./components";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

const Menu = defineComponent({
	setup() {
		const router = useRouter();
		const currentRoute = useRoute();

		const state = ref({
			openKey: [] as string[],
			selectedKeys: [currentRoute.name] as string[]
		});

		watch(
			() => currentRoute.fullPath,
			() => {
				state.value.selectedKeys = [currentRoute.name] as string[];
				state.value.openKey = currentRoute.matched.map(route => route.name) as string[];
			},
			{
				immediate: true
			}
		);
		// 点击菜单
		const onMenuItem = (info: MenuInfo) => {
			router.push({
				name: info.key as string
			});
		};

		return () => {
			return (
				<>
					<AMenu
						selectedKeys={state.value.selectedKeys}
						openKeys={state.value.openKey}
						mode="inline"
						onClick={onMenuItem}
						theme="dark"
					>
						{routes.map(item => {
							return <AMenuItem key={item.name} menuInfo={item}></AMenuItem>;
						})}
					</AMenu>
				</>
			);
		};
	}
});

export default Menu;
