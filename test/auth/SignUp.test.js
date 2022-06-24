import { mount } from '@vue/test-utils'
import SignUp from '~/components/auth/SignUp.vue'
import { expect } from 'vitest'

import { createStore } from 'vuex'

const store = createStore({})

test('mount component', async () => {
  expect(SignUp).toBeTruthy()

  // const wrapper = mount(SignUp, {
  //   global: {
  //     provide: {
  //       store: store
  //     },
  //   },
  // })

  // expect(wrapper.vm).toBeTruthy()
  // expect(wrapper.find('[data-vi="email"]').exists()).toBe(true)
  // expect(wrapper.find('[data-vi="password"]').exists()).toBe(true)
  // wrapper.find('#loginBtn').trigger('click')
  // await wrapper.vm.$nextTick()
  // // expect to have msg visible
  // expect(wrapper.find('[data-vi="emailError"]').exists()).toBe(true)
  // expect(wrapper.find('[data-vi="passwordError"]').exists()).toBe(true)

  // expect(wrapper).toMatchSnapshot()
})
