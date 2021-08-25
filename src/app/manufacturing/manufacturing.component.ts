import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

import { Factory, Location, PropertyType } from '../shared/factory.model';
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
          'Apple orchard',
          'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png',
          10,
          Location.Germany,
          PropertyType.owner
        ), cost: 5000}));
      })
    ).subscribe();

  }

}
