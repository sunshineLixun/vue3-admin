import { defineComponent } from "vue";
import { Dropdown, Menu, Space } from "ant-design-vue";

import { GlobalOutlined } from "@ant-design/icons-vue";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

export default defineComponent({
	setup() {
		const onLanguage = (info: MenuInfo) => {
			console.log("language:", info);
		};
		const renderMenu = () => {
			return (
				<Menu onClick={onLanguage}>
					<Menu.Item key={1}>
						<Space size={5}>简体中文</Space>
					</Menu.Item>
					<Menu.Item key={2}>
						<Space size={5}>English</Space>
					</Menu.Item>
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
