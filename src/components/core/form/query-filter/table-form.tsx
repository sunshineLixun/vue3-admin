import { defineComponent, unref } from "vue";
import { Row, Col, Form } from "ant-design-vue";
import Action from "./components/form-action/action.vue";
import { BaseForm } from "@/components/core/form/base-form";
import { useTableFromState } from "./hooks/useTableFromState";
import { tableFormProps } from "./types";
import styles from "./table-form.module.scss";

const QueryFilter = defineComponent({
	props: tableFormProps,
	setup(props, { attrs, expose, slots }) {
		const state = useTableFromState({ props, attrs, slots });

		const { baseFromRef, getFormProps, collapsed, spanSize, offset, doms, needCollapseRender } = state;

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
								<Action collapsed={unref(collapsed)} collapseRender={unref(needCollapseRender)} onCollapsed={onCollapsed} />
							</Form.Item>
						</Col>
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
						default: FormContent
					}}
					{...getFormProps.value}
				></BaseForm>
			);
		};
	}
});

export { QueryFilter };
