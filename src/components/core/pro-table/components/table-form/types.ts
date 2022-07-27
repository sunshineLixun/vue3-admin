import type { ExtractPropTypes, PropType } from "vue";
import { baseFormProps } from "@/components/core/base-form/types";
import type TableForm from "./table-form.vue";

export const baseFormPropsKeys = Object.keys(baseFormProps);

export const tableFormProps = {
	...baseFormProps,
	collapsed: {
		type: Boolean as PropType<boolean>,
		default: false
	}
};
export type TableFormProps = Partial<ExtractPropTypes<typeof tableFormProps>>;
export type TablePormInstance = InstanceType<typeof TableForm>;
