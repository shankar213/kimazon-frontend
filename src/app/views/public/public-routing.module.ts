import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicComponent} from './public.component';
import {ProductsComponent} from './products/products.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {path: 'products', component: ProductsComponent, pathMatch: 'full'}]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
