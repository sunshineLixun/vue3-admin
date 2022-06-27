import type { MockMethod } from "vite-plugin-mock";
export default [
	{
		url: "/mock-api/userList",
		timeout: 1000,
		method: "get",
		response: () => {
			return {
				code: 0,
				msg: "",
				data: {
					total: 1,
					itemList: [
						{
							id: 1,
							name: "vit"
						}
					]
				}
			};
		}
	}
] as MockMethod[];
