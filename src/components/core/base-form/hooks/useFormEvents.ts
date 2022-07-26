import type { BaseFromEmits } from "../base-from-types";
import type { FormState } from "./index";
import type { FormMethods } from "./useFormMethods";

export type EventsParams = FormState & {
	emit: EmitFn<BaseFromEmits>;
	handleFormValues: FormMethods["handleFormValues"];
};

export const useFromEvents = (params: EventsParams) => {
	const { emit, fromInstanceRef, handleFormValues } = params;
	/**
	 * 校验表单数据
	 */
	const validate = () => {
		return fromInstanceRef?.value?.validate();
	};
	const handleSumbit = async () => {
		try {
			const values = await validate();
			if (values) {
				const res = handleFormValues(values);
				emit("sumbit", res);
			}
		} catch (error) {
			return Promise.reject(error);
		}
	};
	return {
		handleSumbit
	};
};
