import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
// Router
import { Router } from "~/router";
const app = createApp(App);

//TAILWIND
import "./tailwind.css";

const pinia = createPinia();

app.use(pinia);
app.use(Router);

app.mount("#app");
