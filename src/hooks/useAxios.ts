import { Ref, ref, watchEffect } from "vue";
import type { ResponsetData } from "@/api/interface";
import { AxiosError } from "axios";

type API<P, R> = (params: P) => Promise<ResponsetData<R>>;

export const useAxios = <P, R>(api: API<P, R>, params: Ref<P>) => {
	const data = ref<R>();
	const error = ref("");
	const loaded = ref(false);
	watchEffect(async () => {
		try {
			const json = await api(params.value);
			data.value = json.data;
		} catch (resError) {
			// fix: https://github.com/microsoft/TypeScript/issues/36775
			if (resError instanceof AxiosError) {
				error.value = resError.message;
			}
		} finally {
			loaded.value = true;
		}
	});
	return { data, error, loaded };
};
