import { HttpParams } from '@angular/common/http';

export class Pagination {
	first: number = 0;
    itemsPerPage: number = 10;
    totalRecords: number = 0;


	constructor(first: number = 0, itemsPerPage: number = 10, totalRecords = 0) {
		this.first = first;
		this.itemsPerPage = itemsPerPage;
		this.totalRecords = totalRecords;
	}
}