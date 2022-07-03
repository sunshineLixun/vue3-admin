import { ref } from "vue";
import { merge } from "lodash";
import { computed } from "@vue/reactivity";
import type { FilterValue, SorterResult } from "ant-design-vue/es/table/interface";
import type { TablePaginationConfig, TableProps } from "ant-design-vue";
import type { PaginationOptions, Data, Params } from "./types";
import type { Service, PaginationResult, RecordType } from "./types";
import { useRequest } from "../useRequest";

export function usePagination<TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: PaginationOptions<TParams> = {}
) {
	let { defaultPageSize = 10, defaultParams } = options;
	const current = ref(1);
	const pageSize = ref(defaultPageSize);

	const params = computed(() =>
		merge(defaultParams, [
			{
				current: current.value,
				pageSize: pageSize.value
			}
		])
	);
	const { data, loading } = useRequest(service, params);

	const total = computed(() => data.value?.total || 0);

	const onChange: TableProps["onChange"] = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
	) => {
		console.log(pagination, filters, sorter);
		current.value = pagination.current || 0;
		pageSize.value = pagination.pageSize || defaultPageSize;
	};

	const showSizeChange = (current: number, size: number) => {
		console.log(current, size);
	};

	return {
		data,
		loading,
		total,
		current,
		pageSize,
		change: onChange,
		showSizeChange
	} as PaginationResult<TData>;
}
