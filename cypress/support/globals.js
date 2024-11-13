// Função para gerar e-mail aleatório
export function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `testuser${randomString}@example.com`;
  }
  
  // Função para gerar senha aleatória
  export function generateRandomPassword() {
    const randomPassword = Math.random().toString(36).substring(2, 10);
    return randomPassword;
  }
  
  // Variáveis para dados do usuário
  export const userDetails = {
    name: 'Test User',
    email: generateRandomEmail(),
    password: generateRandomPassword(),
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test St',
    address2: 'Suite 101',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890'
  };
  