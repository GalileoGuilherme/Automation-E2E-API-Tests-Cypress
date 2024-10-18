/// <reference types="cypress" />

describe('Exemplo de Teste', () => {
    it('Deve carregar a página inicial', () => {
      cy.visit('/');
      cy.contains('Automation Exercise'); // Verifica se o texto "Automation Exercise" está na página inicial
    });
  });
  