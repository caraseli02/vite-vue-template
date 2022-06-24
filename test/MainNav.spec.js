import { render, fireEvent } from '@testing-library/vue'
import VueRouter from 'vue-router'
import { expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'
import HomePage from '@/pages/HomePage.vue'
import AuthPage from '@/pages/AuthPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import AttendsList from '@/pages/AttendsList.vue'
import UserPerfil from '@/pages/UserPerfil.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/auth',
    component: AuthPage
  },
  {
    path: '/dashboard',
    component: DashboardPage
  },
  {
    path: '/perfil',
    component: UserPerfil
  },
  {
    path: '/info',
    component: AttendsList
  }
]

test('full app rendering/navigating', async () => {
  // Notice how we pass a `routes` object to our render function.
  const { getByTestId } = render(App, { routes })

  expect(getByTestId('location-display')).toHaveTextContent('/')

  await fireEvent.click(getByTestId('about-link'))

  expect(getByTestId('location-display')).toHaveTextContent('/about')
})

test('mount MainNav component', async () => {
  expect(MainNav).toBeTruthy()

  const wrapper = mount(MainNav, {
    global: {
      plugins: [router]
    }
  })
  // console.log(wrapper.html());
  //find a tag with href /auth
  expect(wrapper.find('a[href="/dashboard"]').exists()).toBe(true)
  expect(wrapper.find('a[href="/info"]').exists()).toBe(true)
  expect(wrapper.find('a[href="/"]').exists()).toBe(true)

  // check if $route.path === link.path
  expect(wrapper.vm.$route.path).toBe('/')

  await wrapper.find('a[href="/"]').trigger('click')
  expect(wrapper.html()).toMatchSnapshot()
})
