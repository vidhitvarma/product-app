import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private url = 'https://dummyjson.com/products';

	constructor(private httpClient: HttpClient) {}

	getProducts(limit = 10, skip = 0): Observable<any> {
		return this.httpClient.get<any>(`${this.url}?limit=${limit}&skip=${skip}`);
	}
}
