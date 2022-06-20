import { useI18n } from "vue-i18n";
import { computed, unref } from "@vue/reactivity";
import type { Locale } from "ant-design-vue/es/locale-provider";

import { store } from "@/store";
import zh_CN from "@/locales/lang/zh_CN";
import en_US from "@/locales/lang/en_US";
import { localeEnum } from "@/enum/localeEnum";
import { useLocaleStore } from "@/store/modules/locale";

type MessageSchema = typeof zh_CN.message | typeof en_US.message;

export function useI18nv() {
	const localeStore = useLocaleStore(store);
	const storageLocale = localeStore.getLocale;
	const { t, locale, getLocaleMessage } = useI18n<
		{
			message: MessageSchema;
		},
		"zh_CN" | "en_US"
	>({
		locale: storageLocale,
		// 失败默认用中文
		fallbackLocale: localeEnum.zh_CN,
		messages: {
			zh_CN: zh_CN.message,
			en_US: en_US.message
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
		// 这里貌似必须的刷新页面，暂时没找到更好的解决办法
		location.reload();
	};
	return {
		t,
		locale,
		getLocale,
		changeLocale,
		getAntdLocale
	};
}
