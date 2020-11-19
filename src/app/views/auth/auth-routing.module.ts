import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SecondFactorComponent} from './second-factor/second-factor.component';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'second-factor', component: SecondFactorComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'password-change', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
