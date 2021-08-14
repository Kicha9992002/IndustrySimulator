import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Factory, Location, PropertyType } from '../shared/factory.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  private factories: Factory[] = [];
  factoriesChanged = new BehaviorSubject<Factory[]>([]);
  private locationModifiers: {location: Location, outputModifier: number, employeeCostModifier: number, rentCostModifier: number, ownerCostModifier: number}[] = [
    {location: Location.Germany, outputModifier: 1.2, employeeCostModifier: 1.3, rentCostModifier: 13, ownerCostModifier: 6},
    {location: Location.France, outputModifier: 1, employeeCostModifier: 1.1, rentCostModifier: 11, ownerCostModifier: 5}
  ];
  private maxEmployees: {size: number, max: number}[] = [
    {size: 10, max: 1},
    {size: 30, max: 2},
    {size: 60, max: 3},
    {size: 100, max: 4},
  ];

  constructor() { }

  setFactories(factories: Factory[]) {
    this.factories = factories;
    this.factoriesChanged.next(this.factories.slice());
  }

  getFactoryMaxEmployees(size: number) {
    let maxEmployees = 0;
    for (let i = 0; i < this.maxEmployees.length; i++) {
      if (size >= this.maxEmployees[i].size) {
        maxEmployees = this.maxEmployees[i].max;
      }
    }
    return maxEmployees;
  }

  getFactoryOutput(factory: Factory) {
    return factory.employees.length * factory.size * this.getLocationModifier(factory.location).outputModifier;
  }

  getFactoryCost(factory: Factory) {
    let employeeCost = factory.employees.length * this.getLocationModifier(factory.location).employeeCostModifier;

    let propertyCost;
    if (factory.propertyType == PropertyType.tenant) {
      propertyCost = factory.size * this.getLocationModifier(factory.location).rentCostModifier;
    } else if (factory.propertyType == PropertyType.owner) {
      propertyCost = factory.size * this.getLocationModifier(factory.location).ownerCostModifier;
    }

    return employeeCost * propertyCost;
  }

  private getLocationModifier(location: Location) {
    return this.locationModifiers.find(locationModifier => locationModifier.location == location);
  }
}
