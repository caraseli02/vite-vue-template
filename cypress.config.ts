import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    coverage: true,
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
  videoUploadOnPasses: false,
  projectId: 'wii543',
  viewportHeight: 844,
  viewportWidth: 490,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {},
    env: {
      coverage: false,
    },
    specPattern: 'src/**/*.cy.t*',
  },
})
