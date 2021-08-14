import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManufacturingComponent } from './manufacturing.component';
import { SharedModule } from '../shared/shared.module';
import { ManufacturingListComponent } from './manufacturing-list/manufacturing-list.component';
import { ManufacturingListItemComponent } from './manufacturing-list/manufacturing-list-item/manufacturing-list-item.component';
import { ManufacturingDetailsComponent } from './manufacturing-details/manufacturing-details.component';

const routes: Routes = [
  {path: '', component: ManufacturingComponent},
  {path: ':id', component: ManufacturingDetailsComponent}
];

@NgModule({
  declarations: [
    ManufacturingComponent,
    ManufacturingListComponent,
    ManufacturingListItemComponent,
    ManufacturingDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
