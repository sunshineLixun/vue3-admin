export namespace Login {
	export const url = "/login";
	export interface LoginParams {
		name: string;
		pwd: string;
	}

	export interface LoginResponse {
		success: boolean;
	}
}
