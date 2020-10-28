import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {Router} from "@angular/router";
import {UtilsService} from "../../../shared/services/utils.service";
import {Product} from "../../../shared/models/Product";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filter: any = {};


  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.filter.price = {};
  }

  getAllProducts() {
    this._productService.getProducts(this.filter).subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Later', 'Error!', 'error');
        return;
      }
      this.products = data.products;
    });
  }

  onCategorySelected(event: any) {
    this.filter.category = event;
    this.getAllProducts();
  }
}
