import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesComponent } from './sales.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: SalesComponent }
];

@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
