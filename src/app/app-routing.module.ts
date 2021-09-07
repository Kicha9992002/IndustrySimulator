import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/stock', pathMatch: 'full' },
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.module').then(module => module.StockModule)
  },
  {
    path: 'manufacturing',
    loadChildren: () => import('./manufacturing/manufacturing.module').then(module => module.MainModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(module => module.SalesModule)
  },
  {
    path: 'purch',
    loadChildren: () => import('./purch/purch.module').then(module => module.PurchModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then(module => module.StoresModule)
  },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
