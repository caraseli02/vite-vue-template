import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
//import { routes } from '~/router/routes';
//import { useStore } from '~/stores/store';
//Ensure global styles are loaded
import "tailwindcss/tailwind.css"

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: any,
        options?: OptionsParam & { store?: any }
      ): Chainable<any>
    }
  }
}

// solution #1 👇 - does not throw error, but doesn’t show component
Cypress.Commands.add('mount', (component, options = {}) => {
  return mount(component, options)
})
