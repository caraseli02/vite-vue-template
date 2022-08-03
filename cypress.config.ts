import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import admin from 'firebase-admin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      cypressFirebasePlugin(on, config, admin);
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
