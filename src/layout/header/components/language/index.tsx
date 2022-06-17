import { defineComponent } from "vue";
import { Dropdown, Menu, Space } from "ant-design-vue";

import { GlobalOutlined } from "@ant-design/icons-vue";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

import { localesList } from "@/locales/config";

export default defineComponent({
	setup() {
		const onLanguage = (info: MenuInfo) => {
			console.log("language:", info);
		};
		const renderMenu = () => {
			return (
				<Menu onClick={onLanguage}>
					{localesList.map(item => {
						return (
							<Menu.Item key={item.label}>
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
