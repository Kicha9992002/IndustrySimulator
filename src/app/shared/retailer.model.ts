import { Employee } from "./employee.model";
import { Location } from "./location.model";
import { Product } from "./product.model";
import { PropertyType } from "./property-type.model";

export class RetailerType {
    static readonly marketStand = new RetailerType(
        'market stand',
        'assets/retailers/market_stand.svg',
        [
            Product.apples,
            Product.cherries
        ]
    );

    private constructor(
        public readonly name: string,
        public readonly imgPath: string,
        public readonly products: Product[]
    ) {}
}

export class Retailer {
    constructor(
        public id: number,
        public retailerType: RetailerType,
        public size: number,
        public location: Location,
        public propertyType: PropertyType,
        public employees: Employee[] = [
            new Employee()
        ]
    ) {}
}