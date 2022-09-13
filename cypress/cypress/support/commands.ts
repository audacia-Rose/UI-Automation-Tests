// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


import Env from '../../models/env';
import BookSelectors from '../../models/selectors/book-selectors';

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectNewBook', (bookId: string) => {
  cy.visit(Env.HomepageUrl);
  cy.get(BookSelectors.PageButton).contains('Last').click();
  cy.get(BookSelectors.OpenBookDetails(bookId)).click();
});

Cypress.Commands.add('addNewBook',
  (
    title: string,
    description: string,
    author: string,
    yearPublished: string,
    dateAvailable: string,
    ebookTrueFalse: boolean,
    genre: string,

  ) => {
    /* click on the 'Add New Book' button */
    cy.get(BookSelectors.AddBookButon).click();

    /* add new book title */
    cy.get(BookSelectors.BookTitle).type(title);

    /* add book description */
    cy.get(BookSelectors.BookDescription).type(description);

    /* add book author */
    cy.get(BookSelectors.BookAuthor).type(author);

    /* add year published */
    cy.get(BookSelectors.BookPublished).type(yearPublished);

    /* add available from */
    cy.get(BookSelectors.AvailableFrom).type(dateAvailable);

    /* add has e-book option */
    if (ebookTrueFalse === true) {
      cy.get(BookSelectors.BookHasEbook).click();
    }

    /* add book category */
    cy.get(BookSelectors.BookGenreDropdown).click();
    cy.get(BookSelectors.BookGenreOption(genre)).click();

    /* click 'Add New Book' to save book */
    cy.get(BookSelectors.SaveAddBookButton).click();
  });

Cypress.Commands.add('editBook',
  (
    // bookID: string,
    newHasEBook: boolean,
    newTitle?: string,
    newDescription?: string,
    newAuthor?: string,
    newPublishedYear?: number,
    newAvailableFrom?: string,
    newBookGenreId?: number,
  ) => {
    /* Visit the book page of the book you want to edit */
    // cy.visit(`${Env.HomepageUrl}book/${bookID}`)

    /* The if statements ensure only the chosen fields are changed */
    /* If the new book title is not null, we type in the new title */
    if (newTitle !== null) {
      cy.get(BookSelectors.BookTitle).clear()
      cy.get(BookSelectors.BookTitle).type(newTitle)
    }

    /* Enter a new description if we have chosen to */
    if (newDescription !== null) {
      cy.get(BookSelectors.BookDescription).clear();
      cy.get(BookSelectors.BookDescription).type(newDescription);
    }

    /* If the author field has a new value, type in the new value */
    if (newAuthor !== null) {
      cy.get(BookSelectors.BookAuthor).clear();
      cy.get(BookSelectors.BookAuthor).type(newAuthor);
    }

    /* Update the year published */
    if (newPublishedYear !== null) {
      cy.get(BookSelectors.BookPublished).clear();
      cy.get(BookSelectors.BookPublished).type(`${newPublishedYear}`);
    }

    /* Update the date available from if new date is entered */
    if (newAvailableFrom !== null) {
      cy.get(BookSelectors.AvailableFrom).clear();
      cy.get(BookSelectors.AvailableFrom).type(newAvailableFrom);
    }

    /* Uncheck the ebook option and leave unchecked if false, or check the box if true */
    cy.get('[type = "checkbox"]').uncheck();
    if (newHasEBook === true) {
      cy.get('[type = "checkbox"]').check();
    }
    /* Choose the new book genre */
    if (newBookGenreId !== null) {
      cy.get(BookSelectors.BookGenreDropdown).click();
      cy.get(BookSelectors.BookGenreOption(`${newBookGenreId}`)).click();
    }

    /* Save your updated details */
    cy.get(BookSelectors.UpdateButton).click();

  });

Cypress.Commands.add('getBookId', () => {
  /* extract url containing book ID and 
     return the book ID as a string */
  cy.location().then((fullUrl) => {
    const pathName = fullUrl.pathname;
    const arr = pathName.split('/');
    const bookIdNumber: string = arr[2];
    return cy.wrap(bookIdNumber);
  });
});

Cypress.Commands.add('addBookAPI', (
  /* Add in all thbe book details we want */
  title: string,
  description: string,
  author: string,
  publishedYear: number,
  availableFrom: string,
  hasEBook: boolean,
  bookGenreId: number,
) => {
  /* POST HTTP request to add new book with above parameters */
  cy.request({
    method: 'POST',
    url: `${Env.BaseApiUrl}book/Add`,
    body: {
      title: title,
      description: description,
      author: author,
      publishedYear: publishedYear,
      availableFrom: availableFrom,
      hasEBook: hasEBook,
      bookCategoryId: bookGenreId
    },
    auth: {
      bearer: '',
    }
  /* Check that the status code is 201
    Output the book ID */
  }).should((response) => {
    expect(response.status).to.eq(201);
  }).then((response) => response.body.output.id);
})

Cypress.Commands.add('addBookCatAPI', (
  genre: string
) => {
  cy.request({
    method: 'POST',
    url: `${Env.BaseApiUrl}BookCategory/Add`,
    body: {
      name: genre
    },
    auth: { 
      bearer: '',
    }
    /* Check request succeeded */
  }).should((response) => {
    expect(response.status).to.eq(201);
    /* Capture the new book category ID in a variable */
  }).then((response) => response.body.output.id)
})
