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
  productsInCart: Product[] = [];
  cartItems: {};
  subTotal = 0;
  total = 0;
  tax = 0;
  orderDetails: any = {};

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {
    const cartString = this._utilService.getLocalStorageItem(APP_CONSTANTS.FIELD_CART_ITEMS);
    this.cartItems = cartString ? JSON.parse(cartString) : [];
    this.getProductsInCart();

  }

  removeFromCart(id: number) {
    delete this.cartItems[id];
    this._utilService.setLocalStorage(APP_CONSTANTS.FIELD_CART_ITEMS, JSON.stringify(this.cartItems));
    this.getProductsInCart();
  }

  getProductsInCart() {
    const itemIds = Object.keys(this.cartItems);
    this._productService.getProductsFromCart({ids: itemIds}).subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.products) {
        this._utilService.toast('Cannot Load Products! Try Again Letter', 'Error!', 'error');
        return;
      }
      if (Array.isArray(data.products)) {
        this.productsInCart = [];
        data.products.forEach((item) => {
          item.cart_qty = 1;
          this.productsInCart.push(item);
        });
      }
      this.calculateTotalForOrder();
    });
  }

  redirectToCheckout() {
    const user = this._sessionService.getUser();
    this.orderDetails.items = [];
    this.orderDetails.customer_id = user.id;
    this.productsInCart.forEach((product) => {
      this.orderDetails.items.push({
        product_id: product.id,
        qty: product.qty,
        unit_price: product.price
      });
    });
    this._sessionService.addSessionItem(APP_CONSTANTS.FIELD_ORDER_DETAILS, JSON.stringify(this.orderDetails));
    this._router.navigate(['/public/checkout']);
  }

  calculateTotalForOrder() {
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.productsInCart.forEach((product) => {
      this.subTotal += product.price * (product.cart_qty || 0);
    });
    this.tax = Number((this.subTotal * 0.13).toFixed(2));
    this.total = Number((this.subTotal + this.tax).toFixed(2));
  }

}
