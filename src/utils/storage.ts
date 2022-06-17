const createStorage = () => {
	const Storage = class {
		set(key: string, value: any) {
			const data = JSON.stringify(value);
			localStorage.setItem(key, data);
		}
		get<T = any>(key: string, def: any = null): T {
			const value = localStorage.getItem(key);
			if (value) return JSON.parse(value);
			return def;
		}
		remove(key: string) {
			localStorage.removeItem(key);
		}
		removeAll() {
			localStorage.clear();
		}
	};

	return new Storage();
};

export const Storage = createStorage();
