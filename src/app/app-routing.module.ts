import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./feed/feed.module').then(module => module.FeedModule),
  //   canActivate: [AuthGuardService]
  // },
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
