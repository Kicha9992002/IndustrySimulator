import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlaceholderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule { }
