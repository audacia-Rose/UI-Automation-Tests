describe('As a user I can edit book details as long as I am using the form correctly', () => {
  it('Allows a user to edit a books name', () => {
    // visit the homepage of the book website
    cy.visit('https://audacia-training-automationtesting-ui.azurewebsites.net/');

    // click on the last button
    cy.get(':nth-child(3) > .paging.btn').click();

    // Click on the book we want to edit
    cy.get('[data-id="open-book=from-search-table_166]').click();

    // clear the book title
    cy.get('#book-title').clear();

    // add new book title
    cy.get('#book-title').type('New book title');

    // click to update book title
    cy.get('.update-button').click();

    // Check that request to edit book returns status 200 code
    cy.wait('@editBook').then((intercept) => {
      const {statusCode} = intercept.response;
      expect(statusCode).to.equal(200);
    });

    // back to book search
    cy.get('[data-id="to-search-page-from-update-book-button"]').should('be.enabled').click();

    // click on the last button
    cy.get(':nth-child(3) > .paging.btn').click();

    // click on the book we have edited
    cy.get('[data-id="open-book=from-search-table_166"]').click();

    // check that the book title has been changed
    cy.get('#book-title').should('be.visible').should('have.value', 'New book title');

    // Now change the book name back to its original title...

    // clear the book title
    cy.get('#book-title').clear();

    // update to old book title
    cy.get('#book-title').type('Academy book title');

    // click to update book title
    cy.get('.update-button').click();
  });
});
