import { useService } from "@/api";
import { Login } from "../interface/modules/login";

const http = useService({
	isMock: true
});

export const loginApi = (params: Login.LoginParams) => {
	return http.get<Login.LoginResponse>(Login.url, { params });
};
