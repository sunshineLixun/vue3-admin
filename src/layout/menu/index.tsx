import { defineComponent } from "vue";
import { routes } from "@/router/index";
import { useRouter } from 'vue-router'

import { Menu as AMenu, Image } from "ant-design-vue";
import { AMenuItem } from "./components";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

const Menu = defineComponent({
	components: {
		AMenuItem
	},
	setup() {

		const router = useRouter();
		// 点击菜单
		const onMenuItem = (info: MenuInfo) => { 
			router.push({
				name: info.key as string
			})
		}

		return () => {
			return (
				<>
					<AMenu selectedKeys={['layout']} mode="inline" onClick={onMenuItem} theme="dark">
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
