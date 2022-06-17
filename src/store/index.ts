import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setUpStore(app: App) {
	app.use(store);
}
export { store };
