import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicComponent} from './public.component';
import {ProductsComponent} from './products/products.component';
import {MyCartComponent} from "./my-cart/my-cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {MyProductsComponent} from "./my-products/my-products.component";
import {AddUsedProductsComponent} from "./add-used-products/add-used-products.component";
import {AddProductComponent} from "../partner/add-product/add-product.component";
import {MyOrdersComponent} from "./my-orders/my-orders.component";


const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'products', component: ProductsComponent, pathMatch: 'full'},
      {path: 'my-cart', component: MyCartComponent, pathMatch: 'full'},
      {path: 'checkout', component: CheckoutComponent, pathMatch: 'full'},
      {path: 'my-products', component: MyProductsComponent, pathMatch: 'full'},
      {path: 'add-used-products', component: AddUsedProductsComponent, pathMatch: 'full'},
      {path: 'add-used-products/:product_id', component: AddUsedProductsComponent, pathMatch: 'full'},
      {path: 'my-orders', component: MyOrdersComponent, pathMatch: 'full'},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
