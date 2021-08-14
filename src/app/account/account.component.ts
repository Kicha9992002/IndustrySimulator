import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit, OnDestroy {
  user: User;
  changeEmailForm: FormGroup;
  changeEmailIsLoading = false;
  changeEmail$: Subscription;
  changePasswordForm: FormGroup;
  changePasswordIsLoading = false;
  changePassword$: Subscription;

  constructor(private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.changeEmailForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email])
    });
    this.changePasswordForm = new FormGroup({
      'password': new FormControl("", [Validators.required, Validators.minLength(6)])
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
      );
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      return;
    }

    this.changePasswordIsLoading = true;
    this.changePassword$ = this.authService.changePassword(this.changePasswordForm.get('password').value)
      .subscribe(
        () => {
          this.toastr.success('Password changed successfully');
          this.changePasswordIsLoading = false;
        },
        errorMessage => {
          this.toastr.error(errorMessage, 'Password change error');
          this.changePasswordIsLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this.changeEmail$?.unsubscribe();
    this.changePassword$?.unsubscribe();
  }

}
