import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {Product} from '../../../shared/models/Product';
import {ProductService} from '../../../shared/services/product.service';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filter: any = {};
  product_count = 0;
  cartItems: {};
  selectedProduct = null;

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.filter.price = {};
    this.filter.category = '';
    this.filter.condition = '';
    const cartString = this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_CART_ITEMS);
    this.cartItems = cartString ? JSON.parse(cartString) : {};
  }

  getAllProducts() {
    this._productService.getProducts(this.filter).subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Later', 'Error!', 'error');
        return;
      }
      this.products = data.products;
      this.product_count = data.product_count;
    });
  }

  onCategorySelected(event: any) {
    this.filter.category = event;
    this.getAllProducts();
  }

  addToCart(itemId: number) {
    if (this._sessionService.getUser()) {
      this.cartItems[itemId] = 1;
      this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_CART_ITEMS, JSON.stringify(this.cartItems));
    } else {
      this._router.navigate(['/auth/login']);
    }

  }

  removeFromCart(id: number) {
    delete this.cartItems[id];
    this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_CART_ITEMS, JSON.stringify(this.cartItems));
  }
}
