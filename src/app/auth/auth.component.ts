import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isLoading = false;
  isLoginMode= true;
  auth$: Observable<AuthResponseData>;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      this.auth$ = this.authService.login(this.authForm.get('email').value, this.authForm.get('password').value);
    } else {
      this.auth$ = this.authService.signUp(this.authForm.get('email').value, this.authForm.get('password').value);
    }

    this.auth$.subscribe(
      responseData => {
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        this.error = errorMessage;
        AlertComponent.showErrorAlert(errorMessage, this.componentFactoryResolver, this.alertHost);
        this.isLoading = false;
      }
    );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy() {
  }

}
