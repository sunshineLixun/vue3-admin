业务模块定义入参、出参的地方

├─ modules
│  ├─ login                
│  ├─ user              

例如：

login.ts

```js
export interface LoginParams {
	name: string;
	pwd: string;
}

export interface LoginResponse {
	success: boolean;
}
```


user.ts

```js
export interface UserInfo {
	name: string;
	age: number;
	gender: boolean;
	avatar: string;
}
```
