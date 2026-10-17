const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'results/test-output-[hash].xml',
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com/',
  },
});
