import { ref, shallowRef } from "vue";
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
