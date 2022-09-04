import firebase from 'firebase/app'
import 'firebase/firestore'

const fakeProject = {
  some: 'data',
  // Use new firebase.firestore.Timestamp.now in place of serverTimestamp()
  createdAt: firebase.firestore.Timestamp.now()
  // Or use fromDate if you would like to specify a date
  // createdAt: firebase.firestore.Timestamp.fromDate(new Date())
}

describe('Firebase Test', () => {
  const TEST_UID = Cypress.env('TEST_UID')
  const mockAge = 8

  beforeEach(() => {
    cy.visit('/')
    cy.callFirestore('delete', 'testCollection')
  })

  it('Make login and logout', () => {
    cy.login()
    cy.logout()
  })

  it('read/write test', () => {
    cy.log('Starting test')

    cy.callFirestore('set', `testCollection/${TEST_UID}`, {
      name: 'axa',
      age: 8
    })
    cy.callFirestore('get', `testCollection/${TEST_UID}`).then((r) => {
      cy.log('get returned: ', r)
      cy.wrap(r).its('age').should('equal', mockAge)
    })
    cy.log('Ended test')
  })
})
