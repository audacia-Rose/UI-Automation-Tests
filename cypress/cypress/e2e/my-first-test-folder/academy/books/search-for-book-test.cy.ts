import Env from '../../../../../models/env';
import BookSelectors from '../../../../../models/selectors/book-selectors';

describe('As a user I can use the search on the homepage to search for a book', () => {
    it('Allows a user to search for a book by title from the homepage', () => {
        
        let bookTitle = 'Book New New Title'

        /* Visit Homepage */
        cy.visit(Env.HomepageUrl);

        /* Types book title into the search bar */
        cy.get(BookSelectors.TitleSearchBar).type(bookTitle);

        /* Clicks 'search' */
        cy.get('.search').click()

        /* Checks that searched book is visible in results page */
        cy.get(BookSelectors.BookTitleResults).contains(bookTitle);

        /* Clear search argument */
        cy.get('.clear').click();
    }),
    it('Allows a user to search for a book by author from the homepage', () => {
        
        let bookAuthor = 'Roald Dahl'

        /* Visit Homepage */
        cy.visit(Env.HomepageUrl);

        /* Types book title into the search bar */
        cy.get(BookSelectors.AuthorSearchBar).type(bookAuthor);

        /* Clicks 'search' */
        cy.get('.search').click()

        /* Checks that searched book is visible in results page */
        cy.get(BookSelectors.BookAuthorResults).contains(bookAuthor);

        /* Clear search argument */
        cy.get('.clear').click();
    }),
    it('Allows a user to search for a book by "available from" date from the homepage', () => {
        
        let availableFrom = '1964-11-23'

        /* Change the date format entered to how it appears in the results table: 'YYYY-MM-DD' to 'DD/MM/YYYY' */
        let dateArray = availableFrom.split('-');
        dateArray = dateArray.reverse();
        let dateText = dateArray.join('/');

        /* Visit Homepage */
        cy.visit(Env.HomepageUrl);

        /* Types book title into the search bar */
        cy.get(BookSelectors.AvailableFromSearchBar).type(availableFrom);

        /* Clicks 'search' */
        cy.get('.search').click()

        /* Checks that searched book is visible in results page */
        cy.get(BookSelectors.AvailableFromResults).contains(dateText);

        /* Clear search argument */
        cy.get('.clear').click();
    })
})