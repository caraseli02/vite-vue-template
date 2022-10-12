import LoadingBtn from '~/components/buttons/LoadingBtn.vue'

it('renders the modal content', () => {
  cy.mount(LoadingBtn, { slots: { default: () => 'Content' }, props: { loading: true}})
})
