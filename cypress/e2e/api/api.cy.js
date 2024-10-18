/// <reference types="cypress" />

describe('API Tests for Automation', () => {
  // const baseUrl = 'https://automationexercise.com';

  // API 1: Get All Products List
  it('Get All Products List', () => {
    cy.api(
      'GET', 
      '/api/productsList'
    ).then((response) => {
      const responseBody = JSON.parse(response.body);
      expect(response.status).to.eq(200);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.products).to.exist;
      expect(Array.isArray(responseBody.products)).to.be.true;
    });
  });

  // API 2: POST To All Products List
  it('POST To All Products List', () => {
    cy.api(
      'POST', 
      '/api/productsList'
    ).then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = JSON.parse(response.body);
      cy.log(responseBody)
      expect(responseBody.responseCode).to.eq(405);
      expect(responseBody.message).to.eq("This request method is not supported.");
      // expect(response.body).to.include('This request method is not supported.');
      
    });
  });

  // API 3: Get All Brands List
  it.only('Get All Brands List', () => {
    cy.api(
      'GET', 
      '/api/brandsList'
    ).then((response) => {
      expect(response.status).to.eq(200);
      
      const responseBody = JSON.parse(response.body);
      cy.log(responseBody);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.brands).to.exist;
      expect(Array.isArray(responseBody.brands)).to.be.true;
    });
  });

  // API 4: PUT To All Brands List
  // it('PUT To All Brands List', () => {
  //   cy.api('PUT', `${baseUrl}/api/brandsList`).then((response) => {
  //     expect(response.status).to.eq(405);
  //     expect(response.body).to.include('This request method is not supported.');
  //   });
  // });

  // API 5: POST To Search Product
  // it('POST To Search Product', () => {
  //   const searchProduct = { search_product: 'tshirt' }; // Exemplo
  //   cy.api('POST', `${baseUrl}/api/searchProduct`, searchProduct).then((response) => {
  //     const responseBody = JSON.parse(response.body);
  //     expect(response.status).to.eq(200);
  //     expect(responseBody.responseCode).to.eq(200);
  //     expect(responseBody.products).to.exist;
  //     expect(Array.isArray(responseBody.products)).to.be.true;
  //   });
  // });

  // API 6: POST To Search Product without search_product parameter
  // it('POST To Search Product without search_product parameter', () => {
  //   cy.api('POST', `${baseUrl}/api/searchProduct`).then((response) => {
  //     expect(response.status).to.eq(400);
  //     expect(response.body).to.include('Bad request, search_product parameter is missing in POST request.');
  //   });
  // });

  // API 7: POST To Verify Login with valid details
  // it('POST To Verify Login with valid details', () => {
  //   const loginDetails = { email: 'test@example.com', password: 'password123' }; // Exemplo
  //   cy.api('POST', `${baseUrl}/api/verifyLogin`, loginDetails).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.include('User exists!');
  //   });
  // });

  // API 8: POST To Verify Login without email parameter
  // it('POST To Verify Login without email parameter', () => {
  //   const loginDetails = { password: 'password123' }; // Sem email
  //   cy.api('POST', `${baseUrl}/api/verifyLogin`, loginDetails).then((response) => {
  //     expect(response.status).to.eq(400);
  //     expect(response.body).to.include('Bad request, email or password parameter is missing in POST request.');
  //   });
  // });

  // API 9: DELETE To Verify Login
  // it('DELETE To Verify Login', () => {
  //   cy.api('DELETE', `${baseUrl}/api/verifyLogin`).then((response) => {
  //     expect(response.status).to.eq(405);
  //     expect(response.body).to.include('This request method is not supported.');
  //   });
  // });

  // API 10: POST To Verify Login with invalid details
  // it('POST To Verify Login with invalid details', () => {
  //   const loginDetails = { email: 'invalid@example.com', password: 'wrongpassword' };
  //   cy.api('POST', `${baseUrl}/api/verifyLogin`, loginDetails).then((response) => {
  //     expect(response.status).to.eq(404);
  //     expect(response.body).to.include('User not found!');
  //   });
  // });

  // API 11: POST To Create/Register User Account
  // it('POST To Create/Register User Account', () => {
  //   const userAccount = {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     password: 'password123',
  //     title: 'Mr',
  //     birth_date: '01',
  //     birth_month: 'January',
  //     birth_year: '1990',
  //     firstname: 'John',
  //     lastname: 'Doe',
  //     company: 'Company Name',
  //     address1: '123 Main St',
  //     address2: 'Apt 1',
  //     country: 'USA',
  //     zipcode: '12345',
  //     state: 'NY',
  //     city: 'New York',
  //     mobile_number: '1234567890',
  //   };

  //   cy.api('POST', `${baseUrl}/api/createAccount`, userAccount).then((response) => {
  //     expect(response.status).to.eq(201);
  //     expect(response.body).to.include('User created!');
  //   });
  // });

  // API 12: DELETE METHOD To Delete User Account
  // it('DELETE METHOD To Delete User Account', () => {
  //   const userCredentials = {
  //     email: 'john.doe@example.com',
  //     password: 'password123',
  //   };

  //   cy.api('DELETE', `${baseUrl}/api/deleteAccount`, userCredentials).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.include('Account deleted!');
  //   });
  // });

  // API 13: PUT METHOD To Update User Account
  // it('PUT METHOD To Update User Account', () => {
  //   const updatedUserAccount = {
  //     name: 'John Doe Updated',
  //     email: 'john.doe@example.com',
  //     password: 'newpassword123',
  //     title: 'Mr',
  //     birth_date: '01',
  //     birth_month: 'January',
  //     birth_year: '1990',
  //     firstname: 'John',
  //     lastname: 'Doe',
  //     company: 'Updated Company Name',
  //     address1: '123 Updated Main St',
  //     address2: 'Apt 1',
  //     country: 'USA',
  //     zipcode: '54321',
  //     state: 'NY',
  //     city: 'New York',
  //     mobile_number: '0987654321',
  //   };

  //   cy.api('PUT', `${baseUrl}/api/updateAccount`, updatedUserAccount).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.include('User updated!');
  //   });
  // });

  // API 14: GET user account detail by email
  // it('GET user account detail by email', () => {
  //   const email = 'john.doe@example.com';
  //   cy.api('GET', `${baseUrl}/api/getUserDetailByEmail?email=${email}`).then((response) => {
  //     const responseBody = JSON.parse(response.body);
  //     expect(response.status).to.eq(200);
  //     expect(responseBody).to.exist;
  //     expect(responseBody.email).to.eq(email);
  //   });
  // });
});
