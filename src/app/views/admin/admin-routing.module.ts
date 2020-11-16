import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {ViewUsersComponent} from "./view-users/view-users.component";

const routes: Routes = [
  {path: '', component: AdminComponent,
  children: [
    {path: '', redirectTo: 'view-users', pathMatch: 'full'},
    {path: 'view-users', component: ViewUsersComponent, pathMatch: 'full'}
  ]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
