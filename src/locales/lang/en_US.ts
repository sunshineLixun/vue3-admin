import antdLocale from "ant-design-vue/es/locale/en_US";
import { getMessgae } from "../utils";

const moduleFiles = import.meta.globEager("./en_US/**/*.ts");
export default {
	message: {
		...getMessgae(moduleFiles),
		antdLocale
	}
};
