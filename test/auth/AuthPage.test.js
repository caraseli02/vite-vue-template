import { shallowMount } from '@vue/test-utils'
import AuthPage from '~/pages/AuthPage.vue'
import { expect } from 'vitest'
import firebase from '~/helpers/firebase'
import firebaseConfig from '~/config/firebase'

test('mount component', async () => {
  firebase.initializeApp(firebaseConfig)

  expect(AuthPage).toBeTruthy()

  const wrapper = shallowMount(AuthPage)

  const classes = 'opacity-50 cursor-pointer rounded-lg border-b-0'

  // expect to have h1 with Apimosa App text
  expect(wrapper.find('h1').text()).toBe('APIMOSA APP')
  // make click on #authCreate
  wrapper.find('#authCreate').trigger('click')
  await wrapper.vm.$nextTick()
  // expect isLogin to be true
  expect(wrapper.vm.isLogin).toBe(false)
  wrapper.find('#authLogin').trigger('click')
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.isLogin).toBe(true)

  expect(wrapper).toMatchSnapshot()
})
