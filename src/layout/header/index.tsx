import { defineComponent } from "vue";
import { Layout, Space } from "ant-design-vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import styles from "./index.module.scss";

const Header = defineComponent({
	props: {
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	emits: {
		onCollapsed: (collapsed: boolean) => void 0
	},
	setup(props, { emit }) {
		const { collapsed } = props;
		const onMenuFold = () => {
			emit("onCollapsed", !props.collapsed);
		};

		return () => {
			return (
				<Layout.Header class={styles.header}>
					<Space size={20}>
						{collapsed ? (
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
