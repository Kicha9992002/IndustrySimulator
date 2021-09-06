import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
  message?: string;
  confirmed: EventEmitter<void>;

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.confirmed.emit();
    this.bsModalRef.hide();
  }
}
