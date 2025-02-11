const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // A configuração para o Mocha JUnit Reporter deve estar aqui
      require('cypress-mochawesome-reporter/plugin')(on);

      // Se você estiver usando o Mocha JUnit Reporter também, é importante configurá-lo corretamente
      const mochaJunitReporter = require('mocha-junit-reporter');
      on('after:run', (results) => {
        mochaJunitReporter(results, {
          // Caminho de onde os relatórios serão salvos
          mochaFile: 'results/test-output.xml',
        });
      });

      return config;
    },
    baseUrl: 'https://www.automationexercise.com/',
  },
});

