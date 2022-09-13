import Env from "../../../../../models/env"
import BookSelectors from "../../../../../models/selectors/book-selectors"

let bookId = null
describe("As a user I can delete a book from the system", () => {
  beforeEach(() => {
    /* Intercept the API call so we can extract data and check status code */
    cy.intercept(Env.BaseApiUrl + 'book/Add').as('addBook')
    /* Add a new book */
    cy.addBookAPI(
      'The Shining',
      'The spine-tingling story of a hotel caretaker driven to monstrous insanity by supernatural forces.',
      'Stephen King',
      1977,
      '1977-01-28',
      true,
      1
      /* Extract status code and book ID from API call */
    ).then((response) => { bookId = response });

  })

  it("Allows a user to delete a book from the system", () => {
    /* Visit homepage */
    cy.visit(Env.HomepageUrl);

    /* Navigate to last page where we will find the book added in the last row */
    cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

    /* Click the delete button for the book with ID we found from API */
    cy.get(BookSelectors.DeleteBook(bookId)).click()

    /* Confirm the deletion of the book */
    cy.get(BookSelectors.ConfirmDeletion).click()
  })
})