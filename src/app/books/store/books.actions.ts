import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksAPI = createAction(
  '[Books API] Invoke books Fetch API'
);

export const booksFetchAPISuccess = createAction(
  '[Books API] Books Fetch API Success',
  props<{ allBooks: Book[] }>()
);

export const invokeSaveBookAPI = createAction(
  '[Books API] Invoke save book API',
  props<{ newBook: Book }>()
);

export const saveBookAPISuccess = createAction(
  '[Books API] Save Book API Success',
  props<{ response: Book }>()
);

export const invokeUpdateBookAPI = createAction(
  '[Books API] Invoke update Book API',
  props<{ updatedBook: Book }>()
);

export const updateBookAPISuccess = createAction(
  '[Books API] Update Book API Success',
  props<{ response: Book }>()
);

export const invokeDeleteBookAPI = createAction(
  '[Books API] Invoke Delete Book API',
  props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
  '[Books API] Delete Book API Success',
  props<{ response: number }>()
);
