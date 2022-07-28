import { ref } from "vue";
import type { TableFromInstance } from "../components/table-form/hooks/useTableFromState";

export const useProTableState = () => {
	const tableFromRef = ref<TableFromInstance>();
	return {
		tableFromRef
	};
};
