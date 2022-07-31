import { ref, SetupContext, computed } from "vue";
import type { TableFormProps } from "../types";
import type TableFrom from "../table-form.vue";
import type { BaseFromInstance } from "@/components/core/base-form/types";

export type UseTableFormStateParams = {
	props: TableFormProps;
	attrs: SetupContext["attrs"];
};

export const useTableFromState = ({ props, attrs }: UseTableFormStateParams) => {
	const propsRef = ref(props);
	const baseFromRef = ref<BaseFromInstance>();

	const getFormProps = computed(() => {
		return {
			...attrs,
			...propsRef.value
		} as TableFormProps;
	});
	return {
		getFormProps,
		baseFromRef
	};
};
export type TableFromInstance = InstanceType<typeof TableFrom>;
