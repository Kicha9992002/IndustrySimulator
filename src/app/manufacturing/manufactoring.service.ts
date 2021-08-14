import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Factory } from '../shared/factory.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  private factories: Factory[] = [];
  factoriesChanged = new Subject<Factory[]>();

  constructor() { }

  setFactories(factories: Factory[]) {
    this.factories = factories;
    this.factoriesChanged.next(this.factories.slice());
  }
}
