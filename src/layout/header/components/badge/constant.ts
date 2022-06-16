interface TabProps {
	title: string;
	content: string;
	key: string;
}

export const pans: TabProps[] = [
	{
		title: "Notification",
		content: "Notification Content",
		key: "1"
	},
	{
		title: "Message",
		content: "Message Content",
		key: "2"
	},
	{
		title: "To Do",
		content: "To Do Content",
		key: "3"
	}
];
export interface DataItem {
	title: string;
	description: string;
}
export const listData: DataItem[] = [
	{
		title: "Ant Design Title 1",
		description: "description"
	},
	{
		title: "Ant Design Title 2",
		description: "description"
	},
	{
		title: "Ant Design Title 3",
		description: "description"
	},
	{
		title: "Ant Design Title 4",
		description: "description"
	}
];
