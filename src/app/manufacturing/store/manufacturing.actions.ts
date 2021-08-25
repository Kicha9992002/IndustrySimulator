import { createAction, props } from '@ngrx/store';

import { Employee } from 'src/app/shared/employee.model';
import { Factory } from 'src/app/shared/factory.model';

export const setFactories = createAction('[Manufacturing] Set Factories', props<{
    factories: Factory[]
}>());
export const fetchFactories = createAction('[Manufacturing] Fetch Factories');

export const addFactory = createAction('[Manufacturing] Add Factory',
props<{
    factory: Factory
}>());
export const addFactorySuccess = createAction('[Manufacturing] Add Factory Success');
export const addFactoryFail = createAction('[Manufacturing] Add Factory Fail');

export const addFactorySize = createAction('[Manufacturing] Add Factory Size', props<{
    size: number,
    index: number,
    cost: number
}>());
export const addFactorySizeSuccess = createAction('[Manufacturing] Add Factory Size Success');
export const addFactorySizeFail = createAction('[Manufacturing] Add Factory Size Fail');

export const addEmployee = createAction('[Manufacturing] Add Employee', props<{
    employee: Employee,
    factoryIndex: number
}>());
export const addEmployeeSuccess = createAction('[Manufacturing] Add Employee Success');
export const addEmployeeFail = createAction('[Manufacturing] Add Employee Fail');

export const removeEmployee = createAction('[Manufacturing] Remove Employee', props<{
    employeeIndex: number,
    factoryIndex: number
}>());
export const removeEmployeeSuccess = createAction('[Manufacturing] Remove Employee Success');
export const removeEmployeeFail = createAction('[Manufacturing] Remove Employee Fail');

export const deleteFactory = createAction('[Manufacturing] Delete Factory', props<{
    index: number
}>());
export const deleteFactorySuccess = createAction('[Manufacturing] Delete Factory Success');
export const deleteFactoryFail = createAction('[Manufacturing] Delete Factory Fail');