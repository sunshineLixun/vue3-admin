import type { PropType, ExtractPropTypes, VNode } from "vue";
import { formProps, type FormProps } from "ant-design-vue/es/form";
import type BaseFrom from "./base-form.vue";
import type { SubmitterProps } from "./components/submitter/types";

export const aFormPropKeys = Object.keys(formProps());

/** baseForm基础props */
export const commonFormProps = {
	...formProps(),
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	},
	submitter: {
		type: Object as PropType<false | SubmitterProps>
	},
	/**表单提交 */
	onFinish: {
		type: Function as PropType<(fromModel: Recordable<any>) => void>
	},
	/**重置表单 */
	onrReset: {
		type: Function as PropType<(fromModel: Recordable<any>) => void>
	}
};

export const baseFormProps = {
	...commonFormProps,
	contentRender: {
		type: Function as PropType<(items: VNode[], submitter: SubmitterProps | undefined) => VNode>
	},
	/** @name 是否回车提交 默认为true */
	isKeyPressSubmit: {
		type: Boolean as PropType<boolean>,
		default: true
	}
};
export type CommonFormProps = Partial<ExtractPropTypes<typeof commonFormProps>>;

// 属性全部转化为可选的
export type BaseFormPropsType = Partial<ExtractPropTypes<typeof baseFormProps>>;

export type BaseFromInstance = InstanceType<typeof BaseFrom>;
