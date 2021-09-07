import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockComponent } from './stock.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: StockComponent}
];

@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StockModule { }
