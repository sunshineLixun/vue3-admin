import { ref, computed, unref, watchEffect, cloneVNode, isVNode } from "vue";
import type { SetupContext, VNode, VNodeProps } from "vue";
import { Col } from "ant-design-vue";
import type { TableFormProps } from "../types";
import type { QueryFilter } from "../table-form";
import type { BaseFromInstance } from "@/components/core/form/base-form/types";
import { getSpanConfig } from "../utils";

export type UseTableFormStateParams = {
	props: TableFormProps;
	slots: SetupContext["slots"];
	attrs: SetupContext["attrs"];
};

const defaultWidth = document?.body?.clientWidth || 1024;

export const useTableFromState = ({ props, attrs, slots }: UseTableFormStateParams) => {
	const propsRef = ref<TableFormProps>(props);
	const baseFromRef = ref<BaseFromInstance>();
	const doms = ref<(VNode | null)[]>([]);
	const currentSpan = ref(0);

	const { layout = "horizontal", span, defaultColsNumber } = unref(propsRef);
	const collapsed = ref(unref(propsRef).defaultCollapsed);

	const width = ref((typeof unref(propsRef).style?.width === "number" ? unref(propsRef).style?.width : defaultWidth) as number);

	const getFormProps = computed(() => {
		return {
			...attrs,
			...propsRef.value
		} as TableFormProps;
	});

	/**根据屏幕宽度确定 每个表单项占据的span*/
	const spanSize = computed(() => {
		return getSpanConfig(layout, unref(width) + 16, span);
	});

	/**计算每行最大能显示多少个Form表单项 */
	const showLength = computed(() => {
		if (defaultColsNumber !== undefined) {
			return defaultColsNumber;
		}
		// 查询/重置按钮会占用一个格子
		return Math.max(1, 24 / unref(spanSize).span - 1);
	});

	const childrens = slots.default ? slots.default().flatMap(v => v.children as VNode[]) : [];

	// 计算form.item占据的位置
	function getDoms() {
		// form.item占用的位置，计算offest保证查询/重置最一行的最后面
		let totalSpan = 0;
		// form.item 总共占用的份数
		let totalSize = 0;
		//首个表单项是否占满第一行
		let firstRowFull = false;
		currentSpan.value = 0;
		const formItems = childrens.map(
			(child, index): { itemDom: VNode | null; colSpan: number; hidden: boolean; key?: VNodeProps["key"] } => {
				const colSize = isVNode(child) ? child.props?.colSize ?? 1 : 1;
				const colSpan = Math.min(unref(spanSize).span * colSize, 24);

				totalSize += colSize;
				totalSpan += colSpan;

				if (index === 0) {
					// 如果第一个form.item占满24 并且不是隐藏
					firstRowFull = colSpan === 24 && !child.props?.hidden;
				}
				// 如果totalSize长度超过了 要显示的个数
				// 如果totalSpan位置超过了24
				const hidden =
					child.props?.hidden ||
					(unref(collapsed) && (firstRowFull || totalSize > unref(showLength) - 1) && !!index && totalSpan >= 24);

				const itemKey = (isVNode(child) && (child.key || `${child.props?.name}`)) || index;

				if (isVNode(child) && hidden) {
					if (!unref(getFormProps).preserve) {
						return {
							itemDom: null,
							colSpan: 0,
							hidden: true
						};
					} else {
						return {
							itemDom: cloneVNode(child, {
								hidden: true,
								key: itemKey || index
							}),
							colSpan,
							hidden: true
						};
					}
				}
				return {
					itemDom: child,
					colSpan,
					hidden: false
				};
			}
		);

		doms.value = formItems.map(child => {
			const { itemDom, colSpan, hidden, key } = child;

			if (hidden) {
				return itemDom;
			}
			if (24 - (unref(currentSpan) % 24) < colSpan) {
				// 折行
				totalSpan += 24 - (unref(currentSpan) % 24);
				currentSpan.value += 24 - (unref(currentSpan) % 24);
			}
			currentSpan.value += colSpan;

			const colItem = (
				<Col key={key} span={colSpan}>
					{itemDom}
				</Col>
			);
			return colItem;
		});
	}

	const offset = computed(() => {
		const offsetSpan = (unref(currentSpan) % 24) + unref(spanSize).span;
		return 24 - offsetSpan;
	});

	watchEffect(getDoms);

	return {
		width,
		collapsed,
		getFormProps,
		baseFromRef,
		showLength,
		spanSize,
		offset,
		doms
	};
};
export type TableFromInstance = InstanceType<typeof QueryFilter>;
export type UseTableFromState = ReturnType<typeof useTableFromState>;
