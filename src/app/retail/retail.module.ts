import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { retailComponent as RetailComponent } from './retail.component';
import { SharedModule } from '../shared/shared.module';
import { RetailListComponent } from './retail-list/retail-list.component';
import { RetailListItemComponent } from './retail-list/retail-list-item/retail-list-item.component';
import { RetailNewComponent } from './retail-new/retail-new.component';
import { RetailDetailsComponent } from './retail-details/retail-details.component';

const routes: Routes = [
  {path: '', component: RetailComponent},
  {path: ':id', component: RetailDetailsComponent}
];

@NgModule({
  declarations: [
    RetailComponent,
    RetailListComponent,
    RetailListItemComponent,
    RetailDetailsComponent,
    RetailNewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class RetailModule { }
