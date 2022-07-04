import { computed } from "@vue/reactivity";
import type { Service, AntdTableResult } from "./types";
import type { Data, Params, AntdTableOptions } from "./types";
import { usePagination } from "../usePagination";

export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const { form, ...rest } = options;
	console.log(form);

	// TODO: form
	const { data, loading, total, current, pageSize, change } = usePagination(service, {
		...rest
	});

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
	} as AntdTableResult;
};
