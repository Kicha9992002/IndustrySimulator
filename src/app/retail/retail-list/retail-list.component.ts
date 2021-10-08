import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Retailer } from 'src/app/shared/retailer.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-retail-list',
  templateUrl: './retail-list.component.html'
})
export class RetailListComponent implements OnInit, OnDestroy {
  retailers: Retailer[];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('retail')
    .pipe(
      map(manufacturingState => manufacturingState.retailers)
    ).subscribe(retailers => {
      this.retailers = retailers;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
