import path from "path";
import { fileURLToPath, URL } from "url";

import type { UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { viteMockServe } from "vite-plugin-mock";
import VueTypeImports from "vite-plugin-vue-type-imports";
// import Components from "unplugin-vue-components/vite";
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
	const isBuild = command === "build";

	return {
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
			VueTypeImports(),
			vueJsx(),
			viteMockServe({
				ignore: /^_/, // 忽略自动读取以_开头的文件
				mockPath: "mock",
				logger: true,
				localEnabled: !isBuild,
				prodEnabled: isBuild,
				injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
			}),
			// createStyleImportPlugin({
			// 	resolves: [AndDesignVueResolve()]
			// }),
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
			host: "0.0.0.0",
			port: 8888,
			open: true,
			proxy: {
				"/api": {
					// 真实地址
					target: "xxxxx",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				},
				"/mock-api": {
					target: "http://localhost:8888",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/mock-api/, "")
				}
			}
		},
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url))
			}
		}
	};
};
