import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import { store } from "@/store";
import { i18n } from "@/locales";

import "ant-design-vue/dist/antd.css";
import "@ant-design-vue/pro-form/dist/style.css";

createApp(App).use(router).use(store).use(i18n).mount("#app");
