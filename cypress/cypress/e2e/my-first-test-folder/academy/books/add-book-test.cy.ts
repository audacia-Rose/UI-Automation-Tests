import Env from '../../../../../models/env';
import BookSelectors from '../../../../../models/selectors/book-selectors';

let title = null;
describe('As a user I can add a new book & its details as long as I am using the form correctly', () => {
  it('Allows a user to add and save a new book', () => {
    /* visit the homepage of the book website */
    cy.visit(Env.HomepageUrl);

    cy.addNewBook(
      title = 'Charlie and the Chocolate Factory',
      'The adventures of young Charlie Bucket inside the chocolate factory of eccentric chocolatier Willy Wonka.',
      'Roald Dahl',
      '1964',
      '1964-11-23',
      true,
      '0',
    ).then((_) => {
      /* alert should show saying 'Added a new book' */
      /* Wait until new book has been saved */
      cy.wait(2000).then(() => {
        /* Page then changes to 'update book' page of new book where URL contains your new book ID - extract book ID from URL */
        cy.getBookId().then((newBookId) => {
          /* back to book search 'To Search Page' */
          cy.get(BookSelectors.BackToSearchUpdate).click();

          /* go to last page where I will find the new book I just added */
          cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

          /* check from table that your new book exists in results */
          cy.get(BookSelectors.BookTitleResults).contains(title);

          /* Remove the new book we have added */
          cy.get(BookSelectors.DeleteBook(newBookId)).click();

          /* Click to confirm deletion */
          cy.get(BookSelectors.ConfirmDeletion).click();
        });
      });
    });
  });
});
