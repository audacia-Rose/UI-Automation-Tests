import Env from "../../../../../models/env"
import BookSelectors from "../../../../../models/selectors/book-selectors"

let bookId = null
describe("As a user I can delete a book from the system", () => {
  beforeEach(() => {

    cy.intercept(Env.BaseApiUrl + 'book/Add').as('addBook')

    cy.addBookAPI(
      'The Shining',
      'The spine-tingling story of a hotel caretaker driven to monstrous insanity by supernatural forces.',
      'Stephen King',
      1977,
      '1977-01-28',
      true,
      1
    ).then((response) => {bookId = response});

    cy.log(bookId)


    // cy.wait('@addBook').then((intercept) => {
    //   const { statusCode } = intercept.response;
    //   expect(statusCode).to.equal(201);
    // })


    // hello world
    // showing PR
  })

  it("Allows a user to delete a book from the system", () => {
    /* Visit homepage */
    cy.visit(Env.HomepageUrl);
    /* Navigate to last page where we will find the book added in the last row */
    cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

    cy.get(BookSelectors.OpenOrDeleteBook).last().click()

    cy.get(BookSelectors.ConfirmDeletion).click()
  })
})
