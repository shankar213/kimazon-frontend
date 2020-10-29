import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import {MDBRootModule} from 'angular-bootstrap-md';
import { SecondFactorComponent } from './second-factor/second-factor.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, SecondFactorComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MDBRootModule
  ]
})
export class AuthModule {
}
