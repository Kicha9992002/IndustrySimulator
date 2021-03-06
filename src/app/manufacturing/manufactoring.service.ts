import { Injectable } from '@angular/core';

import { appConfig } from '../app.config';

import { Factory } from '../shared/factory.model';
import { Location } from '../shared/location.model';
import { PropertyType } from '../shared/property-type.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  constructor() { }

  getFactoryPrice(factory: Factory) {
    if (factory.propertyType === PropertyType.owner) {
      return appConfig.manufacturing.factoryPrice;
    } else {
      return 0;
    }
  }

  getFactoryMaxEmployees(size: number) {
    let maxEmployees = 0;
    for (let i = 0; i < appConfig.manufacturing.maxEmployees.length; i++) {
      if (size >= appConfig.manufacturing.maxEmployees[i].size) {
        maxEmployees = appConfig.manufacturing.maxEmployees[i].max;
      }
    }
    return maxEmployees;
  }

  getFactoryOutput(factory: Factory) {
    return factory.employees.length * factory.size * this.getLocationModifier(factory.location).outputModifier;
  }

  getFactoryRunningCost(factory: Factory) {
    const employeeCost = factory.employees.length * this.getLocationModifier(factory.location).employeeCostModifier;
    const propertyModifier = factory.propertyType === PropertyType.tenant ? 'rentCostModifier' : 'ownerCostModifier';

    return employeeCost + factory.size * this.getLocationModifier(factory.location)[propertyModifier];
  }

  getFactoryAddSizeCost(factory: Factory, areaAddSize: number) {
    return appConfig.manufacturing.areaAddSizePrice;
  }

  private getLocationModifier(location: Location) {
    return appConfig.manufacturing.locationModifiers.find(locationModifier => locationModifier.location === location);
  }
}
