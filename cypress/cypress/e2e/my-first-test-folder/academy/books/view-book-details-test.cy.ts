import Env from "../../../../../models/env";
import BookSelectors from "../../../../../models/selectors/book-selectors";

describe("As a user I can view a book's details", () => {
    it("Allows a user to open up any book's details on the first page by ID", () => {

        cy.visit(Env.HomepageUrl);

        cy.get(BookSelectors.OpenBookDetails('88')).click();

        cy.get(BookSelectors.BackToSearchUpdate).click()

    }),

    it("Allows a user to open up any book's details on the last page by ID", () => {

        cy.visit(Env.HomepageUrl);

        cy.get(BookSelectors.PageButton).should('be.visible').contains('Last').click();

        cy.get(BookSelectors.OpenBookDetails('322')).click();

        cy.get(BookSelectors.BookTitle).should('have.value', 'Charlie and the Chocolate Factory');

        cy.get(BookSelectors.BackToSearchUpdate).click()

    })
})