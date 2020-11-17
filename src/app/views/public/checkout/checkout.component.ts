import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  billingSameAsShipping = true;
  orderDetails: any;
  shipping_details: any = {};
  billing_details: any = {};

  constructor(private _productService: ProductService,
              private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService) {
  }

  ngOnInit(): void {

    const orderDetail = this._sessionService.getSessionItem(APP_CONSTANTS.FIELD_ORDER_DETAILS);
    if (!orderDetail) {
      this._router.navigate(['/public/my-cart']);
    }
    this.orderDetails = JSON.parse(orderDetail);
  }


  placeOrder() {
    this.shipping_details.name = this.shipping_details.first_name + ' ' + this.shipping_details.last_name;
    if (this.billingSameAsShipping) {
      this.billing_details = this.shipping_details;
    } else {
      this.billing_details.name = this.billing_details.first_name + ' ' + this.billing_details.last_name;
    }
    this.orderDetails.billing_details = this.billing_details;
    this.orderDetails.shipping_details = this.shipping_details;
    this._productService.placeOrder({order_details: this.orderDetails}).subscribe(response => {
      const data = response.data;
      if (!data) {
        this._utilService.toast('Failed to Place order! Try again later', 'Error!', 'error');
        return;
      } else {
        this._utilService.toast('Order has been placed successfully', 'Congratulations!', 'success');
      }
    });

  }
}

