import {environment} from '../../../environments/environment';
import {UtilsService} from './utils.service';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_CONSTANTS} from '../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _utilsService: UtilsService,
              private _sessionService: SessionService,
              private _httpClient: HttpClient) {
  }

  placeOrder(orderDetails) {
    const url = `${this._utilsService.linkGeneration(environment.orders, environment.orders.add_order)}`;
    return this._utilsService.callPostAPI(url, orderDetails);
  }

  getOrdersPlacedByUser(): any {
    let url = `${this._utilsService.linkGeneration(environment.orders, environment.orders.get_orders_placed_by_user)}`;
    url = url.replace(':user_id', this._utilsService.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID));
    return this._utilsService.callGetAPI(url);
  }

  getOrdersForSeller() {
    let url = `${this._utilsService.linkGeneration(environment.orders, environment.orders.get_orders_for_seller)}`;
    url = url.replace(':seller_id', this._utilsService.getLocalStorageItem(APP_CONSTANTS.FIELD_USER_ID));
    return this._utilsService.callGetAPI(url);
  }

  fulfillOrder(orderId, body) {
    let url = `${this._utilsService.linkGeneration(environment.orders, environment.orders.fulfil_order)}`;
    url = url.replace(':order_id', orderId);
    return this._utilsService.callPostAPI(url, body);
  }
}
