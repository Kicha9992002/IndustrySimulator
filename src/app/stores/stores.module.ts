import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './stores.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: StoresComponent }
];

@NgModule({
  declarations: [
    StoresComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StoresModule { }
