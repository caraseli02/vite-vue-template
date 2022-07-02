import { shallowMount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import AuthPage from '~/pages/AuthPage.vue'
describe('Counter.vue', () => {
  it('mount component', async () => {

    expect(AuthPage).toBeTruthy()

    const wrapper = shallowMount(AuthPage)

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
})
