import { defineComponent } from "vue";
import { Badge } from "ant-design-vue";
import { BellOutlined } from "@ant-design/icons-vue";

export default defineComponent({
	props: {
		count: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		return () => {
			return (
				<Badge count={props.count} offset={[5, -5]}>
					<BellOutlined style="font-size: 16px" />
				</Badge>
			);
		};
	}
});
