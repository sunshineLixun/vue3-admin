export function useTableMethods() {
	function handleSumbit(params = {}) {
		console.log(params);
	}
	return { handleSumbit };
}
