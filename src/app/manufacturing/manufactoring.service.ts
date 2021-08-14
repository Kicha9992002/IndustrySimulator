import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Factory } from '../shared/factory.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  private factories: Factory[] = [];
  factoriesChanged = new BehaviorSubject<Factory[]>([]);

  constructor() { }

  setFactories(factories: Factory[]) {
    this.factories = factories;
    this.factoriesChanged.next(this.factories.slice());
  }
}
