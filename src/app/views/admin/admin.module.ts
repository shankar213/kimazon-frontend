import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MDBRootModule} from 'angular-bootstrap-md';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {ManageProductsComponent} from './manage-products/manage-products.component';

@NgModule({
  declarations: [AdminComponent, ViewUsersComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MDBRootModule
  ]
})
export class AdminModule {

}
