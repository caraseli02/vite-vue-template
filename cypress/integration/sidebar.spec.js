describe('Sidebar Test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login()
  })

  it('Login, redirect to home and Logout', () => {
    cy.url().should('include', '/')
    cy.get('[data-cy=sidebarBtn]').click()
    cy.get('[data-cy=name]').should('be.visible')
    cy.get('[data-cy=email]').should('be.visible')
    cy.contains(' Horario de Trabajo ')
    cy.contains(' Centro de Trabajo ')
    cy.contains('Aviso Legal')
    cy.contains('Política de cookies')
    cy.contains('Política de privacidad')
    cy.contains('Términos y condiciones')
    cy.contains('Cerrar Session')
    cy.contains('Borrar la cuenta')
    cy.get('[data-cy=workplaceSidebar]').its('length').should('equal', 1)
    cy.get('[data-cy=sidebarLogout').click()
  })
})
