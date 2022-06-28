import { Ref, ref, shallowRef, watchEffect } from "vue";
import { AxiosError } from "axios";
import type { Service, Options, Result, EffectResult } from "./types";

export const useRequest = <TData, TPrams = Partial<Record<string, any>>>(
	service: Service<TData, TPrams>,
	options: Options<TPrams>
) => {
	const data = shallowRef<TData>();
	const error = ref("");
	const loading = ref(false);
	async function request() {
		loading.value = true;
		try {
			const json = await service(options.params);
			data.value = json.data;
		} catch (resError) {
			// fix: https://github.com/microsoft/TypeScript/issues/36775
			if (resError instanceof AxiosError) {
				error.value = resError.message;
			}
		} finally {
			loading.value = false;
		}
	}
	request();
	return { data, error, loading } as Result<TData | undefined>;
};

export const useWatchEffectRequest = <TData, TPrams = Partial<Record<string, any>>>(
	service: Service<TData, TPrams>,
	options: Ref<Options<TPrams>>
) => {
	const effectData = shallowRef<TData>();
	const effecError = ref("");
	const effecLoading = ref(false);
	watchEffect(() => {
		const { data, error, loading } = useRequest<TData, TPrams>(service, options.value);
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
