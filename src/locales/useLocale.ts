import { computed, unref } from "@vue/reactivity";
import { useLocaleStore } from "@/store/modules/locale";
import type { Locale } from "ant-design-vue/es/locale-provider";

import { store } from "@/store";
import { i18n } from "./index";

export function useLocale() {
	const localeStore = useLocaleStore(store);
	const getLocale = computed(() => localeStore.getLocale);
	const getAntdLocale = computed<Locale>((): any => {
		// 从i18n全局中获取已经注册的antdLocale
		return i18n.global.getLocaleMessage(unref(getLocale)).antdLocale;
	});
	return {
		getAntdLocale
	};
}
