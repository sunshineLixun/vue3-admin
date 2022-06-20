import { defineComponent, PropType, computed } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { Menu as AMenu } from "ant-design-vue";
import { Iconfont } from "@/components/basic/iconfont";

import { useI18nv } from "@/hooks/useI18n";

export const MenuItem = defineComponent({
	props: {
		menuInfo: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(props) {
		const { t } = useI18nv();
		const isShowSubMenu = computed(() => {
			return props.menuInfo.children?.length;
		});

		const renderMenu = () => {
			if (isShowSubMenu && isShowSubMenu.value) {
				return (
					<AMenu.SubMenu
						key={props.menuInfo.name}
						title={t(props.menuInfo.meta?.title || "")}
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
						{t(props.menuInfo.meta?.title || "")}
					</AMenu.Item>
				);
			}
		};

		return () => {
			return renderMenu();
		};
	}
});
