import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-products-list',
	imports: [ CommonModule, FormsModule ],
	templateUrl: './products-list.component.html',
	styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
	listOfProducts: any[] = [];
	paginatedProducts: any[] = [];

	limit = 10;
	skip = 0;

	minimumPrice = 0;
	maximumPrice = 100000;
	osFilter: 'all' | 'ios' | 'others' = 'all';

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.loadListOfProducts();
	}

	loadListOfProducts() {
		this.productService.getProducts(this.limit, this.skip).subscribe((arg) => {
			this.listOfProducts = arg.products;
			console.log(this.listOfProducts);
			// this.applyFilter();
		});
	}

	applyFilter() {
		this.paginatedProducts = this.listOfProducts.filter((product) => {
			const priceMatch = product.price >= this.minimumPrice && product.price <= this.maximumPrice;
			const brand = product.brand.toLowerCase();

			const osMatch =
				this.osFilter === 'all' ||
				(this.osFilter === 'ios' && brand === 'Apple') ||
				(this.osFilter === 'others' && brand !== 'Apple');

			return priceMatch && osMatch;
		});
	}

	loadNext() {
		this.skip += this.limit;
		this.loadListOfProducts();
	}
}
