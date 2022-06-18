import { defineComponent, ref, unref, watchEffect } from "vue";
import { Dropdown, Menu, Space } from "ant-design-vue";

import { GlobalOutlined } from "@ant-design/icons-vue";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

import { localesList } from "@/locales/config";
import { useLocale } from "@/locales/useLocale";
import type { localeEnum } from "@/enum/localeEnum";

export default defineComponent({
	setup() {
		const { changeLocale, getLocale } = useLocale();
		const onLanguage = async (info: MenuInfo) => {
			// 如果是点击当前的语言
			if (unref(getLocale) === info.key) {
				return;
			}
			await changeLocale(info.key as localeEnum);
			selectedKeys.value = [info.key as string];
		};
		const selectedKeys = ref<string[]>([]);
		watchEffect(() => {
			selectedKeys.value = [unref(getLocale)];
		});
		const renderMenu = () => {
			return (
				<Menu selectedKeys={selectedKeys.value} onClick={onLanguage}>
					{localesList.map(item => {
						return (
							<Menu.Item key={item.lang}>
								<Space size={5}>
									<a href="javascript:;">{item.icon}</a>
									{item.label}
								</Space>
							</Menu.Item>
						);
					})}
				</Menu>
			);
		};
		return () => {
			return (
				<Dropdown trigger={["hover"]} overlay={renderMenu()}>
					<GlobalOutlined />
				</Dropdown>
			);
		};
	}
});
