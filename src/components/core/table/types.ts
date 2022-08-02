import { tableProps } from "ant-design-vue/es/table";
import type { PropType, ExtractPropTypes } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { TableFormProps } from "@/components/core/form/query-filter/types";
import type { Service, Data, Params } from "@/hooks/useAntdTable/types";
import type { TableProps } from "ant-design-vue";

export const proTableProps = {
	...tableProps(),
	/**是否显示查询表单 */
	showSearch: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	/**表单数据配置 */
	formProps: {
		type: Object as PropType<TableFormProps>,
		default: () => ({})
	},
	/**表格列配置 */
	columns: {
		type: Array as PropType<ColumnsType>,
		required: true,
		default: () => []
	},
	/**表格接口请求 */
	requestApi: {
		type: Function as PropType<Service<Data, Params>>
	}
};

export type ProTableProps = Partial<ExtractPropTypes<typeof proTableProps>>;
export type FormProps = TableFormProps;

export type TableChangeProps = Parameters<NonNullable<TableProps["onChange"]>>;
