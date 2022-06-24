import { expect } from 'vitest'
import SignUp from '~/components/auth/SignUp.vue'

test('mount component', async () => {
  expect(SignUp).toBeTruthy()
})
