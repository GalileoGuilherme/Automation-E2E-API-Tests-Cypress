/// <reference types="cypress" />

import { generateRandomEmail, generateRandomPassword, userDetails } from '../../support/globals';

describe('Test Case 1: Register User', () => {

  it('should register a new user and delete account', () => {
    // 1. Launch browser

    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('http://automationexercise.com');
    
    // 3. Verify that home page is visible successfully
    cy.get('.active > :nth-child(1) > h2').should('contain.text', 'Full-Fledged practice website for Automation Engineers');
    
    // 4. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click();

    // 5. Verify 'New User Signup!' is visible
    cy.get('h2').should('contain.text', 'New User Signup!');

    // 6. Enter name and email address (com email e senha aleatórios)
    const email = userDetails.email; // Usa e-mail aleatório da variável global
    const password = userDetails.password; // Usa senha aleatória da variável global
    cy.get('[data-qa="signup-name"]').type(userDetails.name);
    cy.get('[data-qa="signup-email"]').type(email);

    // 7. Click 'Signup' button
    cy.get('button[data-qa="signup-button"]').click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.get('h2').should('contain.text', 'Enter Account Information');

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    cy.get('#id_gender1').check();
    cy.get('input[name="password"]').type(password); // Usa a senha aleatória
    cy.get('select[name="days"]').select('1');
    cy.get('select[name="months"]').select('January');
    cy.get('select[name="years"]').select('1990');

    // 10. Select checkbox 'Sign up for our newsletter!'
    cy.get('input[name="newsletter"]').check();

    // 11. Select checkbox 'Receive special offers from our partners!'
    cy.get('input[name="optin"]').check();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    cy.get('input[name="first_name"]').type(userDetails.firstName);
    cy.get('input[name="last_name"]').type(userDetails.lastName);
    cy.get('input[name="company"]').type(userDetails.company);
    cy.get('input[name="address1"]').type(userDetails.address1);
    cy.get('input[name="address2"]').type(userDetails.address2);
    cy.get('select[name="country"]').select(userDetails.country);
    cy.get('input[name="state"]').type(userDetails.state);
    cy.get('input[name="city"]').type(userDetails.city);
    cy.get('input[name="zipcode"]').type(userDetails.zipcode);
    cy.get('input[name="mobile_number"]').type(userDetails.mobileNumber);

    // 13. Click 'Create Account' button
    cy.get('[data-qa="create-account"]').click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    cy.get('b').should('contain.text', 'Account Created!');

    // 15. Click 'Continue' button
    cy.get('a[data-qa="continue-button"]').click();

    // 16. Verify that 'Logged in as username' is visible
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain.text', 'Logout')
    cy.get('b').should('contain.text', userDetails.name);

    // 17. Click 'Delete Account' button
    cy.get('a[href="/delete_account"]').click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.get('h2').should('contain.text', 'Account Deleted!');
    cy.get('a[data-qa="continue-button"]').click();
  });

});
