import { shallowMount } from '@vue/test-utils'
import attendRow from '~/components/attendRow.vue'
import { MailIcon } from '@heroicons/vue/outline'

test('mount component with props and check computed logic', async () => {
  expect(attendRow).toBeTruthy()

  const wrapper = shallowMount(attendRow, {
    props: {
      attend: {
        data: {
          enterTime: ['2022-01-16T08:34']
        }
      }
    }
  })
  const vm = wrapper.vm
  expect(wrapper.get('[data-vi="dayNumber"]').text()).toBe('dom 16')
  expect(wrapper.get('[data-vi="enterTime"]').text()).toBe('↓ 08:34')
  expect(wrapper.get('[data-vi="leaveTime"]').text()).toBe('-- --↑')
  expect(wrapper.get('[data-vi="workedTime"]').text()).toBe('-- --')

  vm.attend.data.leaveTime = ['2022-01-16T18:34']
  // vm.attend.msg = [{ createdAt: '2022-04-30 09:56', msg: 'test' }]

  await vm.$nextTick()
  expect(wrapper.get('[data-vi="leaveTime"]').text()).toBe('18:34↑')
  expect(wrapper.get('[data-vi="workedTime"]').text()).toBe('9h 0m')

  expect(wrapper).toMatchSnapshot()
})
