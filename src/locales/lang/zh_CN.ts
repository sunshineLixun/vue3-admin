import antdLocale from "ant-design-vue/es/locale/zh_CN";
import { getMessgae } from "../utils";

const moduleFiles = import.meta.globEager("./zh_CH/**/*.ts");
export default {
	message: {
		...getMessgae(moduleFiles),
		antdLocale
	}
};
