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
