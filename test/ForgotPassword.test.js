import { mount } from '@vue/test-utils'
import ForgotPassword from '~/components/auth/ForgotPassword.vue'
import { expect } from 'vitest'

test('mount MainNav component', async () => {
  expect(ForgotPassword).toBeTruthy()

  const wrapper = mount(ForgotPassword)
  const { vm } = wrapper

  expect(vm.state.email).toBe('')
  expect(vm.state.error).toBe('')
  expect(vm.state.emailSending).toBe(false)
  // expect(vm.error).toBe('Please type in a valid email address.')
  //set email to be valid
  //find #emailForgot
  expect(wrapper.find('#emailForgot').exists()).toBe(true)
  // type in email
  wrapper.find('#emailForgot').setValue('test@apimosa.es')
  expect(vm.state.email).toBe('test@apimosa.es')
})
