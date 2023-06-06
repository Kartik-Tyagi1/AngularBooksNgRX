import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeBooksAPI } from '../store/books.actions';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-books-home',
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.css'],
})
export class BooksHomeComponent {
  constructor(private store: Store) {}

  // This variables watches for any changes to the store
  // Any change in the store gets auto updated here and pushed into books$ observerable
  books$ = this.store.pipe(select(selectBooks));

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
  }
}
