import type { Ref } from "vue";
import type { FormInstance, TableProps } from "ant-design-vue";
import type { PaginationOptions } from "@/hooks/usePagination/types";
import type { ResponsetData } from "@/api/interface";

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

export interface AntdTableResult {
	tableProps: Ref<{
		dataSource: any[] | undefined;
		loading: boolean;
		onChange: TableProps["onChange"];
		pagination: {
			current: number;
			total: number;
			pageSize: number;
		};
	}>;
	search: {
		onSumbit: () => void;
		onReset: () => void;
	};
}
