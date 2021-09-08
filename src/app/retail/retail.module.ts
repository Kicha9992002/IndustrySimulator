import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { retailComponent as RetailComponent } from './retail.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: RetailComponent }
];

@NgModule({
  declarations: [
    RetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RetailModule { }
