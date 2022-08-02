import { defineComponent, unref } from "vue";
import { Row, Col, Form } from "ant-design-vue";
import Action from "./action.vue";
import { merge } from "lodash";
import { BaseForm } from "@/components/core/form/base-form";
import { useTableFromState } from "./hooks/useTableFromState";
import { tableFormProps } from "./types";
import styles from "./table-form.module.scss";

const TableForm = defineComponent({
	props: tableFormProps,
	setup(props, { attrs, expose, slots }) {
		const state = useTableFromState({ props, attrs, slots });

		const { baseFromRef, getFormProps, collapsed, spanSize, offset, doms } = state;

		const onCollapsed = (_collapsed: boolean) => {
			collapsed.value = _collapsed;
		};

		const instance = {
			...state
		};

		expose(instance);

		const FormContent = () => {
			return (
				<>
					<Row gutter={props.searchGutter}>
						{unref(doms)}
						<Col offset={unref(offset)} span={unref(spanSize).span}>
							<Form.Item colon={false}>
								<Action collapsed={unref(collapsed)} onCollapsed={onCollapsed} />
							</Form.Item>
						</Col>
					</Row>
				</>
			);
		};

		const rest = merge(getFormProps.value);
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
