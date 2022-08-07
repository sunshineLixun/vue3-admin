import type { ExtractPropTypes, PropType } from "vue";
import type { CSSProperties } from "@vue/runtime-dom";
import { baseFormProps } from "@/components/core/form/base-form/types";
import type { QueryFilter } from "./table-form";
import type { FormProps } from "ant-design-vue/es/form";
import type { RowProps } from "ant-design-vue/lib/grid/Row";
import type { ButtonProps } from "ant-design-vue";

export const baseFormPropsKeys = Object.keys(baseFormProps);

export const tableFormProps = {
	...baseFormProps,
	/**表单布局 */
	layout: {
		type: String as PropType<FormProps["layout"]>,
		default: "horizontal"
	},
	/**表单gutter */
	searchGutter: {
		type: Number as PropType<RowProps["gutter"]>,
		default: 24
	},
	/** 自定义样式 */
	style: {
		type: Object as PropType<CSSProperties>
	},
	/**表单项宽度 */
	span: {
		type: Number as PropType<number>
	},
	/**自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 */
	defaultColsNumber: {
		type: Number as PropType<number>
	},
	/** 是否折叠超出的表单项，用于受控模式*/
	collapsed: {
		type: Boolean as PropType<boolean>
	},
	/**默认状态下是否折叠超出的表单项 */
	defaultCollapsed: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	/**是否能够查询收起的数据，如果设置为 false，收起后的表单数据将会丢失 */
	preserve: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	/** 提交按钮的props*/
	submitButtonProps: {
		type: Object as PropType<ButtonProps>
	}
};
export type TableFormProps = Partial<ExtractPropTypes<typeof tableFormProps>>;
export type TableFormInstance = InstanceType<typeof QueryFilter>;
