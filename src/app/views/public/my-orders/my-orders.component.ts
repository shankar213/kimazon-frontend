import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {Router} from "@angular/router";
import {UtilsService} from "../../../shared/services/utils.service";
import {OrderService} from "../../../shared/services/order.service";
import {Order} from "../../../shared/models/Order";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  orderSubTotal;
  orderTotal;

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService,
              private _orderService: OrderService) { }

  elements: any = [];
  headElements = ['name', 'price', 'qty', 'subtotal'];

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this._orderService.getOrdersPlacedByUser().subscribe((response: any) => {
      const data = response.data;
      if (data.users[0].items.length > 0) {
        this.orders = data.users[0].items;
        this.orderSubTotal = data.users[0].subtotal;
        this.orderTotal = data.users[0].total;
        console.log('Orders: ', this.orders);
      } else {
        this._utilService.toast('Cannot Load Orders! Try Again Letter', 'Error!', 'error');
        return;
      }
    });
  }

}
