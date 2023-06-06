import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../store/book';
import { invokeSaveBookAPI } from '../store/books.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(private store: Store) {}

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  save() {
    this.store.dispatch(invokeSaveBookAPI({ newBook: { ...this.bookForm } }));
  }
}
