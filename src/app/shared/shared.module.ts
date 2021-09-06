import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    BsDropdownModule.forRoot()
  ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule,
    ToastrModule,
    BsDropdownModule
  ]
})
export class SharedModule { }
