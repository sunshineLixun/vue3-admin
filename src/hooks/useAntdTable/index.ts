import { unref, nextTick, watch, ref } from "vue";
import type { TablePaginationConfig, TableProps } from "ant-design-vue";
import type { FilterValue, SorterResult } from "ant-design-vue/es/table/interface";
import type { Service, AntdTableResult, Data, Params, AntdTableOptions, FormParams, RecordType, AntdTableProps } from "./types";
import { useRequest } from "../useRequest";
import { isEmpty, merge } from "lodash";

export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const { form, defaultParams = [], defaultPageSize, ...rest } = options;

	const state = ref<AntdTableProps>({
		dataSource: [],
		loading: true,
		sorter: {},
		filters: {},
		pagination: {
			current: 1,
			total: 0,
			pageSize: defaultPageSize || 10
		}
	});

	const getFormInstance = async () => {
		await nextTick();
		const _form = unref(form);
		if (isEmpty(_form)) {
			console.log("未获取表单实例");
		}
		return _form;
	};

	const _sumbit = (formParams?: FormParams) => {
		state.value.loading = true;
		const params = merge(defaultParams, [
			{
				current: unref(state.value.pagination.current),
				pageSize: unref(state.value.pagination.pageSize),
				...(formParams || {}),
				...rest
			}
		] as Params);
		const { data, loading } = useRequest(service, params);
		watch([data, loading], ([newData, newLoading]) => {
			state.value.dataSource = newData.itemList;
			state.value.loading = newLoading;
		});
	};
	const validateFields = async (isReset: boolean = false) => {
		const formInstance = await getFormInstance();
		if (formInstance) {
			isReset && formInstance.resetFields();
			formInstance
				.validateFields()
				.then((values = {}) => {
					_sumbit(values);
				})
				.catch(err => err);
		}
	};

	if (form) {
		validateFields();
	} else {
		_sumbit();
	}

	const onSumbit = () => {
		validateFields();
	};

	const onReset = () => {
		validateFields(true);
	};

	const onChange: TableProps["onChange"] = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
	) => {
		state.value.pagination.current = pagination.current || 0;
		state.value.pagination.pageSize = pagination.pageSize || 10;
		state.value.sorter = sorter;
		state.value.filters = filters;
		onSumbit();
	};
	return {
		tableProps: state,
		onChange,
		search: {
			onSumbit,
			onReset
		}
	} as AntdTableResult;
};
