/// <reference types="cypress" />

describe('Request API', () => {
  const apiUrl = '/api/productsList';

  it('should return a list of all products with a status code 200', () => {
      cy.api('GET', apiUrl).then((response) => {
          const responseBody = JSON.parse(response.body);
          // cy.log('Produtos:', JSON.stringify(responseBody.products));

          expect(response.status).to.eq(200);
          expect(responseBody.responseCode).to.eq(200);
          expect(responseBody.products).to.exist;
          expect(Array.isArray(responseBody.products)).to.be.true;

          if (responseBody.products.length > 0) {
              cy.log('Primeiro Produto:', JSON.stringify(responseBody.products[0]));
          } else {
              cy.log('Nenhum produto encontrado.');
          }
      });
  });
});
