import {Component, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/Order';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  pendingOrders: Order[] = [];
  previousOrders: Order[] = [];

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService,
              private _orderService: OrderService) {
  }

  elements: any = [];
  headElements = ['date', 'name', 'address'];

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this._orderService.getOrdersForSeller().subscribe((response: any) => {
      const data = response.data;
      if (data.pending_orders && data.previous_orders) {
        // alert(data.pending_orders.length + ' ' + data.previous_orders.length);
        if (data.pending_orders.length > 0) {
          this.pendingOrders = data.pending_orders;
          this.pendingOrders.forEach((order) => {
            order.created_on = new Date(Date.parse(order.created_on)).toLocaleDateString('en-US');
            order.show = false;
          });
        } else {
          this.pendingOrders = [];
        }
        if (data.previous_orders.length > 0) {
          this.previousOrders = data.previous_orders;
          this.previousOrders.forEach((order) => {
            order.created_on = new Date(Date.parse(order.created_on)).toLocaleDateString('en-US');
            order.show = false;
          });
          // this.pendingOrders = this.previousOrders
        } else {
          this.previousOrders = [];
        }

      } else {
        this._utilService.toast('Cannot Load Orders! Try Again Letter', 'Error!', 'error');
        return;
      }
    });
  }

  hideShowOrderDetails(el: Order) {
    el.show = !el.show;
  }


  markAsFulfilled(el: Order) {
    const itemsIds = el.items.map(i => i.product_id);
    this._orderService.fulfillOrder(el.order_id, {item_ids: itemsIds}).subscribe((response: any) => {
      const data = response.data;
      if (data.updated) {
        this._utilService.toast('Order marked as Fulfilled', 'There it is...!', 'success');
        this.getOrders();

      } else {
        this._utilService.toast('Can\'t update order status', 'Opps! Something went wrong', 'error');
        return;
      }
    });
  }
}
