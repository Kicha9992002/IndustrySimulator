import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/manufacturing', pathMatch: 'full' },
  {
    path: 'manufacturing',
    loadChildren: () => import('./manufacturing/manufacturing.module').then(module => module.MainModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(module => module.SalesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'purch',
    loadChildren: () => import('./purch/purch.module').then(module => module.PurchModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
