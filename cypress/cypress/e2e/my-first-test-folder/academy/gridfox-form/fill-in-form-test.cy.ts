import Env from "../../../../../models/env";
import FormSelectors from "../../../../../models/selectors/form-selectors";

describe('As a user I can submit a holiday request as long as I am using the form correctly', () => {
  it('Allows a user to fill in the form and submit', () => {
    /* Visit the webpage for the holiday request form */
    cy.visit(Env.FormUrl)

    /* Input name into name field */
    cy.get(FormSelectors.NameField).type('Rose Hadley')

    cy.get(':nth-child(3) > .mt-2 > .g-form-field > .datepicker > input').click().then(() => {

      cy.get(FormSelectors.SelectMonths).click()
      
      cy.get(FormSelectors.ChooseMonth(8)).click();

      cy.get(FormSelectors.SelectYears).click().contains('2021').click();

      // cy.get(FormSelectors.DayOfMonth).contains('29').click();

    });

    cy.get(':nth-child(4) > .mt-2 > .g-form-field > .datepicker > input').click().then(() => {

    })






  })
})
