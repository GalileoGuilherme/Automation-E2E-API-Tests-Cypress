// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

Cypress.Commands.add('apiRequest', (method, url, body = null) => {
    return cy.request({
      method,
      url,
      headers: { 'Content-Type': 'application/json' },
      body,
      failOnStatusCode: false, // evita que o teste falhe automaticamente
    });
  });
  
  Cypress.Commands.add('logResponse', (response) => {
    const responseBody = response.body;
  
    // Verifica se a resposta está em formato JSON
    if (typeof responseBody === 'string') {
      try {
        const parsedBody = JSON.parse(responseBody);
        cy.log(JSON.stringify(parsedBody, null, 2));
        return parsedBody;
      } catch (e) {
        cy.log('Erro ao parsear a resposta como JSON: ', e.message);
        return responseBody;
      }
    } else {
      cy.log(JSON.stringify(responseBody, null, 2));
      return responseBody;
    }
  });
  