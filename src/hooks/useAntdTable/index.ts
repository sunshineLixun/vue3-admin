import type { Service } from "./types";
import type { Data, Params, AntdTableOptions } from "./types";
import { usePagination } from "../usePagination";
import { computed } from "@vue/reactivity";
export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const { form } = options;
	console.log(form);
	const { data, loading, total, current, pageSize, change } = usePagination(service);

	const tableProps = computed(() => {
		return {
			dataSource: data.value?.itemList,
			loading: loading.value,
			onChange: change,
			pagination: {
				current: current.value,
				total: total.value,
				pageSize: pageSize.value
			}
		};
	});
	return {
		tableProps
	};
};
