import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '~/stores/AuthStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/HomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/',
    name: 'Auth',
    component: () => import('~/pages/AuthPage.vue'),
  },
  {
    path: '/auth/:showSignUp',
    name: 'showSignUp',
    component: () => import('~/pages/AuthPage.vue'),
    props: { showSignUp: true },
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: () => import("~/pages/DashboardPage.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/info",
  //   name: "Info",
  //   component: () => import("~/pages/AttendsList.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/perfil",
  //   name: "Perfil",
  //   component: () => import("~/pages/UserPerfil.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("~/pages/Error404Page.vue"),
  // },
  {
    path: '/aviso-legal',
    name: 'aviso-legal',
    component: () => import('~/pages/Legal/avisoLegal.vue'),
  },
  {
    path: '/politica-privacidad',
    name: 'pPrivacidad',
    component: () => import('~/pages/Legal/pPrivacidad.vue'),
  },
  {
    path: '/politica-de-cookies',
    name: 'pCookies',
    component: () => import('~/pages/Legal/pCookies.vue'),
  },
  {
    path: '/terminos-y-condiciones',
    name: 'terCondiciones',
    component: () => import('~/pages/Legal/terCondiciones.vue'),
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})

Router.beforeEach(async (to) => {
  // await store.dispatch('auth/initAuthentication')
  // store.dispatch('unsubscribeAllSnapshots')
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.authUser)
    return { name: 'Auth', q: { redirectTo: to.path } }
})
