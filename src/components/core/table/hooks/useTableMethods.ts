import { unref } from "vue";
import type { ProTableProps, TableChangeProps } from "../types";
import type { BaseFromInstance } from "@/components/core/form/base-form/types";
import type { UseTableState } from "./useTableState";
import { merge } from "lodash";
import { isObject } from "@/utils/is";

export type UseTableMethodsParams = {
	props: ProTableProps;
	state: UseTableState;
};

export function useTableMethods({ props, state }: UseTableMethodsParams) {
	const { tableFromRef, dataSource, loadingRef, paginationRef } = state;

	async function fetch(params = {}) {
		const pagination = unref(paginationRef);
		const enablePagination = isObject(pagination);

		// TODO: 传入自定义参数
		let queryParams = {
			// 第一次默认请求带上form表单数据，如果params有值，则替换默认的form表单数据
			...unref(props.formProps?.model),
			...params
		};
		// 如果有分页器
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

	async function getFormParams() {
		let params = {};
		if (tableFromRef.value) {
			// 获取表单数据
			const values = await (unref(tableFromRef)?.$refs.baseFromRef as BaseFromInstance)?.validate();
			if (values) {
				params = (unref(tableFromRef)?.$refs.baseFromRef as BaseFromInstance)?.handleFormValues(values) || {};
			}
		}
		return params;
	}

	function handleSumbit(params = {}) {
		fetch(params);
	}

	const onTableChange = async (...rest: TableChangeProps) => {
		const [pagination] = rest;
		let params = await getFormParams();
		paginationRef.value = merge(paginationRef.value, pagination);
		fetch(params);
	};

	const onReset = () => {
		fetch();
	};

	return {
		handleSumbit,
		fetch,
		onTableChange,
		onReset
	};
}
