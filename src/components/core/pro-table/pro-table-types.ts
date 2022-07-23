import { tableProps } from "ant-design-vue/es/table";
import type { PropType, ExtractPropTypes } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { BaseFormPropsType } from "../base-form/base-from-types";

export const proTableProps = {
	...tableProps(),
	/**表单数据配置 */
	formProps: {
		type: Object as PropType<BaseFormPropsType>,
		default: () => {}
	},
	/**表格列配置 */
	columns: {
		type: Array as PropType<ColumnsType>,
		required: true,
		default: () => []
	}
};

export type PropTypeProps = ExtractPropTypes<typeof proTableProps>;
