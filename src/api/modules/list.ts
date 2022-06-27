import http from "../index";
import { List } from "../interface/modules/list";

export const listApi = () => {
	return http.get<List.UserListData>(List.url);
};
