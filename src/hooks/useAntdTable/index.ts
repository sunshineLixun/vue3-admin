import type { Service } from "./types";
import type { Data, Params, AntdTableOptions } from "./types";
import { usePagination } from "../usePagination";
import { ref } from "vue";

export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const pagination = ref({
		current: 1,
		total: 0,
		pageSize: 10
	});
	const { form } = options;
	console.log(form);
	const { data, loading, total, current, pageSize } = usePagination(service);

	pagination.value = {
		total: total.value,
		current: current.value,
		pageSize: pageSize.value
	};
	return {
		pagination,
		data,
		loading
	};
};
