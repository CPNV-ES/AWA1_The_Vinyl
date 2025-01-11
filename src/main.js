import { createApp } from "vue";
import router from "./router";
import "./assets/tailwind.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { gsap } from "gsap";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(Flip) 

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
