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
    static readonly cherryOrchard = new FactoryType(
        'cherry Orchard',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKrDYTIlqKvZFAE3m_pjRrBsMRpnGi46kAQ&usqp=CAU'
    );
    static readonly forest = new FactoryType(
        'forest',
        'https://cdn.pixabay.com/photo/2019/03/13/04/03/tree-4052262_1280.png'
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
