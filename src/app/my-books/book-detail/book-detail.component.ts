import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from 'src/app/models/book.dataModel';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  @Input() book: BookModel;
  @Output() removeBookEvent = new EventEmitter<BookModel>();

  constructor() { }

  ngOnInit() {
  }


  removeBook() {
    this.removeBookEvent.emit(this.book);
  }
}
