import { useRequest } from "../useRequest";
import type { Service } from "../useRequest/types";
import type { Data, Params, AntdTableOptions } from "./types";

export const useAntdTable = <TData extends Data<any>, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams>
) => {
	const { data } = useRequest(service, {
		params: options.params
	});
	// TODO
	console.log(data.value.itemList);
};
