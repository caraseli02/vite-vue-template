import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// Router
import { Router } from '~/router'

// TAILWIND
import './tailwind.css'
const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(Router)

app.mount('#app')
