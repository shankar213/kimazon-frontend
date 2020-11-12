import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {Product} from '../../../shared/models/Product';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  products: Product[] = [];
  cartItems: {};
  subTotal = 0;
  total = 0;
  tax;

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    const cartString = this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_CART_ITEMS);
    this.cartItems = cartString ? JSON.parse(cartString) : [];
    console.log('Cart items', this.cartItems);
    this.getProductsInCart();

  }

  removeFromCart(id: number) {
    delete this.cartItems[id]
    this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_CART_ITEMS, JSON.stringify(this.cartItems));
    this.getProductsInCart();
  }

  getProductsInCart() {
    const itemIds = Object.keys(this.cartItems)
    this._productService.getProductsFromCart({ids: itemIds}).subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Letter', 'Error!', 'error');
        return;
      }
      if (Array.isArray(data.products)) {
        data.products.forEach((item) => {
          item.cart_qty = 1;
          this.products.push(item)
        })

      }
      this.calculateTotalForOrder()
    });
  }

  redirectToCheckout() {
    this._router.navigate(['/public/checkout']);
  }

  calculateTotalForOrder() {
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.products.forEach((product) => {
      this.subTotal += product.price * (product.cart_qty || 0);
    })

    this.tax = this.subTotal * 0.13;
    this.total = this.subTotal + this.tax;
  }

}
