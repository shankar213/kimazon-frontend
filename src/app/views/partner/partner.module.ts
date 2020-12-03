import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartnerComponent} from './partner.component';
import {PartnerRoutingModule} from './partner-routing.module';
import {FormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AddProductComponent} from './add-product/add-product.component';
import {AllProductsComponent} from './all-products/all-products.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
    declarations: [PartnerComponent, AddProductComponent, AllProductsComponent, OrdersComponent],
    exports: [
    ],
    imports: [
        CommonModule,
        PartnerRoutingModule,
        FormsModule,
        MDBBootstrapModule,
        NgxDropzoneModule
    ]
})
export class PartnerModule {
}
