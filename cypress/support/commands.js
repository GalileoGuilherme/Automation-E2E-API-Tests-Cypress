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

Cypress.Commands.add('apiRequest', (requestOrMethod, url, body) => {
  if (typeof requestOrMethod === 'string') {
    return body === undefined
      ? cy.request(requestOrMethod, url)
      : cy.request(requestOrMethod, url, body);
  }

  return cy.request(requestOrMethod);
});

Cypress.Commands.add('logResponse', (response) => {
  const responseBody = response.body;
  const contentType = response.headers['content-type'] || '';
  const isJson = /(?:application|text)\/(?:[\w.+-]*\+)?json/i.test(contentType);
  const parsedBody = typeof responseBody === 'string' && isJson
    ? JSON.parse(responseBody)
    : responseBody;
  const formattedBody = JSON.stringify(parsedBody, null, 2) || String(parsedBody);

  return cy.log(formattedBody).then(() => parsedBody);
});
