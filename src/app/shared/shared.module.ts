import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule,
    ToastrModule,
    BsDropdownModule,
    ModalModule
  ]
})
export class SharedModule { }
