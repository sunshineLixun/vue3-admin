import path from "path";
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
// import Components from "unplugin-vue-components/vite";
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	// 1. 如果使用的是ant-design 系列的 需要配置这个
	// 2. 确保less安装在依赖 `yarn add less -D`
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	plugins: [
		vue(),
		vueJsx(),
		createStyleImportPlugin({
			resolves: [AndDesignVueResolve()]
		}),
		vueI18n({
			// if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
			// compositionOnly: false,

			// you need to set i18n resource including paths !
			// fix：https://github.com/intlify/vue-i18n-next/issues/789
			include: path.resolve(__dirname, "/src/locales/lang/json/**")
		})
		// Components({
		// 	resolvers: [AntDesignVueResolver()]
		// })
	],
	server: {
		open: true
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	}
});
