import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddComponent } from './add/add.component';
import { BooksHomeComponent } from './books-home/books-home.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksEffects } from './store/books.effects';
import { bookReducer } from './store/books.reducer';

@NgModule({
  declarations: [BooksHomeComponent, AddComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    StoreModule.forFeature('mybooks', bookReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
})
export class BooksModule {}
