import TourManagement from '@/views/TourManagement.vue'

describe('TourManagement', () => {
  it('should mount', () => {
    cy.mount(TourManagement, {})
  })

  it('renders "Customer" label with form field', () => {
    cy.mount(TourManagement, {})
    cy.get('.tour_field-label').should('contain', 'Customer')
    cy.get('input').should('have.attr', 'id', 'customer')
  })

  it('renders "Shipment Date" label with form field', () => {
    cy.mount(TourManagement, {})
    cy.get('.tour_field-label').should('contain', 'Shipment Date')
    cy.get('input').eq(1).should('have.attr', 'id', 'shipmentDate')
  })

  it('renders "Location From" label with form field', () => {
    cy.mount(TourManagement, {})
    cy.get('.tour_field-label').should('contain', 'Location From')
    cy.get('input').eq(2).should('have.attr', 'id', 'locationFrom')
  })

  it('renders "Location To" label with form field', () => {
    cy.mount(TourManagement, {})
    cy.get('.tour_field-labelllll').should('contain', 'Location To')
    cy.get('input').eq(3).should('have.attr', 'id', 'locationTo')
  })

  it('renders "Assigned Driver" label with select field', () => {
    cy.mount(TourManagement, {})
    cy.get('.tour_field')
      .eq(4)
      .find('label[for="assignedDriverName"]')
      .should('contain', 'Assigned driver:')
    cy.get('select').then((select) => {
      const selectElement = select[0]
      const options = selectElement.options
      const optionElement = options[1]

      const attributeValue = optionElement.getAttribute('id')
      cy.log(`The value of the data-custom-attribute is: ${attributeValue}`)
      cy.wrap(attributeValue).should('eq', 'driverName')
    })
  })

  it('renders "Save Tour" & "Delete Tour" buttons', () => {
    cy.mount(TourManagement, {})

    const tourButtonsWrapper = cy.get('.tour_buttons')

    tourButtonsWrapper.first().within(() => {
      cy.get('button').contains('Save Tour').should('have.attr', 'type', 'submit')

      cy.get('button').contains('Delete Tour').should('have.attr', 'type', 'button')
    })
  })
})
