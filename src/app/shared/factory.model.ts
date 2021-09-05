import { Employee } from './employee.model';

export enum Location {
    Germany = 'Germany',
    France = 'France'
}

export enum PropertyType {
    tenant = 'tenant',
    owner = 'owner'
}

export class FactoryType {
    static readonly appleOrchard = new FactoryType(
        'apple Orchard',
        'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png'
    );

    private constructor(
        public readonly name: string,
        public readonly imgPath: string
    ) {}
}

export class Factory {
    constructor(
        public id: number,
        public factoryType: FactoryType,
        public size: number,
        public location: Location,
        public propertyType: PropertyType,
        public employees: Employee[] = [
            new Employee()
        ]
    ) {}
}
