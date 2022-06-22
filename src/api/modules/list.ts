import http from "../index";
import { List } from "../interface/modules/list";

export const listApi = (params: List.ListParams) => {
	return http.get<List.ListResponse>(List.url, params);
};
