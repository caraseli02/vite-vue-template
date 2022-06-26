import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
// Router
import { Router } from "~/router";
const app = createApp(App);

//TAILWIND
import "./tailwind.css";

const pinia = createPinia();

app.use(Router);
app.use(pinia);

app.mount("#app");
