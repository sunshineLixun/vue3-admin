import type { PropType, ExtractPropTypes } from "vue";
import { formProps, type FormProps } from "ant-design-vue/es/form";
import type BaseFrom from "./base-form.vue";
import { isObject } from "@/utils/is";

export const baseFormProps = {
	...formProps(),
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	},
	formModel: {
		type: Object as PropType<Recordable>,
		default: () => {}
	}
};

export const baseFromEmits = {
	/**表单提交 */
	sumbit: (fromModel: Recordable<any>) => isObject(fromModel)
};

export type BaseFromEmits = typeof baseFromEmits;

export type BaseFormPropsType = ExtractPropTypes<typeof baseFormProps>;

export type BaseFromInstance = InstanceType<typeof BaseFrom>;
