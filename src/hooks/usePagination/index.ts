import { ref } from "vue";
import type { PaginationOptions, Data, Params } from "./types";
import type { Service, PaginationResult } from "./types";
import { useRequest } from "../useRequest";

export function usePagination<TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: PaginationOptions<TParams> = {}
) {
	const { defaultPageSize = 10 } = options;

	const current = ref(1);
	const total = ref(0);
	const pageSize = ref(defaultPageSize);

	const { data, loading } = useRequest(service, {
		defaultParams: [
			{
				current: current.value,
				pageSize: pageSize.value
			}
		]
	});
	if (data.value) {
		total.value = data.value.total;
	}

	const onChange = (page: number, _pageSize: number) => {
		let toCurrent = page <= 0 ? 1 : page;
		const toPageSize = _pageSize <= 0 ? 1 : _pageSize;
		const tempTotalPage = Math.ceil(total.value / toPageSize);
		if (toCurrent > tempTotalPage) {
			toCurrent = Math.max(1, tempTotalPage);
		}
		current.value = toCurrent;
		pageSize.value = toPageSize;
	};

	const showSizeChange = (current: number, size: number) => {
		console.log(current, size);
	};

	return {
		data,
		loading,
		current,
		total,
		pageSize,
		change: onChange,
		showSizeChange
	} as PaginationResult<TData>;
}
