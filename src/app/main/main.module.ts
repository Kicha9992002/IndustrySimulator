import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: MainComponent }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
