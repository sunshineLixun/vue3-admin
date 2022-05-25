import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import styles from "./index.module.scss";

const Header = defineComponent({
	setup() {
		return () => {
			return <Layout.Header class={styles.header}>Header</Layout.Header>;
		};
	}
});

export default Header;
