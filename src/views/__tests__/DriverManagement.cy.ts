import DriverManagement from '@/views/DriverManagement.vue'

describe('DriverManagement', () => {
  it('should mount', () => {
    cy.mount(DriverManagement, {})
  })

  it('renders "Customer" label with form field', () => {
    cy.mount(DriverManagement, {})
    cy.get('.driver_field-label').should('contain', 'Customer')
    cy.get('input').should('have.attr', 'id', 'name')
  })

  it('renders "Location" label with form field', () => {
    cy.mount(DriverManagement, {})
    cy.get('.driver_field-label').should('contain', 'Location')
    cy.get('input').eq(1).should('have.attr', 'id', 'location')
  })

  it('renders "Save Driver" button of type submit', () => {
    cy.mount(DriverManagement, {})
    cy.get('.driver--save').should('contain', 'Save Driver')
    cy.get('.driver--save').should('have.attr', 'type', 'submit')
  })

  it('renders "Add Driver" button', () => {
    cy.mount(DriverManagement, {})
    cy.get('button').should('contain', 'Add Driver')
    cy.contains('Add Driver')
      .then(($btn) => {
        const button = $btn?.[0];
        expect(button, 'checking for click event listener').to.have.property('onclick');
      });
  })
})
