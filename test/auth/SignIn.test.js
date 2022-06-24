import { mount } from '@vue/test-utils'
import SignIn from '~/components/auth/SignIn.vue'
import { expect } from 'vitest'
import firebase from '@/helpers/firebase'
import firebaseConfig from '@/config/firebase'

test('mount component', async () => {
  firebase.initializeApp(firebaseConfig)
  expect(SignIn).toBeTruthy()

  const wrapper = mount(SignIn)

  expect(wrapper.vm).toBeTruthy()
  expect(wrapper.find('[data-vi="email"]').exists()).toBe(true)
  expect(wrapper.find('[data-vi="password"]').exists()).toBe(true)
  wrapper.find('#loginBtn').trigger('click')
  await wrapper.vm.$nextTick()
  // expect to have msg visible
  expect(wrapper.find('[data-vi="emailError"]').exists()).toBe(true)
  expect(wrapper.find('[data-vi="passwordError"]').exists()).toBe(true)

  expect(wrapper).toMatchSnapshot()
})
