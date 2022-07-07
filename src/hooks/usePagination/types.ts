import type { Ref } from "vue";
import type { Options, Result } from "../useRequest/types";
import type { ResponsetData } from "@/api/interface";

export type Data = {
	itemList: any[];
	total: number;
};

export type Params = [
	{
		current?: number;
		pageSize?: number;
		sorter?: any;
		filter?: any;
		[key: string]: any;
	},
	...any[]
];
export type Service<TData extends Data, TParams extends Params> = (...args: TParams) => Promise<ResponsetData<TData>>;

export interface PaginationOptions<TParams extends Params> extends Options<TParams> {
	defaultPageSize?: number;
}

export interface PaginationResult<TData extends Data> extends Result<TData> {
	current: Ref<number>;
	total: Ref<number>;
	pageSize: Ref<number>;
	change: (page: number, pageSize: number) => void;
	showSizeChange: (current: number, size: number) => void;
}
