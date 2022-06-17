import { createApp } from "vue";
import App from "./App.vue";
import { setUpRouter } from "@/router";
import { setUpStore } from "@/store";

const app = createApp(App);

// router
setUpRouter(app);

//store
setUpStore(app);

app.mount("#app");
