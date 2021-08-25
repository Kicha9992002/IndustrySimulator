import { Injectable } from '@angular/core';

import { appConfig } from '../app.config';

import { Factory, Location, PropertyType } from '../shared/factory.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  constructor() { }

  getFactoryPrice(factory: Factory) {
    return appConfig.factoryPrice;
  }

  getFactoryMaxEmployees(size: number) {
    let maxEmployees = 0;
    for (let i = 0; i < appConfig.maxEmployees.length; i++) {
      if (size >= appConfig.maxEmployees[i].size) {
        maxEmployees = appConfig.maxEmployees[i].max;
      }
    }
    return maxEmployees;
  }

  getFactoryOutput(factory: Factory) {
    return factory.employees.length * factory.size * this.getLocationModifier(factory.location).outputModifier;
  }

  getFactoryCost(factory: Factory) {
    const employeeCost = factory.employees.length * this.getLocationModifier(factory.location).employeeCostModifier;
    const propertyModifier = factory.propertyType === PropertyType.tenant ? 'rentCostModifier' : 'ownerCostModifier';

    return employeeCost + factory.size * this.getLocationModifier(factory.location)[propertyModifier];
  }

  private getLocationModifier(location: Location) {
    return appConfig.locationModifiers.find(locationModifier => locationModifier.location == location);
  }
}
