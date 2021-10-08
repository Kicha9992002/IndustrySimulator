import { Injectable } from '@angular/core';

import { appConfig } from '../app.config';
import { Location } from '../shared/location.model';
import { PropertyType } from '../shared/property-type.model';
import { Retailer } from '../shared/retailer.model';

@Injectable({
  providedIn: 'root'
})
export class RetailService {

  constructor() { }

  getRetailerPrice(retailer: Retailer) {
    if (retailer.propertyType === PropertyType.owner) {
      return appConfig.retail.retailerPrice;
    } else {
      return 0;
    }
  }

  getRetailerMaxEmployees(size: number) {
    let maxEmployees = 0;
    for (let i = 0; i < appConfig.retail.maxEmployees.length; i++) {
      if (size >= appConfig.retail.maxEmployees[i].size) {
        maxEmployees = appConfig.retail.maxEmployees[i].max;
      }
    }
    return maxEmployees;
  }

  getRetailerInput(retailer: Retailer) {
    return retailer.employees.length * retailer.size * this.getLocationModifier(retailer.location).outputModifier;
  }

  getRetailerRunningIncome(retailer: Retailer) {
    const employeeCost = retailer.employees.length * this.getLocationModifier(retailer.location).employeeCostModifier;
    const propertyModifier = retailer.propertyType === PropertyType.tenant ? 'rentCostModifier' : 'ownerCostModifier';

    return employeeCost + retailer.size * this.getLocationModifier(retailer.location)[propertyModifier];
  }

  getRetailerAddSizeCost(retailer: Retailer, areaAddSize: number) {
    return appConfig.retail.areaAddSizePrice;
  }

  private getLocationModifier(location: Location) {
    return appConfig.retail.locationModifiers.find(locationModifier => locationModifier.location === location);
  }
}
