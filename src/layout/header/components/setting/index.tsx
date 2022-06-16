import { defineComponent } from "vue";
import { Avatar, Dropdown, Menu, Space } from "ant-design-vue";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons-vue";

import { avatar } from "@/utils/constant";

import styles from "./index.module.scss";
import type { MenuInfo } from "ant-design-vue/lib/menu/src/interface";

export default defineComponent({
	setup() {
		const onSetting = (info: MenuInfo) => {
			console.log("setting:", info);
		};

		const renderMenu = () => {
			return (
				<Menu onClick={onSetting}>
					<Menu.Item key={1}>
						<Space size={5}>
							<UserOutlined />
							个人中心
						</Space>
					</Menu.Item>
					<Menu.Item key={2}>
						<Space size={5}>
							<SettingOutlined />
							个人设置
						</Space>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key={3}>
						<Space size={5}>
							<LogoutOutlined />
							退出登录
						</Space>
					</Menu.Item>
				</Menu>
			);
		};
		return () => {
			return (
				<Dropdown trigger={["hover"]} overlay={renderMenu()}>
					<div>
						<Avatar size={"small"} src={avatar} /> Admin
					</div>
				</Dropdown>
			);
		};
	}
});
