import { createAction, props } from '@ngrx/store';
import { Book } from './book';

export const invokeBooksAPI = createAction(
  '[Books API] Invoke books Fetch API'
);

export const booksFetchAPISuccess = createAction(
  '[Books API] Books Fetch API Success',
  props<{ allBooks: Book[] }>()
);
