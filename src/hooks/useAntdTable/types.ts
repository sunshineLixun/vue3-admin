import type { FormInstance } from "ant-design-vue";
import type { Options } from "../useRequest/types";

// 表格返回数据解构
export type Data<T> = {
	itemList: T[];
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

export interface AntdTableOptions<TParams extends Params> extends Options<TParams> {
	form?: FormInstance;
}
