import { reactive, ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import type { BaseFormPropsType } from "../base-from-types";

export type FormState = ReturnType<typeof useFormState>;

export type useFormStateParams = {
	props: BaseFormPropsType;
};

export const useFormState = ({ props }: useFormStateParams) => {
	const formModel = reactive({ ...props.formModel });
	const fromInstanceRef = ref<FormInstance>();
	return {
		formModel,
		fromInstanceRef
	};
};
