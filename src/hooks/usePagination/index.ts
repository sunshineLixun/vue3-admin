import type { PaginationOptions, Data, Params } from "./types";
import type { Service } from "../useRequest/types";
import { useRequest } from "../useRequest";

export function usePagination<TData extends Data, TParams extends Params>(
	service: Service<TData, TParams>,
	options: PaginationOptions<TParams> = {}
) {
	const { defaultParams } = options;
	const { data } = useRequest(service);
	console.log(defaultParams, data);
}
