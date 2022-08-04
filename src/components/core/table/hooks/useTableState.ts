import { ref, shallowRef, computed, unref } from "vue";
import type { TableFromInstance } from "../components/table-form/hooks/useTableFromState";
import type { TableProps } from "ant-design-vue";
import type { ProTableProps } from "../types";
import { omit } from "lodash";

export type Pagination = TableProps["pagination"];

export type UseProTableStateParams = {
	props: ProTableProps;
};

export const useProTableState = ({ props }: UseProTableStateParams) => {
	const tableFromRef = ref<TableFromInstance>();
	const dataSource = shallowRef<any[]>([]);
	const loadingRef = ref(false);
	const paginationRef = ref<NonNullable<Pagination>>(false);

	// table是否分页
	if (props.pagination !== false) {
		paginationRef.value = {
			current: 1,
			pageSize: 10,
			total: 0,
			pageSizeOptions: ["10", "20", "50", "100"],
			showQuickJumper: true,
			showSizeChanger: true,
			// 如果用户传有自定义的pagination，可以替换上面初始化的值，如果没有就用默认值
			...props.pagination
		};
	}

	const getProps = computed(() => {
		return { ...props };
	});

	const getTableProps = computed(() => {
		const props = unref(getProps);
		let propsData: Recordable = {
			...props,
			rowKey: props.rowKey ?? "id",
			loading: unref(loadingRef),
			tableLayout: "fixed",
			pagination: unref(paginationRef)
		};

		propsData = omit(propsData, ["class", "onChange"]);
		return propsData;
	});

	const getFormProps = computed(() => {
		const props = unref(getProps);
		return {
			...props.formProps,
			loading: unref(loadingRef)
		};
	});

	return {
		tableFromRef,
		dataSource,
		loadingRef,
		paginationRef,
		getProps,
		getTableProps,
		getFormProps
	};
};

export type UseTableState = ReturnType<typeof useProTableState>;
