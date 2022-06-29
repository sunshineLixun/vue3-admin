import type { FormInstance } from "ant-design-vue";
import type { PaginationOptions } from "@/hooks/usePagination/types";

// 表格返回数据解构
export type Data = {
	itemList: any[];
	total: number;
};

export type Params = [
	{
		current: number;
		pageSize: number;
		[key: string]: any;
	},
	...any[]
];

export interface AntdTableOptions<TParams extends Params> extends PaginationOptions<TParams> {
	form?: FormInstance;
}
