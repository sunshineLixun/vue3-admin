import { useService } from "@/api";
import { List } from "../interface/modules/list";
// import type { Params } from "@/hooks/useAntdTable/types";

const http = useService({
	isMock: true
});

export const listApi = (params: {}) => {
	return http.get<List.UserListData>(List.url, {
		params
	});
};
