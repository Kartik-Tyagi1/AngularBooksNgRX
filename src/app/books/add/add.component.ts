import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.actions';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Book } from '../store/book';
import { invokeSaveBookAPI } from '../store/books.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  save() {
    this.store.dispatch(invokeSaveBookAPI({ newBook: { ...this.bookForm } }));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        // Reset the state
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: { apiResponseMessage: '', apiStatus: '' },
          })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
