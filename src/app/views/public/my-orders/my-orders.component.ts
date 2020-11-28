import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {OrderService} from '../../../shared/services/order.service';
import {Order} from '../../../shared/models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService,
              private _orderService: OrderService) {
  }

  elements: any = [];
  headElements = ['date', 'subtotal', 'taxes', 'total'];

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this._orderService.getOrdersPlacedByUser().subscribe((response: any) => {
      const data = response.data;
      if (data.orders && data.orders.length > 0) {
        this.orders = data.orders;
        this.orders.forEach((order) => {
          order.created_on = new Date(Date.parse(order.created_on)).toLocaleDateString('en-US');
          order.show = false;
        });
      } else {
        this._utilService.toast('Cannot Load Orders! Try Again Letter', 'Error!', 'error');
        return;
      }
    });
  }

  hideShorOrderDetails(el: Order) {
    el.show = !el.show;
  }
}
