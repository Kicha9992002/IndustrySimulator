import { Location } from './shared/factory.model';

interface IAppConfig {
    maxEmployees: {
        size: number;
        max: number;
    }[];
    locationModifiers: {
        location: Location;
        outputModifier: number;
        employeeCostModifier: number;
        rentCostModifier: number;
        ownerCostModifier: number;
    }[];
    startMoney: number;
    incomeInterval: number;
    autoSaveDebounceTime: number,
    areaAddSize: number;
};

export const appConfig: IAppConfig = {
    maxEmployees: [
        {size: 10, max: 1},
        {size: 30, max: 2},
        {size: 60, max: 3},
        {size: 100, max: 4}
    ],
    locationModifiers: [
        {location: Location.Germany, outputModifier: 1.2, employeeCostModifier: 1.3, rentCostModifier: 13, ownerCostModifier: 6},
        {location: Location.France, outputModifier: 1, employeeCostModifier: 1.1, rentCostModifier: 11, ownerCostModifier: 5}
    ],
    factoryPrice: 5000,
    startMoney: 20000,
    incomeInterval: 5000,
    autoSaveDebounceTime: 500,
    areaAddSize: 10
}