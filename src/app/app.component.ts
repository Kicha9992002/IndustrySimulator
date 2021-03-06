import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as ManufacturingActions from './manufacturing/store/manufacturing.actions';
import * as MoneyActions from './header/money/store/money.actions';
import * as StockActions from './stock/store/stock.actions';
import * as RetailActions from './retail/store/retail.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(ManufacturingActions.fetchFactories());
    this.store.dispatch(MoneyActions.fetchMoney());
    this.store.dispatch(StockActions.fetchProducts());
    this.store.dispatch(RetailActions.fetchRetailers());
  }
}
