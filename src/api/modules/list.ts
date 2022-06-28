import { useService } from "../index";
import { List } from "../interface/modules/list";
const http = useService({
	isMock: true
});

export const listApi = (params: List.ListParams) => {
	return http.get<List.UserListData>(List.url, { params });
};
