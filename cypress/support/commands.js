import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add(
  'makeLogin',
  (email = 'test@apimosa.es', password = '123456') => {
    cy.get('#email').should('have.value', '').type(email)
    cy.get('#password').should('have.value', '').type(password)
    cy.get('#loginBtn').click()
  }
)

Cypress.Commands.add('confirmAndSwipe', () => {
  cy.get('[data-cy="Confirmar"]').click()
  cy.get('[data-cy="Swipe"]').swipe([[100, 420]], [[350, 420]])
  cy.get('.swal2-confirm').click()
})

Cypress.Commands.add('mockGeolocation', (latitude = 30, longitude = -98) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, 'getCurrentPosition', (callback) => {
      return callback({ coords: { latitude, longitude } })
    })
  })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const fbConfig = {
  apiKey: Cypress.env('apiKey'),
  authDomain: Cypress.env('authDomain'),
  projectId: Cypress.env('projectId'),
  storageBucket: Cypress.env('storageBucket'),
  messagingSenderId: Cypress.env('messagingSenderId'),
  appId: Cypress.env('appId')
}

firebase.initializeApp(fbConfig)

attachCustomCommands({ Cypress, cy, firebase })
