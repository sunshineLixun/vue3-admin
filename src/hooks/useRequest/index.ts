import { Ref, ref, shallowRef, watchEffect } from "vue";
import { AxiosError } from "axios";
import type { Service, Options, Result, EffectResult } from "./types";

export const useRequest = <TData, TParams extends any[]>(service: Service<TData, TParams>, options?: Options<TParams>) => {
	const data = shallowRef<TData>();
	const error = ref("");
	const loading = ref(false);
	const defaultParams = options?.defaultParams || ([] as any);
	(async function () {
		loading.value = true;
		try {
			console.log(...defaultParams);
			const json = await service(...defaultParams);
			data.value = json.data;
		} catch (resError) {
			// fix: https://github.com/microsoft/TypeScript/issues/36775
			if (resError instanceof AxiosError) {
				error.value = resError.message;
			}
		} finally {
			loading.value = false;
		}
	})();
	return { data, error, loading } as Result<TData | undefined>;
};

export const useWatchEffectRequest = <TData, TParams extends any[]>(
	service: Service<TData, TParams>,
	options?: Ref<Options<TParams>>
) => {
	const effectData = shallowRef<TData>();
	const effecError = ref("");
	const effecLoading = ref(false);
	watchEffect(() => {
		const { data, error, loading } = useRequest<TData, TParams>(service, options?.value);
		effectData.value = data.value;
		effecError.value = error.value;
		effecLoading.value = loading.value;
	});
	return {
		effectData,
		effecError,
		effecLoading
	} as EffectResult<TData | undefined>;
};
