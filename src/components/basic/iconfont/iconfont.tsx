import { defineComponent, PropType } from "vue";
import { createFromIconfontCN } from "@ant-design/icons-vue";

const MyIconFont = createFromIconfontCN({
	// 替换为自己项目的iconfont链接
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
		return () => {
			return <MyIconFont type={props.type} {...attrs} />;
		};
	}
});

export default Iconfont;
