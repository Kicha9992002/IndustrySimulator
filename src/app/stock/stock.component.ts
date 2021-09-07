import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../shared/product.model';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('stock')
    .pipe(
      map(stockState => stockState.products)
    ).subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
