import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ['']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isLoading = false;
  isLoginMode= true;
  auth$: Subscription;

  constructor(private authService: AuthService, 
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      this.auth$ = this.authService
        .login(this.authForm.get('email').value, this.authForm.get('password').value)
        .subscribe(
          () => {
            this.toastr.success('Login successfull');
            this.isLoading = false;
            this.router.navigate(['/']);
          },
          errorMessage => {
            this.toastr.error(errorMessage, 'Login error');
            this.isLoading = false;
          }
        );
    } else {
      this.auth$ = this.authService
        .signUp(this.authForm.get('email').value, this.authForm.get('password').value)
        .subscribe(
          () => {
            this.toastr.success('Sign up successfull');
            this.isLoading = false;
            this.router.navigate(['/']);
          },
          errorMessage => {
            this.toastr.error(errorMessage, 'Login error');
            this.isLoading = false;
          }
        );
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

}
