import antdLocale from "ant-design-vue/es/locale/zh_CN";

const modileFiles = import.meta.globEager("./zh_CH/**/*.ts");

console.log(modileFiles);
export default {
	message: {
		antdLocale
	}
};
