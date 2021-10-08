import { Action, createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/shared/employee.model';
import { Location } from 'src/app/shared/location.model';
import { PropertyType } from 'src/app/shared/property-type.model';

import { Retailer, RetailerType } from 'src/app/shared/retailer.model';
import * as RetailActions from './retail.actions';

export interface State {
    retailers: Retailer[];
    newRetailer: Retailer;
    removeRetailerIndex: number;
    editIndex: Number;
    editSize: number;
    newEmployee: Employee | null;
    employeeIndex: number;
}

const initialState: State = {
    retailers: [
        new Retailer(0, RetailerType.marketStand, 10, Location.Germany, PropertyType.owner)
    ],
    newRetailer: null,
    removeRetailerIndex: -1,
    editIndex: -1,
    editSize: 0,
    newEmployee: null,
    employeeIndex: -1
};

const _retailReducer = createReducer(
    initialState,

    on(RetailActions.setRetailers, (state, action) => ({
        ...state,
        retailers: [...action.retailers]
    })),

    on(RetailActions.addRetailer, (state, action) => ({
        ...state,
        newRetailer: action.retailer
    })),

    on(RetailActions.addRetailerSuccess, (state, action) => ({
        ...state,
        newRetailer: null,
        retailers: state.retailers.concat({...state.newRetailer})
    })),

    on(RetailActions.addRetailerFail, (state, action) => ({
        ...state,
        newRetailer: null
    })),

    on(RetailActions.addRetailerSize, (state, action) => ({
        ...state,
        editIndex: action.index,
        editSize: action.size
    })),

    on(RetailActions.addRetailerSizeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        editSize: 0,
        retailers: state.retailers.map((retailer, index) =>
            index == state.editIndex ? {...retailer, size: retailer.size + state.editSize} : retailer
        )
    })),

    on(RetailActions.addRetailerSizeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        editSize: 0
    })),

    on(RetailActions.addEmployee, (state, action) => ({
        ...state,
        editIndex: action.retailerIndex,
        newEmployee: action.employee
    })),

    on(RetailActions.addEmployeeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        newEmployee: null,
        retailers: state.retailers.map((retailer, index) => {
            if (index === state.editIndex) {
                return {...retailer, employees: retailer.employees.concat({...state.newEmployee})};
            } else {
                return retailer;
            }
        })
    })),

    on(RetailActions.addEmployeeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        newEmployee: null
    })),

    on(RetailActions.removeEmployee, (state, action) => ({
        ...state,
        editIndex: action.retailerIndex,
        employeeIndex: action.employeeIndex
    })),

    on(RetailActions.removeEmployeeSuccess, (state, action) => ({
        ...state,
        editIndex: -1,
        employeeIndex: -1,
        retailers: state.retailers.map((retailer, index) => {
            if (index === state.editIndex) {
                return {...retailer, employees: retailer.employees.filter((_, i) => {
                    return i !== state.employeeIndex;
                })};
            } else {
                return retailer;
            }
        })
    })),

    on(RetailActions.removeEmployeeFail, (state, action) => ({
        ...state,
        editIndex: -1,
        employeeIndex: -1
    })),

    on(RetailActions.deleteRetailer, (state, action) => ({
        ...state,
        removeRetailerIndex: action.index
    })),

    on(RetailActions.deleteRetailerSuccess, (state, action) => ({
        ...state,
        retailers: state.retailers.filter(retailer =>
            retailer.id !== state.removeRetailerIndex    
        ),
        removeRetailerIndex: -1
    }))

);

export function retailReducer(state: State, action: Action) {
    return _retailReducer(state, action);
}