import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(module => module.AuthModule)},
  {path: 'public', loadChildren: () => import('./views/public/public.module').then(module => module.PublicModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
