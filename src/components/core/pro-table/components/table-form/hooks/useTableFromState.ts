import { ref } from "vue";
import type { BaseFromInstance } from "@/components/core/base-form/base-from-types";
import type TableFrom from "../table-form.vue";
export const useTableFromState = () => {
	const tableFromRef = ref<BaseFromInstance>();
	return {
		tableFromRef
	};
};
export type TableFromInstance = InstanceType<typeof TableFrom>;
