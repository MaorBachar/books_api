import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchElement', { static: true }) searchEl: ElementRef;
  @Output() searchInputEvent = new EventEmitter<string>();
  @Input() searchInputText: string = '';

  private searchSubscription: Subscription;
  private searchSubject = new Subject<string>();


  constructor() { }

  ngOnInit(): void {
    this.searchEl.nativeElement.value = this.searchInputText;
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(550),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.searchInputEvent.emit(text);
    })
  }

  search($event: KeyboardEvent) {
    const text: string = ($event.target as HTMLInputElement).value;
    this.searchSubject.next(text);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
