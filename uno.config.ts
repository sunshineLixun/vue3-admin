// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from "unocss";

export default defineConfig({
	shortcuts: [
		// ...
	],
	theme: {
		colors: {
			// ...
		}
	},
	presets: [
		// unocss默认解析器 必须得有
		presetUno(),
		// 可以直接给标签设置对应的语义化的css， 类似：<div text="white" border="2 rounded blue-300" />  推荐
		presetAttributify(),
		// 图片直接当svg来用，icon // 推荐
		presetIcons(),
		// 可以直接在标签上写样式，不用写在class里面了。类似<div mr-1 /> 推荐
		presetTypography()
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
});
