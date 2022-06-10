import { defineComponent, PropType } from "vue";
import { Menu as AMenu } from "ant-design-vue";
import type { RouteRecordRaw } from "vue-router";
import { computed } from "@vue/reactivity";

const MenuItem = defineComponent({
	props: {
		menuInfo: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(ctx) {
		const isShowSubMenu = computed(() => {
			return ctx.menuInfo.children?.length;
		});

		return () => {
			return (
				<>
					{isShowSubMenu.value && isShowSubMenu.value > 0 ? (
						<AMenu.SubMenu key={ctx.menuInfo.name} title={ctx.menuInfo.meta?.title}>
							{ctx.menuInfo.children?.map(item => {
								return <AMenu.Item key={item.name}>{item.meta?.title}</AMenu.Item>;
							})}
						</AMenu.SubMenu>
					) : (
						<AMenu.Item key={ctx.menuInfo.name}>{ctx.menuInfo.meta?.title}</AMenu.Item>
					)}
				</>
			);
		};
	}
});

export default MenuItem;
