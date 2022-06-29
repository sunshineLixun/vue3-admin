export namespace List {
	export const url = "/userList";

	export type UserListData = {
		itemList: UserListItem[];
		total: number;
	};

	export interface UserListItem {
		id: number;
		name: string;
	}
}
