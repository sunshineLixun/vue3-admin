import { unref } from "vue";
import type { FormState } from "./index";
import type { FormMethods } from "./useFormMethods";
import type { NamePath } from "ant-design-vue/lib/form/interface";
import type { BaseFormPropsType } from "../types";

export type EventsParams = FormState & {
	props: BaseFormPropsType;
	handleFormValues: FormMethods["handleFormValues"];
};

export type FormEvents = ReturnType<typeof useFromEvents>;

export const useFromEvents = (params: EventsParams) => {
	const { formInstanceRef, handleFormValues, model, props } = params;
	/**
	 * 校验表单数据
	 */
	const validate = async (nameList?: NamePath[] | undefined) => {
		return unref(formInstanceRef)?.validate(nameList);
	};

	/**
	 * 表单提交
	 */
	const handleSubmit = async () => {
		try {
			const values = await validate();
			if (values) {
				const res = handleFormValues(values);
				props.onFinish?.(res);
			}
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * 重置整个表单
	 */
	const resetForm = () => {
		resetFields();
	};

	/** 重置表单某一项或者整个表单 */
	const resetFields = (name?: NamePath) => {
		// TODO: 恢复默认值
		unref(formInstanceRef)?.resetFields(name);
		emit("reset", model);
	};

	return {
		submit: handleSubmit,
		validate,
		resetFields,
		resetForm
	};
};
