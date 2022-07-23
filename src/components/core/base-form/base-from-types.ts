import type { PropType, ExtractPropTypes } from "vue";
import { formProps, type FormProps } from "ant-design-vue/es/form";

export const baseFormProps = {
	...formProps(),
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	},
	formModel: {
		type: Object as PropType<Recordable>,
		default: () => {}
	},
	onFinish: {
		type: Function as PropType<(values: any) => void>
	}
};

export type BaseFormPropsType = ExtractPropTypes<typeof baseFormProps>;
