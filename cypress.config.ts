import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  projectId: 'wii543',
  viewportHeight: 844,
  viewportWidth: 490,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/**/*.spec.js',
    baseUrl: 'http://localhost:4000'
  },
  component: {
    specPattern: 'src/**/*.cy.js*',
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
})
