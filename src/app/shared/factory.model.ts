import { Employee } from "./employee.model";

export class Factory {
    constructor(
        public id: number,
        public name: string,
        public imgPath: string,
        public size: number,
        public location: string,
        public employees: Employee[] = [
            new Employee()
        ]
    ) {}
}