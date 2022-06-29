import type { ShallowRef, Ref } from "vue";
import type { ResponsetData } from "@/api/interface";

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<ResponsetData<TData>>;

export type Options<TParams extends any[]> = {
	defaultParams?: TParams;
};

// export interface FetchState<TData, TParams> {
// 	loading: boolean;
// 	params: TParams;
// 	data: TData;
// 	error: Error;
// }

export type Result<TData> = {
	loading: Ref<boolean>;
	data: ShallowRef<TData>;
	error: Ref<string>;
};

export type EffectResult<TData> = {
	effecLoading: Ref<boolean>;
	effectData: ShallowRef<TData>;
	effecError: Ref<string>;
};
