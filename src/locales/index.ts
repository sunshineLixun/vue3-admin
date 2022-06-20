import { createI18n, I18nOptions } from "vue-i18n";
import { store } from "@/store";
import { useLocaleStore } from "@/store/modules/locale";

function i18nOptions(): I18nOptions {
	const localeStore = useLocaleStore(store);
	const storageLocale = localeStore.getLocale;
	return {
		legacy: false,
		locale: storageLocale
	};
}

export const i18n = createI18n(i18nOptions());
