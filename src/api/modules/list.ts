import { useService } from "../index";
import { List } from "../interface/modules/list";
const http = useService({
	isMock: true
});

export const listApi = () => {
	return http.get<List.UserListData>(List.url);
};
