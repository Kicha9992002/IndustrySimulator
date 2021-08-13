import { Injectable } from '@angular/core';
import { Factory } from '../shared/factory.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  private factories: Factory[] = [];

  constructor() {
    this.factories.push(
      new Factory(1, 'Apple orchard', '', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 100, 2, 500),
      new Factory(1, 'Apple orchard', '', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 100, 2, 500),
      new Factory(1, 'Apple orchard', '', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 100, 2, 500)
    );
  }

  getFactories() {
    return this.factories.slice();
  }
}
