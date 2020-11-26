import { Component, OnInit } from '@angular/core';
import {PRODUCT_CONDITION} from '../../../shared/constants/enum-constants';
import {Product} from "../../../shared/models/Product";
import {ProductService} from "../../../shared/services/product.service";
import {SessionService} from "../../../shared/services/session.service";
import {Router} from "@angular/router";
import {UtilsService} from "../../../shared/services/utils.service";


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
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

  goToEdit(id: number) {
    this._router.navigate(['/public/add-used-products/' + id ], { queryParams: { edit: true }});
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe((response: any) => {
      const data = response.data;
      if (!data) {
        this._utilService.toast('Unable to Delete the product', 'Error!', 'error');
        return;
      }else {
        this._utilService.toast('Product Deleted Successfully', 'Deleted!', 'success');
      }
      this.getAllProducts();
    });
  }

}
