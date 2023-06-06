import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksHomeComponent } from './books-home/books-home.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksEffects } from './store/books.effects';
import { bookReducer } from './store/books.reducer';

@NgModule({
  declarations: [BooksHomeComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('mybooks', bookReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
})
export class BooksModule {}
