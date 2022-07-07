import { merge } from "lodash";
import { ref, computed } from "@vue/reactivity";
import type { PaginationOptions, Data, Params } from "./types";
import type { Service, PaginationResult } from "./types";
import { useRequest } from "../useRequest";

export function usePagination<TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: PaginationOptions<TParams> = {}
): PaginationResult<TData> {
	let { defaultPageSize = 10, defaultParams = [], ...rest } = options;
	const current = ref(1);
	const pageSize = ref(defaultPageSize);

	const params = computed(() =>
		merge(defaultParams, [
			{
				current: current.value,
				pageSize: pageSize.value,
				...rest
			}
		] as Params)
	);

	const { data, error, loading } = useRequest(service, params);

	const total = computed(() => data.value?.total || 0);

	const onChange = (page: number, size: number) => {
		current.value = page;
		pageSize.value = size;
	};

	const onShowSizeChange = (c: number, size: number) => {
		onChange(c, size);
	};

	return {
		current,
		pageSize,
		data,
		loading,
		total,
		error,
		change: onChange,
		showSizeChange: onShowSizeChange
	};
}
