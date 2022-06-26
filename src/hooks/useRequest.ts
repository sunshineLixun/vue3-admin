import { Ref, ref, shallowRef, watchEffect } from "vue";
import type { ResponsetData } from "@/api/interface";
import { AxiosError } from "axios";

export type APIType<P, R> = (params: P) => Promise<ResponsetData<R>>;

export const useRequest = <R, P = Partial<any>>(api: APIType<P, R>, params: P) => {
	const data = shallowRef<R>();
	const error = ref("");
	const loaded = ref(false);
	(async function () {
		try {
			const json = await api(params);
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
	return { data, error, loaded };
};

export const useWatchEffectRequest = <R, P = Partial<any>>(api: APIType<P, R>, params: Ref<P>) => {
	const effectData = shallowRef<R>();
	const effecError = ref("");
	const effecLoaded = ref(false);
	watchEffect(() => {
		const { data, error, loaded } = useRequest<R, P>(api, params.value);
		effectData.value = data.value;
		effecError.value = error.value;
		effecLoaded.value = loaded.value;
	});
	return {
		effectData,
		effecError,
		effecLoaded
	};
};
