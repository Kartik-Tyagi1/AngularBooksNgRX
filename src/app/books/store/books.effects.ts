import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { BooksService } from '../books.service';
import { booksFetchAPISuccess, invokeBooksAPI } from './books.actions';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private bookService: BooksService) {}

  getAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI), // verify action method
      switchMap(() => {
        return this.bookService
          .get()
          .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
      })
    )
  );
}
