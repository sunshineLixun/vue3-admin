import type { ExtractPropTypes, PropType } from "vue";
import { baseFormProps } from "@/components/core/form/base-form/types";
import type TableForm from "./table-form.vue";
import { formProps, type FormProps } from "ant-design-vue/es/form";
import type { RowProps } from "ant-design-vue/lib/grid/Row";

export const baseFormPropsKeys = Object.keys(baseFormProps);

export const tableFormProps = {
	...formProps(),
	collapsed: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	},
	searchGutter: {
		type: Number as PropType<RowProps["gutter"]>,
		default: [8, 0]
	}
};
export type TableFormProps = Partial<ExtractPropTypes<typeof tableFormProps>>;
export type TablePormInstance = InstanceType<typeof TableForm>;
