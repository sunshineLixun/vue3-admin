import { ref, computed, unref, watch } from "vue";
import type { SetupContext, VNode, VNodeProps } from "vue";
import { Col, Divider } from "ant-design-vue";
import { cloneElement } from "ant-design-vue/es/_util/vnode";
import { isValidElement } from "ant-design-vue/es/_util/props-util";
import { useResizeObserver, type MaybeElementRef } from "@vueuse/core";
import type { TableFormProps } from "../types";
import type { QueryFilter } from "../table-form";
import type { BaseFromInstance } from "@/components/core/form/base-form/types";
import { getSpanConfig } from "../components/form-action/utils";

export type UseTableFormStateParams = {
	props: TableFormProps;
	slots: SetupContext["slots"];
	attrs: SetupContext["attrs"];
};

const defaultWidth = document?.body?.clientWidth || 1024;

export const useTableFromState = ({ props, attrs, slots }: UseTableFormStateParams) => {
	const propsRef = ref<TableFormProps>(props);
	const baseFromRef = ref<BaseFromInstance>();
	const doms = ref<(VNode | VNode[] | null)[]>([]);
	const currentSpan = ref(0);
	const needCollapseRender = ref<boolean | undefined>();

	const collapsed = ref(unref(propsRef)?.collapsed === undefined ? unref(propsRef).defaultCollapsed : unref(propsRef).collapsed);

	const width = ref((typeof unref(propsRef).style?.width === "number" ? unref(propsRef).style?.width : defaultWidth) as number);

	// 监听视图窗口大小
	useResizeObserver(baseFromRef as MaybeElementRef, entries => {
		const entry = entries[0];
		const rect = entry.contentRect;
		width.value = rect.width;
	});

	const getFormProps = computed(() => {
		return {
			...attrs,
			...propsRef.value
		} as TableFormProps;
	});

	/**根据屏幕宽度确定 每个表单项占据的span*/
	const spanSize = computed(() => {
		return getSpanConfig(unref(propsRef).layout || "horizontal", unref(width) + 16, unref(propsRef).span);
	});

	/**计算每行最大能显示多少个Form表单项 */
	const showLength = computed(() => {
		if (unref(propsRef).defaultColsNumber !== undefined) {
			return unref(propsRef).defaultColsNumber!;
		}
		// 查询/重置按钮会占用一个格子
		return Math.max(1, 24 / unref(spanSize).span - 1);
	});

	let children: VNode[] = [];
	// 如果是ProTable类似组件多层嵌套slot，这里的slots.default()会是嵌套的slot 并且slot的key是_default
	const isProTable = slots.default && slots.default().length === 1 && slots.default()?.[0].props?.key === "_default";
	if (isProTable) {
		children = slots.default ? slots.default().flatMap(v => v.children as VNode[]) : [];
	} else {
		children = slots.default ? slots.default() : [];
	}

	// 计算form.item占据的位置
	function getDoms() {
		// form.item占用的位置，计算offset保证查询/重置最一行的最后面
		let totalSpan = 0;
		// form.item 总共占用的份数
		let totalSize = 0;
		//首个表单项是否占满第一行
		let firstRowFull = false;

		let itemLength = 0;

		currentSpan.value = 0;
		const formItems = children.map(
			(child, index): { itemDom: VNode | null; colSpan: number; hidden: boolean; key?: VNodeProps["key"] } => {
				const colSize = isValidElement(child) ? child.props?.colSize ?? 1 : 1;
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

				itemLength += 1;

				const itemKey = (isValidElement(child) && (child.key || `${child.props?.name}`)) || index;

				if (isValidElement(child) && hidden) {
					if (!unref(getFormProps).preserve) {
						return {
							itemDom: null,
							colSpan: 0,
							hidden: true
						};
					} else {
						return {
							itemDom: cloneElement(child, {
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
		doms.value = formItems.map((child, index) => {
			const { itemDom, colSpan, hidden, key } = child;

			if (hidden) {
				return itemDom;
			}
			if (24 - (unref(currentSpan) % 24) < colSpan) {
				// 折行
				totalSpan += 24 - (unref(currentSpan) % 24);
				currentSpan.value += 24 - (unref(currentSpan) % 24);
			}

			let colItem = (
				<Col key={key} span={colSpan}>
					{itemDom}
				</Col>
			);

			currentSpan.value += colSpan;

			// split: true &&  currentSpan为最后一个 && 当前的item不是最后一个
			if (unref(propsRef).split && unref(currentSpan) % 24 === 0 && index < itemLength) {
				return [
					colItem,
					<Col span="24" key="line">
						<Divider style={{ margin: "8px 0" }} />
					</Col>
				];
			}
			return colItem;
		});
		needCollapseRender.value = !(totalSpan < 24 || totalSize <= unref(showLength));
	}

	const offset = computed(() => {
		const offsetSpan = (unref(currentSpan) % 24) + unref(spanSize).span;
		return 24 - offsetSpan;
	});

	getDoms();
	watch([collapsed, showLength, spanSize], getDoms);

	return {
		width,
		collapsed,
		getFormProps,
		baseFromRef,
		showLength,
		spanSize,
		offset,
		doms,
		needCollapseRender
	};
};
export type TableFromInstance = InstanceType<typeof QueryFilter>;
export type UseTableFromState = ReturnType<typeof useTableFromState>;
