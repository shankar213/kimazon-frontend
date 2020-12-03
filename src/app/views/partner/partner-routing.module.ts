import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PartnerComponent} from './partner.component';
import {AddProductComponent} from './add-product/add-product.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {OrdersComponent} from './orders/orders.component';


const routes: Routes = [
  {
    path: '', component: PartnerComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'products', component: AllProductsComponent, pathMatch: 'full'},
      {path: 'add-product', component: AddProductComponent, pathMatch: 'full'},
      {path: 'add-product/:product_id', component: AddProductComponent, pathMatch: 'full'},
      {path: 'orders', component: OrdersComponent, pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule {
}
