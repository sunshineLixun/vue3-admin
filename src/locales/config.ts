export enum localeEnum {
	zh_CN = "zh_CN",
	en_US = "en_US"
}

export const localesList = [
	{
		label: "简体中文",
		lang: localeEnum.zh_CN,
		icon: "🇨🇳"
	},
	{
		label: "English",
		lang: localeEnum.en_US,
		icon: "🇺🇸"
	}
] as const;
