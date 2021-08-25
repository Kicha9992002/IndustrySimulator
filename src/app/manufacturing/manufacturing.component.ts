import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { appConfig } from '../app.config';

import { Factory, FactoryType, Location, PropertyType } from '../shared/factory.model';
import * as fromApp from '../store/app.reducer';
import * as ManufacturingActions from './store/manufacturing.actions';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html'
})
export class ManufacturingComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  onAddFactory() {
    this.store.select('manufacturing').pipe(
      take(1),
      map(manufacturingState => manufacturingState.factories),
      tap(factories => {
        let maxId = factories[factories.length - 1].id;
        this.store.dispatch(ManufacturingActions.addFactory({factory: new Factory(
          maxId + 1,
          FactoryType.appleOrchard,
          appConfig.manufacturing.areaAddSize,
          Location.Germany,
          PropertyType.owner
        )}));
      })
    ).subscribe();

  }

}
