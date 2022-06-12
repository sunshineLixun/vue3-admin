import { defineComponent, PropType } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";

const MyIconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

const Iconfont = defineComponent({
	props: {
		type: {
			type: String as PropType<string>,
			default: ""
		},
		color: {
			type: String as PropType<string>,
			default: "unset"
		},
		size: {
			type: [Number, String] as PropType<number | string>,
			default: 14
		}
	},
	setup(props, { attrs }) {
		const { type } = props;
		return () => {
			return <MyIconFont type={type} {...attrs} />;
		};
	}
});

export default Iconfont;
