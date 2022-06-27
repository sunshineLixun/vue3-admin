import { useRequest } from "../useRequest";
import type { Service } from "../useRequest/types";
import type { Data, Params, AntdTableOptions, ListItem } from "./types";

const useAntdTable = <TData extends Data<ListItem>, TParams extends Params>(
	service: Service<TData, TParams>,
	options: AntdTableOptions<TParams>
) => {
	const { data } = useRequest(service, {
		params: options.params
	});
	// TODO
	console.log(data.value.itemList);
};

export default useAntdTable;
