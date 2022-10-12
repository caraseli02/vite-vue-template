import PrimaryBtn from '~/components/buttons/PrimaryBtn.vue'

it('renders the modal content', () => {
  cy.mount(PrimaryBtn, { slots: { default: () => 'Content' }, props: { color: 'purpleBlue'}})
    .get('[data-cy="primaryBtn"]')
    .should('have.text', 'Content')
    .should('have.class', 'from-purple-600')
})
