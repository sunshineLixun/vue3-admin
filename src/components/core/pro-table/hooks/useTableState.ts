import { ref, shallowRef } from "vue";
import type { TableFromInstance } from "../components/table-form/hooks/useTableFromState";
import type { TableProps } from "ant-design-vue";
import type { ProTableProps } from "../types";

export type Pagination = TableProps["pagination"];

export type UseProTableStateParams = {
	props: ProTableProps;
};

export const useProTableState = ({ props }: UseProTableStateParams) => {
	const tableFromRef = ref<TableFromInstance>();
	const dataSource = shallowRef();
	const loading = ref(false);
	const paginationRef = ref<NonNullable<Pagination>>(false);

	// TODO: 分页处理
	// 如果用户没有传分页
	if (props.pagination !== false) {
		paginationRef.value = {
			current: 1,
			pageSize: 10,
			total: 0,
			pageSizeOptions: ["10", "20", "50", "100"],
			showQuickJumper: true,
			showSizeChanger: true
		};
	}
	return {
		tableFromRef,
		dataSource,
		loading,
		paginationRef
	};
};

export type UseTableState = ReturnType<typeof useProTableState>;
