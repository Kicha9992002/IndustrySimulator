import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  exports: [
    PlaceholderDirective,
    LoadingSpinnerComponent,
    CommonModule,
    ToastrModule
  ]
})
export class SharedModule { }
