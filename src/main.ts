import { createApp } from "vue";
import App from "./App.vue";
import { setUpRouter } from "@/router";
import { setUpStore } from "@/store";
import { setUpI18n } from "@/locales";

const app = createApp(App);

// router
setUpRouter(app);

//store
setUpStore(app);

//locale
setUpI18n(app);

app.mount("#app");
