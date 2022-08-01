import { defineComponent, ref, type VNode } from "vue";
import { Row, Col } from "ant-design-vue";
import Action from "./action.vue";
import { merge } from "lodash";
import { BaseForm } from "@/components/core/form/base-form";
import { useTableFromState } from "./hooks/useTableFromState";
import { tableFormProps } from "./types";
import styles from "./table-form.module.scss";

const TableForm = defineComponent({
	props: tableFormProps,
	setup(props, { attrs, slots, expose }) {
		const state = useTableFromState({ props, attrs });
		const { baseFromRef, getFormProps } = state;

		// TODO: 计算Col的offset
		const collapsed = ref(props.collapsed);

		const onCollapsed = (_collapsed: boolean) => {
			collapsed.value = _collapsed;
		};

		const instance = {
			...state
		};

		expose(instance);
		const rest = merge(getFormProps.value);

		// TODO: span offset
		const doms =
			slots.formItem &&
			slots.formItem().map(v => {
				const childrens = v.children as VNode[];
				return childrens.map(child => {
					const colItem = <Col span={3}>{child}</Col>;
					return colItem;
				});
			});

		const FormContent = () => {
			return (
				<>
					<Row gutter={props.searchGutter}>{doms}</Row>
					<Row gutter={24} justify={"end"}>
						<Action collapsed={collapsed.value} onCollapsed={onCollapsed} />
					</Row>
				</>
			);
		};

		return () => {
			return (
				<BaseForm
					ref={baseFromRef}
					class={styles["search-form"]}
					v-slots={{
						formContent: FormContent
					}}
					{...rest}
				></BaseForm>
			);
		};
	}
});

export { TableForm };
