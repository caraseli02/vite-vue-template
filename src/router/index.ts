import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/',
    name: 'Auth',
    component: () => import('~/pages/AuthPage.vue')
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
