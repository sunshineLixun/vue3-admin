import type { ShallowRef, Ref } from "vue";
import type { ResponsetData } from "@/api/interface";

export type Service<TData, TPrams = Partial<Record<string, any>>> = (params: TPrams) => Promise<ResponsetData<TData>>;

export type Options<TPrams> = {
	params: TPrams;
};

export interface FetchState<TData, TParams> {
	loading: boolean;
	params: TParams;
	data: TData;
	error: Error;
}

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
