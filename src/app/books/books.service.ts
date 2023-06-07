import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  apiURl = 'http://localhost:3000/books';

  get() {
    return this.http.get<Book[]>(this.apiURl);
  }

  create(newBook: Book) {
    return this.http.post<Book>(this.apiURl, newBook);
  }

  update(updatedBook: Book) {
    return this.http.put<Book>(
      `http://localhost:3000/books/${updatedBook.id}`,
      updatedBook
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
