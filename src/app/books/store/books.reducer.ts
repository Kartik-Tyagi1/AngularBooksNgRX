import { createReducer, on } from '@ngrx/store';
import { Book } from './book';
import {
  booksFetchAPISuccess,
  deleteBookAPISuccess,
  saveBookAPISuccess,
  updateBookAPISuccess,
} from './books.actions';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),
  on(saveBookAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id); // remove old book
    newState.unshift(response); // add updated book
    return newState;
  }),
  on(deleteBookAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response); // remove old book
    return newState;
  })
);
