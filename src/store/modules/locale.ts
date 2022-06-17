import { defineStore } from "pinia";
import type { localeEnum } from "@/locales/config";
type LocaleType = keyof typeof localeEnum;

interface LocaleState {
	locale: LocaleType;
}

export const useLocaleStore = defineStore("locale", {
	state: (): LocaleState => {
		return {
			locale: "zh_CN"
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
		}
	}
});
