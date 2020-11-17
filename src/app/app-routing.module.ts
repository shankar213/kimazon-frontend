import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(module => module.AuthModule)},
  {path: 'public', loadChildren: () => import('./views/public/public.module').then(module => module.PublicModule)},
  {path: 'partner', loadChildren: () => import('./views/partner/partner.module').then(module => module.PartnerModule)},
  {path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(module => module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
