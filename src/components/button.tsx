import { useStorage } from "@/hooks/useStorage";
import { defineComponent, reactive, toRaw, toRefs } from "vue";
import styles from "./button.module.less";

export type DataSource = {
	id: number;
	title: string;
};

const Button = defineComponent({
	props: {
		title: String
	},
	setup(props, { attrs, slots, emit, expose }) {
		const data = useStorage("todo", []);
		const list = reactive<DataSource[]>(data.value);

		const onAdd = () => {
			list.push({
				id: 1,
				title: "js"
			});
		};

		const onEmit = () => {
			emit("add", list);
		};

		return () => {
			return (
				<div class={styles.from}>
					{props.title}
					<button onClick={onAdd}>+</button>
					<button onClick={onEmit}>emit</button>
					<ul>
						{list.map(item => {
							return <li key={item.id}>{item.title}</li>;
						})}
					</ul>
				</div>
			);
		};
	}
});

export default Button;
