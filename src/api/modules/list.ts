import http from "../index";
import type { SelectOptionData } from "../interface";
import { List } from "../interface/modules/list";

export const listApi = (params: List.ListParams) => {
	return http.get<List.ListResponse>(List.url, params, {
		transformResponse: data => {
			console.log(JSON.parse(data));
			return data;
		}
	});
};

export const selectListApi = () => {
	return http.get<SelectOptionData[]>(List.selectUrl);
};
