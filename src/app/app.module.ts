import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './books/books.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './books/search/search.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';

import {MessageService} from 'primeng/api';

import { BooksService } from './books/books.service';
import { HttpClientModule } from '@angular/common/http';
import { MyBooksService } from './my-books/my-books.service';
import { BookDetailComponent } from './my-books/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    MyBooksComponent,
    HeaderComponent,
    SearchComponent,
    BookDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    TableModule,
    ToastModule,
    CheckboxModule
  ],
  providers: [BooksService,MyBooksService ,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
