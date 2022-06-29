import { useRequest } from "../useRequest";
import type { Service } from "../useRequest/types";
import type { Data, Params, AntdTableOptions } from "./types";

export const useAntdTable = <TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams> = {}
) => {
	const { form } = options;
	console.log(form);
	const { data, loading } = useRequest(service, {
		defaultParams: options.defaultParams
	});

	// TODO: pagination form 把请求放入usePagination中
	return {
		data,
		loading
	};
};
