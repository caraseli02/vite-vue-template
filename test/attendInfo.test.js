import { mount } from '@vue/test-utils'
import attendInfo from '~/components/attendInfo.vue'

test('mount component with props', async () => {
  expect(attendInfo).toBeTruthy()

  const wrapper = mount(attendInfo, {
    props: {
      attend: {
        data: {
          enterTime: ['2022-01-16T08:34']
        }
      }
    }
  })
  const { vm } = wrapper
  expect(wrapper).toMatchSnapshot()
  expect(vm.attend.data.enterTime[0]).toBe('2022-01-16T08:34')
  expect(vm.getDayName(vm.attend.data.enterTime)).toBe('dom')
  expect(wrapper.get('[data-cy="attend-info"]').text()).toBe('16 dom')
  expect(wrapper.get('[data-vi="enterInfo"]').text()).toBe('Entradas ↓08:34')
  expect(wrapper.get('[data-vi="leaveInfo"]').text()).toBe('Salidas -- / --')
  vm.attend.data.leaveTime = ['2022-01-16T18:34']
  await vm.$nextTick()
  expect(wrapper.get('[data-vi="leaveInfo"]').text()).toBe('Salidas ↑18:34')
})
