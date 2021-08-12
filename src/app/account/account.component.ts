import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  changeEmailForm: FormGroup;
  changeEmailIsLoading = false;
  changeEmail$: Subscription;

  constructor(private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.changeEmailForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required, Validators.email])
    });
  }

  changeEmail() {
    if (!this.changeEmailForm.valid) {
      return;
    }

    this.changeEmailIsLoading = true;
    this.changeEmail$ = this.authService.changeEmail(this.changeEmailForm.get('email').value)
      .subscribe(
        () => {
          this.toastr.success('E-Mail changed successfully');
          this.changeEmailIsLoading = false;
        },
        errorMessage => {
          this.toastr.error(errorMessage, 'E-Mail change error');
          this.changeEmailIsLoading = false;
        }
      )
  }

  ngOnDestroy() {
    this.changeEmail$?.unsubscribe();
  }

}
