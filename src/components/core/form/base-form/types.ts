import type { PropType, ExtractPropTypes } from "vue";
import { formProps, type FormProps } from "ant-design-vue/es/form";
import type BaseFrom from "./base-form.vue";
import { isObject } from "@/utils/is";
import { omit } from "lodash";

const _formProps = omit(formProps(), ["onFinish", "onSubmit"]);
export const aFormPropKeys = Object.keys(_formProps);

/** baseForm基础props */
export const baseFormProps = {
	..._formProps,
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	}
};

export const baseFromEmits = {
	/**表单提交 */
	finish: (fromModel: Recordable<any>) => isObject(fromModel),
	/**重置表单 */
	reset: (fromModel: Recordable<any>) => isObject(fromModel)
};

export type BaseFromEmits = typeof baseFromEmits;

// 属性全部转化为可选的
export type BaseFormPropsType = Partial<ExtractPropTypes<typeof baseFormProps>>;

export type BaseFromInstance = InstanceType<typeof BaseFrom>;
