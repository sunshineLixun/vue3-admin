import { defineComponent } from "vue";
import { Layout, Space } from "ant-design-vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import styles from "./index.module.scss";

const Header = defineComponent({
	props: {
		collapsed: {
			type: Boolean
		}
	},
	setup(ctx, { emit }) {
		const onMenuFold = () => {
			emit("onCollapsed", !ctx.collapsed);
		};

		return () => {
			return (
				<Layout.Header class={styles.header}>
					<Space size={20}>
						{ctx.collapsed ? (
							<MenuUnfoldOutlined class={styles["out-line"]} onClick={onMenuFold} />
						) : (
							<MenuFoldOutlined class={styles["out-line"]} onClick={onMenuFold} />
						)}
					</Space>
				</Layout.Header>
			);
		};
	}
});

export default Header;
