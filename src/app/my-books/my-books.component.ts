import { Component, OnInit } from '@angular/core';
import { BookModel } from '../models/book.dataModel';
import { Subscription } from 'rxjs';
import { MyBooksService } from './my-books.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  removeBookSubscription: Subscription;
  myBooks: BookModel[] = [];
  constructor(private messageService: MessageService, private myBooksService: MyBooksService) { }

  ngOnInit() {
    this.myBooks = this.myBooksService.getBooksList();
    this.removeBookSubscription = this.myBooksService.removeBookSubject.subscribe((book: BookModel) => {
      this.myBooks.splice(this.myBooks.findIndex(element => element.id == book.id), 0);
    })
  }


  removeFromMyBooksList(book: BookModel) {
    if (this.myBooksService.removeFromBookList(book)) {
      this.messageService.add({ severity: 'success', summary: 'Removed successfully!', detail: `${book.title} removed from your books list!` });
    }
  }

  ngOnDestroy(): void {
    this.removeBookSubscription.unsubscribe();
  }
}
