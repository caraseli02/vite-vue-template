import { createApp } from 'vue'
import { VueFire, VueFireAuth, getCurrentUser } from 'vuefire'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from '~/helpers/firebase'

// TAILWIND
import './tailwind.css'
const app = createApp(App)

const pinia = createPinia()

export const Router = createRouter({
  history: createWebHistory(),
  // You don't need to pass the routes anymore,
  // the plugin writes it for you 🤖
})

Router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/auth',
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirectTo || '/')`
          redirectTo: to.fullPath,
        },
      }
    }
  }
})

app.use(pinia)
app.use(Router)
app
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
app.mount('#app')
