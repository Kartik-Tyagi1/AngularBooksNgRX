import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.actions';
import { Appstate } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  booksFetchAPISuccess,
  invokeBooksAPI,
  invokeSaveBookAPI,
  invokeUpdateBookAPI,
  saveBookAPISuccess,
  updateBookAPISuccess,
} from './books.actions';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private appStore: Store<Appstate>,
    private store: Store
  ) {}

  getAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI), // verify action method
      withLatestFrom(this.store.pipe(select(selectBooks))), // No need for extra server call if state is same -> booksFromStore
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookAPI),
      switchMap((payload) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.create(payload.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveBookAPISuccess({ response: data });
          })
        );
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((payload) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.bookService.update(payload.updatedBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISuccess({ response: data });
          })
        );
      })
    )
  );
}
