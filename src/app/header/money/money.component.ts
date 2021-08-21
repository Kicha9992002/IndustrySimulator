import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html'
})
export class MoneyComponent implements OnInit, OnDestroy {
  money: number = 0;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('money')
    .pipe(
      map(moneyState => moneyState.money)
    ).subscribe(money => {
      this.money = money;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
