const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9b3ig2',
  defaultCommandTimeout: 20000,
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
    baseUrl: 'https://api.trello.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
