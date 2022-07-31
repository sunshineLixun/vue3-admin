import { defineComponent, ref } from "vue";
import { Row } from "ant-design-vue";
import Action from "./action.vue";
import { merge } from "lodash";
import { BaseForm } from "@/components/core/base-form";
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

		const doms = slots.formItem && slots.formItem();

		return () => {
			return (
				<BaseForm
					ref={baseFromRef}
					class={styles["search-form"]}
					v-slots={{
						formContent: () => (
							<>
								<Row gutter={[8, 0]}>{doms}</Row>
								<Row gutter={24} justify={"end"}>
									<Action collapsed={collapsed.value} onCollapsed={onCollapsed} />
								</Row>
							</>
						)
					}}
					{...rest}
				></BaseForm>
			);
		};
	}
});

export { TableForm };
