// 公共响应数据解构
export interface CommonResult {
	code: number;
	msg: string;
}

// 求响应参数
export interface ResponsetData<T = any> extends CommonResult {
	data?: T;
}
