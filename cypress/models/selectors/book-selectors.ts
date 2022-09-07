export default class BookSelectors {
  static readonly LastPage = ':nth-child(3) > .paging.btn';

  static readonly PageButton = '.paging-btn';

  static readonly AddBookButon = '[id="navigate-add-book-button"]';

  static readonly SaveAddBookButton = '.add-button';

  static readonly BackToSearchAdd = '[data-id="to-search-page-from-add-page-button"]';

  static readonly BackToSearchUpdate = '[data-id="to-search-page-from-update-book-button"]';

  static DeleteBook(bookIdNumber: string): string { return `[data-id="delete-book-from-search-table_${bookIdNumber}"]`};

  static OpenBookDetails(bookID: string): string { return `[data-id="open-book-from-search-table_${bookID}"]` };
  
  static BookGenreOption(genreId: string): string { return `#vs1__option-${genreId}` };
 
  static readonly OpenOrDeleteBook = '.table-button';
  
  static readonly BookGenreDropdown = '.vs__actions';

  static readonly BookTitle = '#book-title';

  static readonly BookDescription = '[data-id="book-description"]';

  static readonly BookAuthor = '[data-id="book-author"]';

  static readonly BookPublished = '[data-id="book-published-year"]';

  static readonly AvailableFrom = '#book-available-from';

  static readonly BookHasEbook = '#book-has-e-book';

  static readonly TitleSearchBar = ':nth-child(1) > #search-arg-book-title';

  static readonly AuthorSearchBar = ':nth-child(2) > #search-arg-book-title';

  static readonly AvailableFromSearchBar = '#search-arg-book-available-from';

  static readonly BookTitleResults = 'tr > :nth-child(1)';

  static readonly BookAuthorResults = 'tr > :nth-child(2)';

  static readonly PublishedYearResults = 'tr > :nth-child(3)';

  static readonly AvailableFromResults = 'tr > :nth-child(4)';

  static readonly ConfirmDeletion = '.action-button.confirm';

  static readonly UpdateButton = '.update-button';
}
