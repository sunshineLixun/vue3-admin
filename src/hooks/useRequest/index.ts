import { Ref, ref, shallowRef, watchEffect } from "vue";
import { AxiosError } from "axios";
import type { Service, Options, Result, EffectResult } from "./types";

export const useRequest = <TData, TPrams = Partial<Record<string, any>>>(
	service: Service<TData, TPrams>,
	options: Options<TPrams>
) => {
	const data = shallowRef<TData>();
	const error = ref("");
	const loaded = ref(false);
	(async function () {
		try {
			const json = await service(options.params);
			data.value = json.data;
		} catch (resError) {
			// fix: https://github.com/microsoft/TypeScript/issues/36775
			if (resError instanceof AxiosError) {
				error.value = resError.message;
			}
		} finally {
			loaded.value = true;
		}
	})();
	return { data, error, loaded } as Result<TData>;
};

export const useWatchEffectRequest = <TData, TPrams = Partial<Record<string, any>>>(
	service: Service<TData, TPrams>,
	options: Ref<Options<TPrams>>
) => {
	const effectData = shallowRef<TData>();
	const effecError = ref("");
	const effecLoaded = ref(false);
	watchEffect(() => {
		const { data, error, loaded } = useRequest<TData, TPrams>(service, options.value);
		effectData.value = data.value;
		effecError.value = error.value;
		effecLoaded.value = loaded.value;
	});
	return {
		effectData,
		effecError,
		effecLoaded
	} as EffectResult<TData>;
};
