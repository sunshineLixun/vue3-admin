import type { ProTableProps } from "../types";
import type { UseTableState } from "./useTableState";

export type UseTableMethodsParams = {
	props: ProTableProps;
	state: UseTableState;
};

export function useTableMethods({ props, state }: UseTableMethodsParams) {
	const { dataSource, loading } = state;
	async function fetch(params = {}) {
		// TODO: merge page params
		const json = await props.requestApi?.(params).finally(() => (loading.value = false));
		dataSource.value = json?.data?.itemList;
	}

	function handleSumbit(params = {}) {
		fetch(params);
	}
	return { handleSumbit };
}
