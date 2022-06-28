import { message } from "ant-design-vue";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import type { CommonResult, ResponsetData } from "./interface";
import { ResultEnum } from "@/enum/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { isNullOrUnDef } from "@/utils/is";

const config: AxiosRequestConfig = {
	timeout: 60000,
	withCredentials: false
	// ... 其他配置
};

export interface RequestOptions {
	isMock: boolean;
}

class HttpRequest {
	private static instance: HttpRequest;
	private service: AxiosInstance;
	private options?: RequestOptions;
	// TODO: 取消请求
	private controller = new AbortController();
	private constructor(config: AxiosRequestConfig, options?: RequestOptions) {
		this.service = axios.create({
			baseURL: options?.isMock ? import.meta.env.VITE_MOCK_API : import.meta.env.VITE_BASE_API,
			...config,
			signal: this.controller.signal
		});
		this.options = options;
		this.setInterceptorsRequest();
		this.setInterceptorsResponse();
	}

	public static getInstance(config: AxiosRequestConfig, options?: RequestOptions) {
		if (!HttpRequest.instance) {
			HttpRequest.instance = new HttpRequest(config, options);
		}
		return HttpRequest.instance;
	}

	/**
	 * @description 请求拦截器
	 */
	private setInterceptorsRequest() {
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// 添加header信息
				return { ...config };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	/**
	 * @description 响应拦截器
	 */
	private setInterceptorsResponse() {
		this.service.interceptors.response.use(
			(response: AxiosResponse<CommonResult>) => {
				const { data } = response;
				// 全局处理错误信息
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// 登录信息失效处理
				// 伪代码
				/** 
				if (data.code === 600) {
					// 清除缓存 路由跳转到登录页
					Stroage.removeAll()
					router.replace({
						path: "/login"
					})
					return Promise.reject(data);
				}
				*/
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				// 全局处理错误状态码toast提醒
				if (response && !isNullOrUnDef(response.status)) {
					return checkStatus(response.status);
				}
				return Promise.reject(error);
			}
		);
	}

	get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponsetData<T>> {
		return this.service.get(url, config);
	}

	post<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResponsetData<T>> {
		return this.service.post(url, params, config);
	}

	put<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResponsetData<T>> {
		return this.service.put(url, params, config);
	}

	delete<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResponsetData<T>> {
		return this.service.delete(url, { data: params, ...config });
	}
}

export const useService = (options: RequestOptions) => {
	return HttpRequest.getInstance(config, options);
};

export const service = HttpRequest.getInstance(config);
