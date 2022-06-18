import { computed, unref } from "@vue/reactivity";
import { useLocaleStore } from "@/store/modules/locale";
import type { Locale } from "ant-design-vue/es/locale-provider";

import { store } from "@/store";
import { i18n } from "./index";
import type { localeEnum } from "@/enum/localeEnum";

function setI18nLanguage(locale: localeEnum) {
	const localeStore = useLocaleStore(store);

	if (i18n.mode === "legacy") {
		i18n.global.locale = locale;
	} else {
		(i18n.global.locale as any).value = locale;
	}
	localeStore.setLocale(locale);
}

export function useLocale() {
	const localeStore = useLocaleStore(store);
	const getLocale = computed(() => localeStore.getLocale);
	const getAntdLocale = computed<Locale>((): any => {
		// 从i18n全局中获取已经注册的antdLocale
		return i18n.global.getLocaleMessage(unref(getLocale)).antdLocale;
	});

	async function changeLocale(locale: localeEnum) {
		const globalI18n = i18n.global;
		const currentLocale = unref(globalI18n.locale);
		if (currentLocale === locale) {
			return locale;
		}

		const langModule = ((await import(`./lang/${locale}.ts`)) as any).default;
		if (!langModule) return;

		const { message } = langModule;

		globalI18n.setLocaleMessage(locale, message);

		setI18nLanguage(locale);
		return locale;
	}
	return {
		getLocale,
		getAntdLocale,
		changeLocale
	};
}
