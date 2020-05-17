import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../models/pagination';
import { Subject } from 'rxjs/internal/Subject';
import { BookModel } from '../models/book.dataModel';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private searchInputText: string = '';
    private books: BookModel[];
    private pagination: Pagination = new Pagination();
    private baseUrl: string = "https://www.googleapis.com/books/v1/volumes?q=";
    booksObservable = new Subject();

    constructor(private httpClient: HttpClient) {
    }

    public search(text: string, pagination: Pagination = new Pagination) {
        this.searchInputText = text;
        this.httpClient.get(this.baseUrl + text + `&startIndex=${pagination.first}&maxResults=${pagination.itemsPerPage}`).subscribe((res: any) => {
            this.pagination.totalRecords = res.totalItems;
            this.pagination = pagination;
            if(!res.items){
                res.items = [];
            }
            this.setBooksData(res.items);


        })
    }

    private setBooksData(res) {
        this.books = res.map((book) => {
            return {
                id: book.id,
                selfLink: book.link,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                publishedDate: book.volumeInfo.publishedDate,
                pageCount: book.volumeInfo.pageCount,
                categories: book.volumeInfo.categories,
                img: this.imgQuery(book),
                language: book.volumeInfo.language,
            }
        });
        this.booksObservable.next(this.books);
    }

    private imgQuery(book) {
        if (book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
            return book.volumeInfo.imageLinks.smallThumbnail;
        }
        return 'https://image.makewebeasy.net/mwetemplate/0/template0117/DefaultData/t116_line.png'
    }
    public getSearchInputText() {
        return this.searchInputText;
    }

}