const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com/',
    // viewportWidth: 1280,
    // viewportHeight: 720,
    setupNodeEvents(on, config) {
      //repórteres, manipulação de falhas etc.
    },

    // Tempo máximo de espera para as ações
    // defaultCommandTimeout: 10000,

    // Tempo máximo de espera para as páginas carregarem
    // pageLoadTimeout: 60000,
  },
});
