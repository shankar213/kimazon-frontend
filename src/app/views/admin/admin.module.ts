import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MDBRootModule} from "angular-bootstrap-md";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminComponent } from './admin.component';
import { ViewUsersComponent } from './view-users/view-users.component';

@NgModule({
  declarations: [AdminComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MDBRootModule
  ]
})
export class AdminModule {

}
