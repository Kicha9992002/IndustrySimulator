import { Employee } from "./employee.model";

export enum Location {
    Germany,
    France
}

export enum PropertyType {
    tenant,
    owner
}

export class Factory {
    constructor(
        public id: number,
        public name: string,
        public imgPath: string,
        public size: number,
        public location: Location,
        public propertyType: PropertyType,
        public employees: Employee[] = [
            new Employee()
        ]
    ) {}
}