import { defineStore } from "pinia";
import type { localeEnum } from "@/enum/localeEnum";
import { LOCALE_KEY } from "@/enum/cacheEnum";
import { Storage } from "@/utils/storage";

type LocaleType = keyof typeof localeEnum;

interface LocaleState {
	locale: LocaleType;
}

export const useLocaleStore = defineStore("locale", {
	state: (): LocaleState => {
		return {
			locale: Storage.get(LOCALE_KEY, "zh_CN")
		};
	},
	getters: {
		getLocale(): LocaleType {
			return this.locale;
		}
	},
	actions: {
		setLocale(locale: LocaleType) {
			this.locale = locale;
			Storage.set(LOCALE_KEY, locale);
		}
	}
});
