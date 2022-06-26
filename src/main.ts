import { createApp } from 'vue'
import App from './App.vue'
// Router
import { Router } from '~/router'
const app = createApp(App)

//TAILWIND
import './tailwind.css'

app.use(Router)

app.mount('#app')
