import { isRef, Ref, ref, shallowRef, unref, watchEffect } from "vue";
import type { UnwrapRef } from "vue";
import { AxiosError } from "axios";
import type { Service, Options, Result } from "./types";

export const useRequest = <TData, TParams extends any[]>(
	service: Service<TData, TParams>,
	options?: Options<TParams> | Ref<UnwrapRef<TParams> | any[]>
) => {
	const data = shallowRef<TData>();
	const error = ref("");
	const loading = ref(false);

	async function doFetch() {
		error.value = "";
		loading.value = true;
		const defaultParams = isRef(options) ? unref(options) : options?.defaultParams || ([] as any);

		try {
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
	}
	if (isRef(options)) {
		watchEffect(doFetch);
	} else {
		doFetch();
	}
	return { data, error, loading } as Result<TData>;
};
