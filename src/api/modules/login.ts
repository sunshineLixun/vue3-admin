import http from "../index";
import { Login } from "../interface/modules/login";

export const loginApi = (params: Login.LoginParams) => {
	return http.get<Login.LoginResponse>(Login.url, { params });
};
