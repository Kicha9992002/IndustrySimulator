import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchComponent } from './purch.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: PurchComponent }
];

@NgModule({
  declarations: [
    PurchComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PurchModule { }
