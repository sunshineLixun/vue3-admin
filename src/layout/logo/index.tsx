import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

import { LogoSrc } from "./constant";

import { Image } from "ant-design-vue";

import styles from './index.module.scss';


const Logo = defineComponent({
	setup() {
		return () => {
			return (
				<div class={styles['slider-logo']}>
					<RouterLink to={"/"}>
						<Image src={LogoSrc} preview={false} width={32} height={32} />
						<h1>Vue3 Admin</h1>
					</RouterLink>
				</div>
			);
		};
	}
});

export default Logo;
