import type { MockMethod } from "vite-plugin-mock";
export default [
	{
		url: "/mock-api/userList",
		timeout: 1000,
		method: "get",
		response: {
			code: 0,
			msg: "",
			data: {
				total: 100,
				itemList: [
					{
						id: 1,
						name: "vite"
					}
				]
			}
		}
	}
] as MockMethod[];
