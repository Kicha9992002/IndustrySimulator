import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as ManufacturingActions from './manufacturing/store/manufacturing.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, 
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.store.dispatch(ManufacturingActions.fetchFactories());
  }
}
