import { Location } from "./shared/location.model";

interface IAppConfig {
    manufacturing: {
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
        factoryPrice: number;
        areaAddSize: number;
        areaAddSizePrice: number;
    };
    retail: {
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
        retailerPrice: number;
        areaAddSize: number;
        areaAddSizePrice: number;
    };
    startMoney: number;
    incomeInterval: number;
    autoSaveDebounceTime: number;
}

export const appConfig: IAppConfig = {
    manufacturing: {
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
        areaAddSize: 10,
        areaAddSizePrice: 5000
    },
    retail: {
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
        retailerPrice: 5000,
        areaAddSize: 10,
        areaAddSizePrice: 5000
    },
    startMoney: 20000,
    incomeInterval: 5000,
    autoSaveDebounceTime: 500,
};
