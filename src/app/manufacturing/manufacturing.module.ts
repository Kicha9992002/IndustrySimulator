import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManufacturingComponent } from './manufacturing.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: ManufacturingComponent }
];

@NgModule({
  declarations: [
    ManufacturingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
