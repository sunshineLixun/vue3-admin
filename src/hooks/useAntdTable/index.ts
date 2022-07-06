import { unref, nextTick, watch, computed, shallowRef, ref } from "vue";
import type { Service, AntdTableResult, Data, Params, AntdTableOptions, FormParams } from "./types";
import { usePagination } from "../usePagination";
import { isEmpty } from "lodash";

export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const { form, ...rest } = options;

	const _data = shallowRef();
	const _loading = ref(true);
	const _current = ref(1);
	const _total = ref(0);
	const _pageSize = ref(rest.defaultPageSize);
	const _onChange = ref();

	const getFormInstance = async () => {
		await nextTick();
		const _form = unref(form);
		if (isEmpty(_form)) {
			console.log("未获取表单实例");
		}
		return _form;
	};

	const _sumbit = (formParams?: FormParams) => {
		const { data, loading, current, total, pageSize, onChange } = usePagination(service, {
			...(formParams || {}),
			...rest
		});
		watch([data, loading, current, total, pageSize], ([newData, newLoading, newCurr, newTotal, newPageSize]) => {
			_data.value = newData;
			_loading.value = newLoading;
			_current.value = newCurr;
			_total.value = newTotal;
			_pageSize.value = newPageSize;
			_onChange.value = onChange;
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

	watch(_data, newVal => {
		console.log(newVal);
	});

	const tableProps = computed(() => {
		return {
			dataSource: _data.value?.itemList,
			loading: _loading.value,
			onChange: _onChange.value,
			pagination: {
				current: _current.value,
				total: _total.value,
				pageSize: _pageSize.value
			}
		};
	});

	return {
		tableProps,
		search: {
			onSumbit,
			onReset
		}
	} as AntdTableResult;
};
