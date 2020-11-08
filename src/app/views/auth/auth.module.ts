import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import {MDBRootModule} from 'angular-bootstrap-md';
import { SecondFactorComponent } from './second-factor/second-factor.component';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, SecondFactorComponent, ForgotPasswordComponent,
    ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MDBRootModule
  ]
})
export class AuthModule {
}
