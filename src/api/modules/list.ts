import { useService } from "../index";
import { List } from "../interface/modules/list";
// import type { Params } from "@/hooks/useAntdTable/types";

const http = useService({
	isMock: true
});

export const listApi = (params: { current: number; pageSize: number }) => {
	return http.get<List.UserListData>(List.url, {
		params
	});
};
