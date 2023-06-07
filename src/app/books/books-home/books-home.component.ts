import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.actions';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.actions';
import { selectBooks } from '../store/books.selector';

declare var window: any;

@Component({
  selector: 'app-books-home',
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.css'],
})
export class BooksHomeComponent {
  constructor(private store: Store, private appStore: Store<Appstate>) {}

  // This variables watches for any changes to the store
  // Any change in the store gets auto updated here and pushed into books$ observerable
  books$ = this.store.pipe(select(selectBooks));

  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  closeDeleteModal() {
    this.deleteModal.hide();
  }

  confirmDelete() {
    this.store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        // Reset the state
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus: { apiResponseMessage: '', apiStatus: '' },
          })
        );
        this.deleteModal.hide();
      }
    });
  }
}
