import { useStorage } from "@/hooks/useStorage";
import { defineComponent, reactive, toRaw, toRefs } from "vue";
import { DatePicker } from "ant-design-vue";
import styles from "./button.module.scss";

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
				<>
					<DatePicker></DatePicker>
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
				</>
			);
		};
	}
});

export default Button;
