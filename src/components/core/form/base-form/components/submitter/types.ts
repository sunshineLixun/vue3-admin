import type { PropType, ExtractPropTypes } from "vue";
import type { ButtonProps } from "ant-design-vue";

type SearchConfig = {
	/** @name 提交按钮文案 */
	submitText: string;
	/** @name 重置按钮文案 */
	resetText: string;
};

export declare const submitterProps: () => {
	onSubmit: {
		type: PropType<(value?: any) => void>;
	};
	/** @name 重置方法 */
	onReset: {
		type: PropType<(value?: any) => void>;
	};
	/** @name 搜索的配置，一般用来配置文本 */
	searchConfig: {
		type: PropType<SearchConfig>;
	};
	/** @name 提交按钮的 props */
	submitButtonProps: {
		type: PropType<false | (ButtonProps & { preventDefault?: boolean })>;
	};
	/** @name 重置按钮的 props */
	resetButtonProps: {
		type: PropType<false | (ButtonProps & { preventDefault?: boolean })>;
	};
	/** @name 自定义操作的渲染 */
	render: {
		type: PropType<false | ((props: SubmitterPrps, doms: JSX.Element[]) => JSX.Element | JSX.Element[])>;
	};
};

export type SubmitterPrps = Partial<ExtractPropTypes<ReturnType<typeof submitterProps>>>;
