import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {PublicComponent} from './public.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ProductsComponent} from './products/products.component';
import {FormsModule} from '@angular/forms';
import {PartnerModule} from '../partner/partner.module';
import {MyCartComponent} from './my-cart/my-cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddUsedProductsComponent } from './add-used-products/add-used-products.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [PublicComponent, ProductsComponent, MyCartComponent, CheckoutComponent, MyProductsComponent, AddUsedProductsComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MDBBootstrapModule,
    FormsModule,
    PartnerModule,
    NgxDropzoneModule
  ]
})
export class PublicModule {
}
