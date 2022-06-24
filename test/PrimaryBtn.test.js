import { mount } from '@vue/test-utils'
import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'

test('mount component', async () => {
  const defaultClasses = [
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'p-0.5',
    'mb-2',
    'mr-2',
    'overflow-hidden',
    'text-sm',
    'font-medium',
    'text-gray-900',
    'rounded-lg',
    'group',
    'bg-gradient-to-br',
    'from-cyan-500',
    'to-blue-500',
    'group-hover:from-cyan-500',
    'group-hover:to-blue-500',
    'hover:text-white',
    'dark:text-white',
    'focus:ring-4',
    'focus:outline-none',
    'focus:ring-cyan-200',
    'dark:focus:ring-cyan-800'
  ]
  const purpleBlue =
    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'

  const wrapper = mount(PrimaryBtn, {
    props: {
      color: 'default'
    },
    slots: {
      default: '<span>test</span>'
    }
  })

  expect(wrapper.find('span').text()).toBe('test')
  expect(wrapper.classes()).toEqual(defaultClasses)

  wrapper.setProps({
    color: 'purpleBlue'
  })
  await wrapper.vm.$nextTick()
  expect(wrapper.classes()).toEqual(purpleBlue.split(' '))
})
