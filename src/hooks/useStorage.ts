import { ref, watchEffect } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useStorage(name: string, value: any) {
	const data = ref(JSON.parse(localStorage.getItem(name) || "[]") || value);
	watchEffect(() => {
		localStorage.setItem(name, JSON.stringify(data.value));
	});
	return data;
}

export { useStorage };
