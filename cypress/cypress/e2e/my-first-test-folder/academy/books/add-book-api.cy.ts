import Env from "../../../../../models/env"

describe("As a user I can add a book and its details to the database", () => {
  
  afterEach(() => {
    /* Check that the url contains the id for the book we have created */
    cy.url().should('contain', '.net/book/').then(() => {
      /* Extract the book ID from the url */
      cy.getBookId().then((id: string) => {
        /* Call the DELETE api to remove the book we have just added */
        cy.request({
          method: 'DELETE',
          url: `${Env.BaseApiUrl}book/${id}`,
          auth: { bearer: '' }
        })
      })
    })
  })
  it('Allows a user to add a book and its details into the system', () => {
    /* Visit the book homepage */
    cy.visit(Env.HomepageUrl)
    /* Adds new book with details as described */
    cy.addNewBook(
      'The Story of Tracy Beaker',
      'Tracy Beaker is a funny, imaginative and articulate ten-year-old girl, but she can also be angry, impulsive and a bit violent too.',
      'Jacqueline Wilson',
      '1991',
      '1991-02-14',
      false,
      '4'
    )
  })
})