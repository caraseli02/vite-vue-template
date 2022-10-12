// https://docs.cypress.io/api/introduction/api.html

describe('Login Test', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/')
    cy.url().should('include', '/auth')
  })
  it('Login, redirect to dashboard and Logout', () => {
    cy.get('#email')
      .should('have.value', '')
      .type('test@apimosa.es')
      .should('have.value', 'test@apimosa.es')
    cy.get('#password')
      .should('have.value', '')
      .type('123456')
      .should('have.value', '123456')
    cy.get('#loginBtn').click()
    cy.url().should('include', '/')
    cy.get('#btnLogout').click()
  })
  it('Show error on wrong password or email', () => {
    cy.get('#loginBtn').click()
    cy.contains('Email es requerido')
    cy.contains('Contraseña es requerido')
    cy.get('#email')
      .should('have.value', '')
      .type('test@apimosa.ess')
      .should('have.value', 'test@apimosa.ess')
    cy.get('#password').should('have.value', '').type('123457')
    cy.get('#loginBtn').click()
    cy.contains('El usuario no coincide con ninguna credencial')
    cy.contains('OK').click()
    cy.get('#email').clear().type('test@apimosa.es')
    cy.get('#loginBtn').click()
    cy.contains('Contraseña incorrecta')
  })
  it('Check password recovery', () => {
    cy.contains('¿Has olvidado tu contraseña?').click()
    cy.contains('Enviar').click()
    cy.contains(
      'Por favor, escriba una dirección de correo electrónico válida.'
    )
    cy.get('#emailForgot')
      .should('have.value', '')
      .type('test@apimosa.es')
      .click()
    cy.contains('Enviar').click()
    cy.contains('Enviado')
    cy.contains('OK').click()
  })
  it('Check Google Auth', () => {
    cy.get('[data-cy="google-sign-in"]').should('be.visible')
    cy.get('[data-cy="yahoo-sign-in"]').should('be.visible')
    cy.get('[data-cy="movil-sign-in"]').should('be.visible')
    cy.get('[data-cy="movil-sign-in"]').click()
    cy.get('[data-cy="movil-sign-in"]').should('not.be.visible')
    cy.get('[data-cy="google-sign-in"]').should('not.be.visible')
    cy.get('[data-cy="yahoo-sign-in"]').should('not.be.visible')
    cy.get('[data-cy="phone-input"]')
      .should('be.visible')
      .should('have.value', '')
      .should('have.class', 'bg-red-300')
      .type('675167719')
      .should('have.value', '675167719')
      .should('have.class', 'bg-gray-50 dark:bg-gray-700')
    cy.get('.close-movil-sign-in').click()
  })
  it('Check Auth Btn', () => {
    cy.get('#authCreate').click()
    cy.get('#signUp').should('be.visible')
    cy.get('#authLogin').click()
    cy.get('#signIn').should('be.visible')
  })
})