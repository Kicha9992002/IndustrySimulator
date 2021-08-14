import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ManufacturingService } from '../manufacturing/manufactoring.service';
import { Factory } from './factory.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private manufacturingService: ManufacturingService
  ) { }

  fetchFactories() {
    let factories = [
      new Factory(0, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, 'Germany'),
      new Factory(1, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, 'Germany'),
      new Factory(2, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, 'Germany')
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
