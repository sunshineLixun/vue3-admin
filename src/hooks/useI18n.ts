import { useI18n } from "vue-i18n";
import { computed, unref } from "@vue/reactivity";
import type { Locale } from "ant-design-vue/es/locale-provider";

import { store } from "@/store";
import zh_CN from "@/locales/lang/zh_CN";
import en_US from "@/locales/lang/en_US";
import { localeEnum } from "@/enum/localeEnum";
import { useLocaleStore } from "@/store/modules/locale";

export function useI18nv() {
	const localeStore = useLocaleStore(store);
	const storageLocale = localeStore.getLocale;
	const message = storageLocale === "zh_CN" ? zh_CN.message : en_US.message;
	const { t, locale, getLocaleMessage } = useI18n({
		locale: storageLocale,
		// 失败默认用中文
		fallbackLocale: localeEnum.zh_CN,
		messages: {
			[storageLocale]: message as { [key: string]: any }
		}
	});
	const getLocale = computed(() => localeStore.getLocale);
	const getAntdLocale = computed<Locale>((): any => {
		// 从i18n全局中获取已经注册的antdLocale
		return getLocaleMessage(unref(getLocale)).antdLocale;
	});

	const changeLocale = (value: localeEnum) => {
		locale.value = value;
		localeStore.setLocale(value);
	};
	return {
		t,
		locale,
		getLocale,
		changeLocale,
		getAntdLocale
	};
}
