import type { App } from "vue";
import { createI18n, I18nOptions } from "vue-i18n";
import { store } from "@/store";
import { useLocaleStore } from "@/store/modules/locale";
import { localeEnum } from "@/enum/localeEnum";
import zh_CN from "./lang/zh_CN";
import en_US from "./lang/en_US";

function createOptions(): I18nOptions {
	// active pinia
	const localeStore = useLocaleStore(store);
	const locale = localeStore.getLocale;
	const message = locale === "zh_CN" ? zh_CN.message : en_US.message;
	return {
		locale,
		// 失败默认用中文
		fallbackLocale: localeEnum.zh_CN,
		messages: {
			[locale]: message as { [key: string]: any }
		}
	};
}

export const i18n = createI18n(createOptions());

console.log(i18n);

export function setUpI18n(app: App) {
	app.use(i18n);
}
