import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { BooksService } from './books.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookModel } from '../models/book.dataModel';
import { Pagination } from '../models/pagination';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { MyBooksService } from '../my-books/my-books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public searchInputText: string;
  public booksDataSubscription: Subscription;
  public myBooksDataSubscription: Subscription;

  public books: BookModel[];

  data: BookModel[];
  dataDictionary: Object = {};
  cols: any[];
  loading: boolean;
  selectedRows: any[] = [];
  public pagination: Pagination = new Pagination();

  constructor(private booksService: BooksService, private myBooksService: MyBooksService, private messageService: MessageService, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.cols = [
      { field: 'img', header: 'Image', type: 'img' },
      { field: 'title', header: 'Book', type: 'text' },
      { field: 'authors', header: 'Authors', type: 'text' },
      { field: 'categories', header: 'Categories', type: 'text' },
      { field: 'publishedDate', header: 'Published Date', type: 'text' },
      { field: 'language', header: 'Language', type: 'text' },

    ];

    this.initialize();
  }

  initialize() {
    this.searchInputText = this.booksService.getSearchInputText();
    this.dataDictionary = this.myBooksService.myDicBooks;
    this.myBooksDataSubscription = this.myBooksService.myBooksDictionarySubject.subscribe((myBooksDic:Object)=>{
      this.dataDictionary = myBooksDic;
    })
    this.booksDataSubscription = this.booksService.booksObservable.subscribe((books: BookModel[]) => {
      this.data = books;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    })
    if (this.searchInputText && this.searchInputText.length > 0) {
      this.search(this.searchInputText);
    }

  }
  search(searchText) {
    if (searchText) {
      this.searchInputText = searchText;
      this.lazyLoad({ first: 0 });
    }
  }

  lazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    this.pagination.first = event.first;
    this.booksService.search(this.searchInputText, this.pagination);

  }

  addBooksToWishList() {
    this.myBooksService.addBooks(this.selectedRows);
    this.messageService.add({ severity: 'success', summary: 'Books added!', detail: `${this.selectedRows.length} Books added to your wish list!` });
    this.selectedRows = new Array<any>();
  }

  selectAllRows(checkValue) {
    if (checkValue) {
      this.selectedRows = this.data.filter(book => !this.dataDictionary[book.id]);
    } else {
      this.selectedRows = [];
    }
  }

  ngOnDestroy() {
    this.booksDataSubscription.unsubscribe();
    this.myBooksDataSubscription.unsubscribe();
  }




}
