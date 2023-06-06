import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { BooksHomeComponent } from './books-home/books-home.component';

const routes: Routes = [
  {
    path: '',
    component: BooksHomeComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
