import { createApp } from 'vue'
import router from './router'
import './assets/tailwind.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { gsap } from "gsap";

gsap.registerPlugin(TextPlugin)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
