import { ref, SetupContext } from "vue";
import type { TableFormProps } from "../types";
import type TableFrom from "../table-form.vue";
import type { BaseFromInstance } from "@/components/core/base-form/types";

export type UseTableFormStateParams = {
	props: TableFormProps;
	attrs: SetupContext["attrs"];
};

export const useTableFromState = ({ props, attrs }: UseTableFormStateParams) => {
	console.log(props, attrs);
	const tableFromRef = ref<BaseFromInstance>();
	return {
		tableFromRef
	};
};
export type TableFromInstance = InstanceType<typeof TableFrom>;
