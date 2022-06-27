export namespace List {
	export const url = "/home/getItemsList";

	export const selectUrl = "https://jsonplaceholder.typicode.com/todos";
	export interface ListParams {
		page?: number;
		adv_flag?: number;
		left_type?: string;
		last_id?: number;
	}
	export interface ListResponse {
		dataList: any[];
	}
}