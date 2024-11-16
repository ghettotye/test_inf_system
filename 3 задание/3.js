describe('SauceDemo Tests', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('should log in successfully', () => {
    
    cy.get('input[data-test="username"]').type(username);
    cy.get('input[data-test="password"]').type(password);
    cy.get('input[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('should add an item to the cart', () => {
    cy.get('input[data-test="username"]').type(username);
    cy.get('input[data-test="password"]').type(password);
    cy.get('input[data-test="login-button"]').click();

    cy.get('.btn_primary.btn_inventory').first().click();
    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item').should('have.length', 1);
  });

  it('should complete the checkout process', () => {
    cy.get('input[data-test="username"]').type(username);
    cy.get('input[data-test="password"]').type(password);
    cy.get('input[data-test="login-button"]').click();

    cy.get('.btn_primary.btn_inventory').first().click();
    cy.get('.shopping_cart_link').click();

    cy.get('.checkout_button').click();

    cy.get('input[data-test="firstName"]').type('John');
    cy.get('input[data-test="lastName"]').type('Doe');
    cy.get('input[data-test="postalCode"]').type('12345');
    cy.get('input[data-test="continue"]').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.title').should('contain', 'Checkout: Overview');

    cy.get('button[data-test="finish"]').click();

    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });
});