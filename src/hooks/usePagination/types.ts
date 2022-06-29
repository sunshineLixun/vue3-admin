import type { Options } from "../useRequest/types";

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

export interface PaginationOptions<TParams extends Params> extends Options<TParams> {
	defaultPageSize?: number;
}
