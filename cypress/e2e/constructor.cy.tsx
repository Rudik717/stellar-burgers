/// <reference types="cypress" />

describe('Тест ингредиентов в конструкторе', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1366, 768);
    cy.visit('');
    cy.get('[data-testid=constructor]').as('constructor');
    cy.get('[data-testid=buns]').as('bun');
    cy.get('[data-testid=mains]').as('mains');
    cy.get('[data-testid=sauces]').as('sauces');
  });
  it('add bun', () => {
    cy.get('@bun').contains('Добавить').click();
    cy.get('[data-testid=bun-1]').contains('Ингредиент 1').should('exist');
    cy.get('[data-testid=bun-2]').contains('Ингредиент 1').should('exist');
  });

  it('add ingredient', () => {
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();
    cy.get('@constructor').contains('Ингредиент 2').should('exist');
    cy.get('@constructor').contains('Ингредиент 4').should('exist');
  });
});

describe('Тест модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1366, 768);
    cy.visit('');
  });

  it('open modal', () => {
    cy.contains('Ингредиент 1').click();
    cy.get('#modals').contains('Ингредиент 1').should('exist');
    cy.contains('Информация об ингредиенте').should('exist');
  });

  it('close modal by clicking on the cross', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Информация об ингредиенте').should('exist');
    cy.get('[data-testid=button-modal]').click();
    cy.contains('Информация об ингредиенте').should('not.exist');
  });

  it('close modal by clicking on overlay', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Информация об ингредиенте').should('exist');
    cy.get('[data-testid=modal-overlay]').click('left', { force: true });
    cy.contains('Информация об ингредиенте').should('not.exist');
  });
});

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.viewport(1366, 768);
    cy.visit('');
    cy.get('[data-testid=constructor]').as('constructor');
    cy.get('[data-testid=buns]').as('bun');
    cy.get('[data-testid=mains]').as('mains');
    cy.get('[data-testid=sauces]').as('sauces');
  });

  it('add ingredients and create order', () => {
    cy.get('@bun').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();
    cy.get('[data-testid=order-button]').click();

    cy.get('[data-testid=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('123').should('exist');
    cy.get('[data-testid=button-modal]').click();
    cy.get('@orderNumber').should('not.exist');

    cy.get('@constructor').contains('Ингредиент 1').should('not.exist');
    cy.get('@constructor').contains('Ингредиент 2').should('not.exist');
    cy.get('@constructor').contains('Ингредиент 4').should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
