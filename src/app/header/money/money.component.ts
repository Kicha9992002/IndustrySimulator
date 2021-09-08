import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html'
})
export class MoneyComponent implements OnInit, OnDestroy {
  money = 0;
  lastIncome = 0;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('money')
    .subscribe(moneyState => {
      this.money = moneyState.money;
      this.lastIncome = moneyState.lastIncome;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
