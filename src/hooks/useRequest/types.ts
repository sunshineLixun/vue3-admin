import type { ShallowRef, Ref } from "vue";
import type { ResponsetData } from "@/api/interface";

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<ResponsetData<TData>>;

export type Options<TParams extends any[]> = {
	defaultParams?: TParams;
	[key: string]: any;
};

// export interface FetchState<TData, TParams> {
// 	loading: boolean;
// 	params: TParams;
// 	data: TData;
// 	error: Error;
// }

export interface Result<TData> {
	loading: Ref<boolean>;
	data: ShallowRef<TData>;
	error: Ref<string>;
}
