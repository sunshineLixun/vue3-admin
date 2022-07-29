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
				total: 14,
				itemList: [
					{
						id: 1,
						name: "vite"
					},
					{
						id: 2,
						name: "js"
					},
					{
						id: 3,
						name: "java"
					},
					{
						id: 4,
						name: "vue"
					},
					{
						id: 5,
						name: "react"
					},
					{
						id: 6,
						name: "webpack"
					},
					{
						id: 7,
						name: "babel"
					},
					{
						id: 8,
						name: "loadsh"
					},
					{
						id: 9,
						name: "echarts"
					},
					{
						id: 10,
						name: "rollup"
					},
					{
						id: 11,
						name: "esbuild"
					},
					{
						id: 12,
						name: "angular"
					},
					{
						id: 13,
						name: "go"
					},
					{
						id: 14,
						name: "rust"
					}
				]
			}
		}
	}
] as MockMethod[];
