import { Action, createReducer, on } from '@ngrx/store';

import { Factory, FactoryType } from 'src/app/shared/factory.model';
import * as ManufacturingActions from './manufacturing.actions';
import { Employee } from 'src/app/shared/employee.model';
import { Location } from 'src/app/shared/location.model';
import { PropertyType } from 'src/app/shared/property-type.model';

export interface State {
    factories: Factory[];
    newFactory: Factory;
    removeFactoryIndex: number;
    editIndex: number;
    editSize: number;
    newEmployee: Employee | null;
    employeeIndex: number;
}

const initialState: State = {
    factories: [
        new Factory(0, FactoryType.appleOrchard, 10, Location.Germany, PropertyType.owner)
    ],
    newFactory: null,
    removeFactoryIndex: -1,
    editIndex: -1,
    editSize: 0,
    newEmployee: null,
    employeeIndex: -1
};

const _manufacturingReducer = createReducer(
    initialState,

    on(ManufacturingActions.setFactories, (state, action) => ({
        ...state,
        factories: [...action.factories]
    })),

    on(ManufacturingActions.addFactory, (state, action) => ({
        ...state,
        newFactory: action.factory
    })),

    on(ManufacturingActions.addFactorySuccess, (state, action) => ({
        ...state,
        newFactory: null,
        factories: state.factories.concat({...state.newFactory})
    })),

    on(ManufacturingActions.addFactoryFail, (state, action) => ({
        ...state,
        newFactory: null
    })),

    on(ManufacturingActions.addFactorySize, (state, action) => ({
        ...state,
        editIndex: action.index,
        editSize: action.size
    })),

    on(ManufacturingActions.addFactorySizeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        editSize: 0,
        factories: state.factories.map((factory, index) =>
            index == state.editIndex ? {...factory, size: factory.size + state.editSize} : factory
        )
    })),

    on(ManufacturingActions.addFactorySizeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        editSize: 0
    })),

    on(ManufacturingActions.addEmployee, (state, action) => ({
        ...state,
        editIndex: action.factoryIndex,
        newEmployee: action.employee
    })),

    on(ManufacturingActions.addEmployeeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        newEmployee: null,
        factories: state.factories.map((factory, index) => {
            if (index === state.editIndex) {
                return {...factory, employees: factory.employees.concat({...state.newEmployee})};
            } else {
                return factory;
            }
        })
    })),

    on(ManufacturingActions.addEmployeeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        newEmployee: null
    })),

    on(ManufacturingActions.removeEmployee, (state, action) => ({
        ...state,
        editIndex: action.factoryIndex,
        employeeIndex: action.employeeIndex
    })),

    on(ManufacturingActions.removeEmployeeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        employeeIndex: -1,
        factories: state.factories.map((factory, index) => {
            if (index === state.editIndex) {
                return {...factory, employees: factory.employees.filter((_, i) => {
                    return i !== state.employeeIndex;
                })};
            } else {
                return factory;
            }
        })
    })),

    on(ManufacturingActions.removeEmployeeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        employeeIndex: -1
    })),

    on(ManufacturingActions.deleteFactory, (state, action) => ({
        ...state,
        removeFactoryIndex: action.index
    })),

    on(ManufacturingActions.deleteFactorySuccess, (state, action) => ({
        ...state,
        factories: state.factories.filter(factory =>
            factory.id !== state.removeFactoryIndex
        ),
        removeFactoryIndex: -1
    }))
);

export function manufacturingReducer(state: State, action: Action) {
    return _manufacturingReducer(state, action);
}
