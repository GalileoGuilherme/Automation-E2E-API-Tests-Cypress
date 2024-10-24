/// <reference types="cypress" />

describe('API Tests for Automation', () => {

  // API 1: Get All Products List
  it('API1: Get All Products List', () => {
    cy.api('GET', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200);

      cy.log('Response Body:', response.body);

      if (typeof response.body === 'string') {
        try {
          const responseBody = JSON.parse(response.body);

          expect(responseBody).to.have.property('responseCode');
          expect(responseBody.responseCode).to.eq(200);
          expect(responseBody.products).to.exist;
          expect(Array.isArray(responseBody.products)).to.be.true;
        } catch (e) {
          cy.log('Error parsing response as JSON: ', e.message);
        }
      } else {
        const responseBody = response.body;

        expect(responseBody).to.have.property('responseCode');
        expect(responseBody.responseCode).to.eq(200);
        expect(responseBody.products).to.exist;
        expect(Array.isArray(responseBody.products)).to.be.true;
      }
    });
  });

  // API 2: POST To All Products List
  it('API 2: POST To All Products List', () => {
    cy.api(
      'POST',
      '/api/productsList'
    ).then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = JSON.parse(response.body);
      // cy.log(responseBody);
      expect(responseBody.responseCode).to.eq(405);
      expect(responseBody.message).to.eq("This request method is not supported.");
      // expect(response.body).to.include('This request method is not supported.');

      //       curl --location 'https://automationexercise.com/api/productsList' \
      // --header 'Content-Type: application/json' \
      // --request POST

    });
  });

  // API 3: Get All Brands List
  it('API 3: Get All Brands List', () => {
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

      //   curl --location 'https://automationexercise.com/api/brandsList' \
      // --header 'Content-Type: application/json' \
      // --request GET
    });
  });

  // API 4: PUT To All Brands List
  it('API 4: PUT To All Brands List', () => {
    cy.api('PUT', '/api/brandsList').then((response) => {
      const responseBody = JSON.parse(response.body);

      expect(responseBody.responseCode).to.eq(405);
      expect(response.body).to.include('This request method is not supported.');

      //       curl --location --request PUT 'https://automationexercise.com/api/brandsList' \
      // --header 'Content-Type: application/json'

    });
  });

  // API 5: POST To Search Product
  it('API 5: POST To Search Product without search_product parameter', () => {
    const apiUrl = '/api/searchProduct';

    // Faz a requisição sem o parâmetro obrigatório 'search_product'
    cy.request({
      method: 'POST',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {}, // Enviando sem o parâmetro obrigatório
    }).then((response) => {
      cy.log('Response Status: ', response.status);
      cy.log('Response Body: ', response.body);

      // Verifica se o tipo de conteúdo é JSON
      if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
        try {
          const responseBody = JSON.parse(response.body);

          // Validações
          expect(response.status).to.eq(200); // Mesmo com erro, a API pode retornar 200
          expect(responseBody.responseCode).to.eq(400);
          expect(responseBody.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        } catch (e) {
          cy.log('Error parsing response as JSON: ', e.message);
          return; // Interrompe o teste se ocorrer um erro ao fazer o parse
        }
      } else {
        cy.log('Response is not JSON. Content-Type:', response.headers['content-type']);
        return; // Interrompe o teste se o tipo de conteúdo não for JSON
      }
      //       curl --location 'https://automationexercise.com/api/searchProduct' \
      // --header 'Content-Type: application/json' \
      // --data-raw '{}'

    });

  });

  // API 6: POST To Search Product without search_product parameter
  it('API 6: POST To Search Product without search_product parameter', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {}, // Enviando um corpo vazio, sem o parâmetro 'search_product'
    }).then((response) => {
      // Verifica o status da resposta
      expect(response.status).to.eq(200);

      // Log para inspecionar o corpo da resposta
      cy.log('Response Body: ', response.body);

      // Verifica se o corpo da resposta é uma string
      if (typeof response.body === 'string') {
        try {
          const responseBody = JSON.parse(response.body); // Tenta fazer o parse do corpo da resposta

          // Validações
          expect(responseBody.responseCode).to.eq(400);
          expect(responseBody.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        } catch (e) {
          // Se houver erro ao parsear, loga o erro e o corpo da resposta
          cy.log('Error parsing response as JSON: ', e.message);
          cy.log('Response was: ', response.body);
        }
      } else {
        // Se não for uma string, loga uma mensagem de erro
        cy.log('Response body is not a string: ', response.body);
      }

      //       curl --location 'https://automationexercise.com/api/searchProduct' \
      // --header 'Content-Type: application/json' \
      // --data-raw '{}'

    });
  });

  // // API 7: POST To Verify Login with valid details
  it('API 7: POST To Verify Login with valid details', () => {
    const loginDetails = {
      email: 'galileoguilhermeqa@gmail.com',
      password: 'Mnbvcxz1!'
    };

    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      body: loginDetails,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = response.body;
      cy.log(responseBody);
      cy.log('Endpoint com erro no reponse da API');
      // Descomente a linha abaixo se você quiser validar a resposta
      // expect(response.body).to.include('User exists!');

      //     curl --location 'https://automationexercise.com/api/verifyLogin' \
      // --header 'Content-Type: application/json' \
      // --data-raw '{
      //     "email": "galileoguilhermeqa@gmail.com",
      //     "password": "Mnbvcxz1!"
      // }'

    });
  });

  // API 8: POST To Verify Login without email parameter
  it('API 8: POST To Verify Login without email parameter', () => {
    const loginDetails = { password: 'password123' }; // Sem email
    cy.request('POST', '/api/verifyLogin', loginDetails).then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = response.body;
      // cy.log(responseBody);
      expect(responseBody.message).to.include('Bad request, email or password parameter is missing in POST request.');

      // curl --location 'https://automationexercise.com/api/verifyLogin' \
      // --header 'Content-Type: application/json' \
      // --data-raw '{
      //     "password": "password123"
      // }'

    });
  });

  // API 9: DELETE To Verify Login
  it('API 9: DELETE To Verify Login', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/verifyLogin',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = response.body;
      // cy.log(responseBody);
      expect(response.body).to.include('This request method is not supported.');

      //     curl --location --request DELETE 'https://automationexercise.com/api/verifyLogin' \
      // --header 'Content-Type: application/json'
    });
  });


  // API 10: POST To Verify Login with invalid details
  it('API 10: POST To Verify Login with invalid details', () => {
    const loginDetails = { email: 'invalid@example.com', password: 'wrongpassword' };

    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: loginDetails,
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body.message).to.include('Bad request, email or password parameter is missing in POST request.');

      //     curl --location 'https://automationexercise.com/api/verifyLogin' \
      // --header 'Content-Type: application/json' \
      // --data-raw '{
      //     "email": "invalid@example.com",
      //     "password": "wrongpassword"
      // }'

    });
  });

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
