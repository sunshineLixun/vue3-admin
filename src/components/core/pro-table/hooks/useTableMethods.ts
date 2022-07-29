import { unref } from "vue";
import type { ProTableProps } from "../types";
import type { UseTableState } from "./useTableState";
import { merge } from "lodash";
import { isObject } from "@/utils/is";
export type UseTableMethodsParams = {
	props: ProTableProps;
	state: UseTableState;
};

export function useTableMethods({ props, state }: UseTableMethodsParams) {
	const { dataSource, loadingRef, paginationRef } = state;

	async function fetch(params = {}) {
		const pagination = unref(paginationRef);
		const enablePagination = isObject(pagination);

		// TODO: 传入自定义参数
		let queryParams = {
			// 第一次默认请求带上form表单数据，如果params有值，则替换默认的form表单数据
			...unref(props.formProps?.model),
			...params
		};
		if (enablePagination) {
			queryParams = merge(queryParams, {
				current: pagination.current,
				pageSize: pagination.pageSize
			});
		}
		loadingRef.value = true;
		const json = await props.requestApi?.(queryParams).finally(() => (loadingRef.value = false));
		if (json?.data?.itemList) {
			dataSource.value = json.data.itemList;
		}

		if (enablePagination) {
			pagination.total = json?.data?.total;
		}
	}

	function handleSumbit(params = {}) {
		fetch(params);
	}
	return { handleSumbit, fetch };
}
