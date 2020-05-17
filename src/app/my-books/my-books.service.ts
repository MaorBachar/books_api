import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.dataModel';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private myBooks: BookModel[] = [];
  public myDicBooks = {};

  removeBookSubject = new Subject<BookModel>();
  myBooksDictionarySubject = new Subject<Object>();
  constructor() { }

  public getBooksList() {
    return this.myBooks;
  }

  removeFromBookList(book: BookModel) {
    const found: BookModel = this.myBooks.splice(this.myBooks.findIndex(element => element.id == book.id), 1)[0];
    delete this.myDicBooks[book.id];
    this.myBooksDictionarySubject.next(this.myDicBooks);
    this.removeBookSubject.next(book);
    return found.id == book.id;
  }

  bookValidation(book) {
    const found = this.myBooks.findIndex(obj => obj.id == book.data.id);
    if (found === -1) {
      return true;
    }
    return  false;
  }

  addBooks(books){
    this.myBooks.push(...books);
    books.forEach(element => {
      this.myDicBooks[element.id] = element.id;
    });
    this.myBooksDictionarySubject.next(this.myDicBooks);
  }
  
}
