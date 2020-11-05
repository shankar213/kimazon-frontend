import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import {PartnerModule} from "../partner/partner.module";


@NgModule({
  declarations: [PublicComponent, ProductsComponent],
    imports: [
        CommonModule,
        PublicRoutingModule,
        MDBBootstrapModule,
        FormsModule,
        PartnerModule,
    ]
})
export class PublicModule {
}
