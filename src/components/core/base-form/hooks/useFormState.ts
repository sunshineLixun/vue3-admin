import { reactive, ref, computed, type SetupContext } from "vue";
import type { FormInstance } from "ant-design-vue";
import type { BaseFormPropsType } from "../base-from-types";
import { cloneDeep } from "lodash";

export type FormState = ReturnType<typeof useFormState>;

export type useFormStateParams = {
	props: BaseFormPropsType;
	attrs: SetupContext["attrs"];
};

export const useFormState = ({ props, attrs }: useFormStateParams) => {
	const formPropsRef = ref<BaseFormPropsType>(cloneDeep(props));
	const formModel = reactive({ ...props.formModel });
	const formInstanceRef = ref<FormInstance>();

	const getFormProps = computed(() => {
		return {
			...attrs,
			...formPropsRef.value
		} as BaseFormPropsType;
	});

	return {
		formModel,
		formInstanceRef,
		getFormProps
	};
};
