import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ManufacturingService } from '../manufacturing/manufactoring.service';
import { Factory, Location, PropertyType } from './factory.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private manufacturingService: ManufacturingService
  ) { }

  fetchFactories() {
    let factories = [
      new Factory(0, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, Location.Germany, PropertyType.owner),
      new Factory(1, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 50, Location.France, PropertyType.tenant),
      new Factory(2, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 90, Location.Germany, PropertyType.tenant)
    ];

    return of(factories)
      .pipe(
        tap(factories => {
          this.manufacturingService.setFactories(factories);
        })
      )
      .subscribe();
  }
}
