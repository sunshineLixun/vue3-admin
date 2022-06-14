import { defineComponent, PropType } from "vue";
import { computed } from "@vue/reactivity";
import type { RouteRecordRaw } from "vue-router";

import { Menu as AMenu } from "ant-design-vue";

import { Iconfont } from "@/components/basic/iconfont";

export const MenuItem = defineComponent({
	props: {
		menuInfo: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(props) {
		const isShowSubMenu = computed(() => {
			return props.menuInfo.children?.length;
		});

		const renderMenu = () => {
			if (isShowSubMenu && isShowSubMenu.value) {
				return (
					<AMenu.SubMenu
						key={props.menuInfo.name}
						title={props.menuInfo.meta?.title}
						icon={<Iconfont type={props.menuInfo.meta?.icon} />}
					>
						{props.menuInfo.children?.map(item => {
							// 递归
							return <MenuItem key={item.name} menuInfo={item} />;
						})}
					</AMenu.SubMenu>
				);
			} else {
				return (
					<AMenu.Item key={props.menuInfo.name} icon={<Iconfont type={props.menuInfo.meta?.icon} />}>
						{props.menuInfo.meta?.title}
					</AMenu.Item>
				);
			}
		};

		return () => {
			return renderMenu();
		};
	}
});
