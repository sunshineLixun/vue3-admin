import type { Ref } from "vue";
import type { FormInstance, TableProps } from "ant-design-vue";
import type { PaginationOptions } from "@/hooks/usePagination/types";
import type { ResponsetData } from "@/api/interface";

export type RecordType = any;

// 表格返回数据解构
export type Data = {
	itemList: any[];
	total: number;
};

export type Params = [
	{
		current?: number;
		pageSize?: number;
		[key: string]: any;
	},
	...any[]
];

export type FormParams = {
	[key: string]: any;
};

export type Service<TData extends Data, TParams extends Params> = (...args: TParams) => Promise<ResponsetData<TData>>;

export interface AntdTableOptions<TParams extends Params> extends PaginationOptions<TParams> {
	form?: Ref<FormInstance | undefined>;
}

export type AntdTableProps = {
	dataSource: any[];
	loading: boolean;
	sorter?: any;
	filters?: any;
	pagination: {
		current: number;
		total: number;
		pageSize: number;
	};
};

export interface AntdTableResult {
	tableProps: Ref<AntdTableProps>;
	onChange: TableProps["onChange"];
	search: {
		onSumbit: () => void;
		onReset: () => void;
	};
}
