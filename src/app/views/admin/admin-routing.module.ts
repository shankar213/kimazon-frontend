import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {ManageProductsComponent} from './manage-products/manage-products.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', component: ViewUsersComponent, pathMatch: 'full'},
      {path: 'products', component: ManageProductsComponent, pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
