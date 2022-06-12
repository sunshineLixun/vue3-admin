import { defineComponent, PropType } from "vue";
import { Menu as AMenu } from "ant-design-vue";
import type { RouteRecordRaw } from "vue-router";
import { computed } from "@vue/reactivity";

export const MenuItem = defineComponent({
	props: {
		menuInfo: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(props) {
		const { menuInfo } = props;
		const isShowSubMenu = computed(() => {
			return menuInfo.children?.length;
		});

		return () => {
			return (
				<>
					{isShowSubMenu.value && isShowSubMenu.value > 0 ? (
						<AMenu.SubMenu key={menuInfo.name} title={menuInfo.meta?.title}>
							{menuInfo.children?.map(item => {
								return <AMenu.Item key={item.name}>{item.meta?.title}</AMenu.Item>;
							})}
						</AMenu.SubMenu>
					) : (
						<AMenu.Item key={menuInfo.name}>{menuInfo.meta?.title}</AMenu.Item>
					)}
				</>
			);
		};
	}
});
