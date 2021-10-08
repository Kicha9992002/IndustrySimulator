import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/shared/employee.model';
import { Retailer } from 'src/app/shared/retailer.model';

export const setRetailers = createAction('[Retail] Set Retailers', props<{
    retailers: Retailer[]
}>());
export const fetchRetailers = createAction('[Retail] Fetch Retailers');

export const addRetailer = createAction('[Retail] Add Retailer', props<{
    retailer: Retailer
}>());
export const addRetailerSuccess = createAction('[Retail] Add Retailer Success');
export const addRetailerFail = createAction('[Retail] Add Retailer Fail');

export const addRetailerSize = createAction('[Retail] Add Retailer Size', props<{
    size: number,
    index: number,
    cost: number
}>());
export const addRetailerSizeSuccess = createAction('[Retail] Add Retailer Size Success');
export const addRetailerSizeFail = createAction('[Retail] Add Retailer Size Fail');

export const addEmployee = createAction('[Retail] Add Employee', props<{
    employee: Employee,
    retailerIndex: number
}>());
export const addEmployeeSuccess = createAction('[Retail] Add Employee Success');
export const addEmployeeFail = createAction('[Retail] Add Employee Fail');

export const removeEmployee = createAction('[Retail] Remove Employee', props<{
    employeeIndex: number,
    retailerIndex: number
}>());
export const removeEmployeeSuccess = createAction('[Retail] Remove Employee Success');
export const removeEmployeeFail = createAction('[Retail] Remove Employee Fail');

export const deleteRetailer = createAction('[Retail]', props<{
    index: number
}>());
export const deleteRetailerSuccess = createAction('[Retail] Delete retailer Success');