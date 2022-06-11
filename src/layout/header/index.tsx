import { defineComponent } from "vue";
import { Layout, Space } from "ant-design-vue";
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import styles from "./index.module.scss";

const Header = defineComponent({
	setup() {
		const onMenuFold = () => {
			console.log("fold");
		};
		return () => {
			return (
				<Layout.Header class={styles.header}>
					<Space size={20}>
						<solt>
							<MenuFoldOutlined class={styles["out-line"]} onClick={onMenuFold} />
						</solt>
					</Space>
				</Layout.Header>
			);
		};
	}
});

export default Header;
