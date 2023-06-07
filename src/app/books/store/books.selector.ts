import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from './book';

// Feauture selector gets the whole state
export const selectBooks = createFeatureSelector<Book[]>('mybooks');

// Create selector gets a slice of the state, but since it doesn't take a parameter we do it this way
export const selectBookByID = (bookId: number) => {
  // selectBooks populates the book array which we can then filter
  return createSelector(selectBooks, (books: Book[]) => {
    var bookByID = books.filter((_) => _.id == bookId);
    if (bookByID.length == 0) {
      return null;
    }
    return bookByID[0];
  });
};
