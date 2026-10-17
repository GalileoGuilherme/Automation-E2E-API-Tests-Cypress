/// <reference types="cypress" />

const parseResponseBody = (body) => (typeof body === 'string' ? JSON.parse(body) : body);

describe('Product catalog API', () => {
  it('returns products with valid details and unique IDs', () => {
    cy.api('GET', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200);
      const body = parseResponseBody(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an('array').and.not.be.empty;

      const productIds = body.products.map((product) => product.id);

      expect(new Set(productIds).size).to.eq(productIds.length);
      body.products.forEach((product) => {
        expect(product).to.include.all.keys('id', 'name', 'price', 'brand', 'category');
        expect(product.id).to.be.a('number');
        expect(product.name).to.be.a('string').and.not.be.empty;
        expect(product.price).to.be.a('string').and.not.be.empty;
        expect(product.brand).to.be.a('string').and.not.be.empty;
        expect(product.category).to.have.property('category').that.is.a('string').and.not.be.empty;
      });
    });
  });

  it('returns brands with names and unique IDs', () => {
    cy.api('GET', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200);
      const body = parseResponseBody(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.brands).to.be.an('array').and.not.be.empty;

      const brandIds = body.brands.map((brand) => brand.id);

      expect(new Set(brandIds).size).to.eq(brandIds.length);
      body.brands.forEach((brand) => {
        expect(brand.id).to.be.a('number');
        expect(brand.brand).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('finds products matching the search term', () => {
    const searchTerm = 'top';

    cy.api({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      body: { search_product: searchTerm },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = parseResponseBody(response.body);
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an('array').and.not.be.empty;
      expect(body.products.some((product) => product.name.toLowerCase().includes(searchTerm))).to.be.true;
      body.products.forEach((product) => {
        expect(product).to.include.all.keys('id', 'name', 'price', 'brand', 'category');
      });
    });
  });
});
