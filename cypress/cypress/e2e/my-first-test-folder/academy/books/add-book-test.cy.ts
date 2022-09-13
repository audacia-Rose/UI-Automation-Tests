import { stringify } from 'querystring';
import Env from '../../../../../models/env';
import BookSelectors from '../../../../../models/selectors/book-selectors';

let title = null;
let bookCategoryId = null;
let yearPublished = null;
describe('As a user I can add new books and book categories as long as I am using the form correctly', () => {
  it('Allows a user to add and save a new book', () => {
    /* visit the homepage of the book website */
    cy.visit(Env.HomepageUrl);
    /* Add new book to system by clicking through */
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
      cy.url().should('contain', '.net/book/').then(() => {
        /* Page then changes to 'update book' page of new book where URL contains your new book ID - extract book ID from URL */
        cy.getBookId().then((newBookId) => {
          /* back to book search 'To Search Page' */
          cy.get(BookSelectors.BackToSearchUpdate).click();

          /* go to last page where I will find the new book I just added */
          cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

          /* check (by title) from table that your new book exists in results */
          cy.get(BookSelectors.BookTitleResults).should('contain', title);

          /* Remove the new book we have added */
          cy.get(BookSelectors.DeleteBook(newBookId)).click();

          /* Click to confirm deletion */
          cy.get(BookSelectors.ConfirmDeletion).click();
        });
      });
    });
  });

  it('Allows a user to add a new book category, then add a new book under the new category id', () => {

    /* Add new book category by calling POST api HTTP method */
    cy.addBookCatAPI("Graphic Novels")
      .then((response) => {
        bookCategoryId = response;
      }).then(() => {
        cy.log(bookCategoryId)

        /* Go to the homepage */
        cy.visit(Env.HomepageUrl);

        /* Add new book using book category ID variable above */
        cy.addNewBook(
          title = 'IT',
          'Seven friends face an evil shape-shifting entity that feeds on the fears of children.',
          'Stephen King',
          yearPublished = '1987',
          '1986-09-15',
          true,
          bookCategoryId
          /* try removing this then & see if still works */
          /* maybe add in wait for add new book category to finish */
        ).then((_) => {
          /* alert should show saying 'Added a new book' */
          /* Wait until new book has been saved and url updated to include new book ID */
          cy.url().should('contain', '.net/book/').then(() => {

            /* Page then changes to 'update book' page of new book where URL contains your new book ID - extract book ID from URL */
            cy.getBookId().then((newBookId) => {

              /* back to book search 'To Search Page' */
              cy.get(BookSelectors.BackToSearchUpdate).click();

              /* go to last page where I will find the new book I just added */
              cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

              /* check (by title and year published) from table that your new book exists in results */
              cy.get(BookSelectors.BookTitleResults).should('contain', title && yearPublished);

              /* Remove the new book we have added */
              cy.get(BookSelectors.DeleteBook(newBookId)).click();

              /* Click to confirm deletion */
              cy.get(BookSelectors.ConfirmDeletion).click();
            })
          })
        })
      });
  })
});
