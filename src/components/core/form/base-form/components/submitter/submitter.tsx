import { defineComponent } from "vue";
import { submitterProps } from "./types";
import { Button, Space } from "ant-design-vue";
import { omit } from "lodash";

const Submitter = defineComponent({
	props: submitterProps(),
	setup(props) {
		return () => {
			const { onSubmit, onReset, searchConfig, submitButtonProps = {}, resetButtonProps = {}, render } = props;
			if (render === false) {
				return null;
			}
			const { submitText = "提交", resetText = "重置" } = searchConfig || {};

			const submit = () => {
				onSubmit?.();
			};
			const reset = () => {
				onReset?.();
			};

			let doms: JSX.Element[] = [];
			if (submitButtonProps !== false) {
				doms.push(
					<Button
						type={"primary"}
						key="submit"
						{...(omit(submitButtonProps), ["preventDefault"])}
						onClick={e => {
							if (!submitButtonProps.preventDefault) {
								submit();
							}
							submitButtonProps?.onClick?.(e);
						}}
					>
						{submitText}
					</Button>
				);
			}

			if (resetButtonProps !== false) {
				doms.push(
					<Button
						key="reset"
						{...omit(resetButtonProps, ["preventDefault"])}
						onClick={e => {
							if (!resetButtonProps.preventDefault) {
								reset();
							}
							resetButtonProps.onClick?.(e);
						}}
					>
						{resetText}
					</Button>
				);
			}

			const renderDom = render ? render({ ...props }, doms) : doms;
			if (Array.isArray(renderDom)) {
				if (renderDom.length === 0) {
					return null;
				}
				if (renderDom.length === 1) {
					return renderDom[0];
				}
				return <Space>{renderDom}</Space>;
			}
			return renderDom;
		};
	}
});

export { Submitter };
