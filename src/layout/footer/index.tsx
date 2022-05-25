import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import styles from "./index.module.scss";

const Footer = defineComponent({
	setup() {
		return () => {
			return <Layout.Footer class={styles.footer}>Footer</Layout.Footer>;
		};
	}
});

export default Footer;
