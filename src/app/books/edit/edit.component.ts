import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.actions';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Book } from '../store/book';
import { invokeUpdateBookAPI } from '../store/books.actions';
import { selectBookByID } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<Appstate>
  ) {}

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  };

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookByID(id)));
      })
    );

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateBookAPI({ updatedBook: { ...this.bookForm } })
    );
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
