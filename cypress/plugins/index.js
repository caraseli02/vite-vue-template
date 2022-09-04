const path = require('path')
const { startDevServer } = require('@cypress/vite-dev-server')
const admin = require('firebase-admin')
const cypressFirebasePlugin = require('cypress-firebase').plugin

module.exports = (on, config) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin)

  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.js')
      }
    })
  })

  return config, extendedConfig
}
