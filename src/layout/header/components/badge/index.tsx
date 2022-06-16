import { defineComponent } from "vue";
import { Badge, Dropdown } from "ant-design-vue";
import { BellOutlined } from "@ant-design/icons-vue";
import Notification from "./notification";

import styles from "./index.module.scss";

export default defineComponent({
	props: {
		count: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		const onVisibleChange = (visible: boolean) => {
			console.log(visible);
		};
		return () => {
			return (
				<Dropdown
					trigger={["click"]}
					onVisibleChange={onVisibleChange}
					overlay={
						<div class={styles.overlay}>
							<Notification />
						</div>
					}
				>
					<Badge class={styles.badge} count={props.count} offset={[-3, 0]}>
						<BellOutlined style="font-size: 18px" />
					</Badge>
				</Dropdown>
			);
		};
	}
});
