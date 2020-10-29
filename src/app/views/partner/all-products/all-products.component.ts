import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {Product} from '../../../shared/models/Product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  elements: any = [];
  headElements = ['id', 'name', 'brand', 'category', 'price', 'qty'];

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this._productService.getProductsForSeller().subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Letter', 'Error!', 'error');
        return;
      }
      this.products = data.products;
    });
  }

}