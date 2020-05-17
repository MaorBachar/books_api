import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { MyBooksComponent } from './my-books/my-books.component';


const routes: Routes = [
  { path: '', component: BooksComponent},
  { path: 'my-books', component: MyBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
