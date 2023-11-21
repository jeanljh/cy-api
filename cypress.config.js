const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  projectId: '9b3ig2',
  defaultCommandTimeout: 10000,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        print(x) {
          console.log(x)
          return null
        }
      })
    },
    baseUrl: 'https://api.trello.com/1/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
