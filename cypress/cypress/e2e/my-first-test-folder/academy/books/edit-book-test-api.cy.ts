import Env from '../../../../../models/env';
import BookSelectors from '../../../../../models/selectors/book-selectors';

describe("As a user I can edit a book's details as long as I am using the form correctly", () => {
  /* Add the book we are going to update */
  beforeEach(() => {
    /* Visit the homepage */
    cy.visit(Env.HomepageUrl);
    /* Add new book to the system */
    cy.addNewBook(
      'The Cat in the Hot',
      'Cat in the Hat Book Description',
      'Theodor Geisel',
      '1957',
      '1957-03-12',
      true,
      '0',
    )
  })
  /* Data Cleanup */
  afterEach(() => {
    /* Check we are on the page containing the book ID in the URL */
    cy.url().should('contain', '.net/book/').then(() => {
      /* Extract book ID we have created & updated */
      cy.getBookId().then((newBookId) => {
        /* Delete book */
        cy.request({
          method: 'DELETE',
          url: `${Env.BaseApiUrl}book/${newBookId}`,
          auth: { bearer: '' }
        })
      })
    })
  })

  it("Allows a user to edit a book's details by calling the PUT api", () => {
    /* Wait until url has redirected to the /book/{ID} page */
    cy.url().should('contain', '.net/book/').then(() => {
      /* Obtain book ID from URL */
      cy.getBookId().then((newBookId) => {
        /* request the PUT api of the book website with details we want to update to */
        cy.request({
          method: 'PUT',
          url: `${Env.BaseApiUrl}book/Update`,
          body: {
            id: newBookId,
            title: 'The Cat in the Hat',
            description: 'The story centres on a tall anthropomorphic cat who wears a red and white-striped top hat and a red bow tie.',
            author: 'Dr. Seuss',
            publishedYear: 1957,
            availableFrom: '1957-03-12',
            hasEBook: true,
            bookCategoryId: 4,
          },
          auth: {
            bearer: '',
          }
        })
      });
    });
  });

  it("Allows a user to edit a book's details on the UI website", () => {

    /* Check we are on the correct url of the book */
    cy.url().should('contain', '.net/book/').then(() => {

      /* Capture the book ID from the URL */
      cy.getBookId().then((newBookId) => {

        /* Go to the book update page */
        cy.visit(`${Env.HomepageUrl}book/${newBookId}`)

        /* Update book with new information */
        /* Note: If a field does not need to be updated, set as null.
        Or, enter the new values of the fields */
        cy.editBook(
          true,
          'The Cat in the Hat',
          'The story centres on a tall anthropomorphic cat who wears a red and white-striped top hat and a red bow tie.',
          'Dr. Seuss',
          null,
          null,
          4
        )

        /* Check that the book now has the updated information  */
        cy.get(BookSelectors.BookTitle).should('have.value', 'The Cat in the Hat')
        cy.get(BookSelectors.BookAuthor).should('have.value', 'Dr. Seuss')
      })
    })
  })
});