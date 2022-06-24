import { mount } from '@vue/test-utils'
import attendTimeLog from '~/components/attendTimeLog.vue'
import { describe, expect } from 'vitest'

describe('props testing', () => {
  test('mount component without props', async () => {
    expect(attendTimeLog).toBeTruthy()

    const wrapper = mount(attendTimeLog)
    expect(wrapper.vm.workedDays).toBe(undefined)
    expect(wrapper.vm.unclosedAttends).toBe(undefined)

    expect(wrapper).toMatchSnapshot()
  })

  test('mount component with props', async () => {
    expect(attendTimeLog).toBeTruthy()

    const wrapper = mount(attendTimeLog, {
      props: {
        workedDays: 5,
        unclosedAttends: 1
      }
    })

    expect(wrapper.vm.workedDays).toBe(5)
    expect(wrapper.vm.unclosedAttends).toBe(1)

    expect(wrapper).toMatchSnapshot()
  })
})
