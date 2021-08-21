import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Factory } from 'src/app/shared/factory.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-manufacturing-list',
  templateUrl: './manufacturing-list.component.html'
})
export class ManufacturingListComponent implements OnInit, OnDestroy {
  factories: Factory[];
  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('manufacturing')
    .pipe(
      map(manufacturingState => manufacturingState.factories),
    ).subscribe(factories => {
      this.factories = factories;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
