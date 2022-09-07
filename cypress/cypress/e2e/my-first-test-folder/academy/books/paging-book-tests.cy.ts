import Env from '../../../../../models/env';
import BookSelectors from '../../../../../models/selectors/book-selectors';

// Navigating to different pages
describe('As a user I can use the paging buttons to go to the second and last page', () => {
    it('Allows a user to navigate to the second page', () => {
        /* Visit Homepage */
        cy.visit(Env.HomepageUrl);

        /* Navigate to second page */
        cy.get(BookSelectors.PageButton).should('be.visible').contains('2').click();
    }),

    it('Allows a user to navigate to the last page', () => {
        /* Visit Homepage */
        cy.visit(Env.HomepageUrl);

        /* Navigate to last page */
        cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();
    })
})