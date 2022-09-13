declare namespace Cypress {
    interface Chainable {

        selectNewBook(bookID: string): Chainable<Element>;

        addNewBook(
            title: string,
            description: string,
            author: string,
            yearPublished: string,
            dateAvailable: string,
            ebookTrueFalse: boolean,
            genreId: string
        ): Chainable<Element>;

        getBookId(): Chainable<string>;

        editBook(
            // bookID: string,
            newHasEBook: boolean,
            newTitle: string,
            newDescription: string,
            newAuthor: string,
            newPublishedYear: number,
            newAvailableFrom: string,
            newBookGenreId: number,
        ): Chainable<Element>;

        addBookAPI(
            title: string,
            description: string,
            author: string,
            publishedYear: number,
            availableFrom: string,
            hasEBook: boolean,
            bookGenreId: number,
        ): Chainable<Element>;

        addBookCatAPI(
            genre: string
        ): Chainable<Element>
    }
}
