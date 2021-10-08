import { createAction, props } from '@ngrx/store';

export const setMoney = createAction('[Money] Set Money', props<{
    money: number
}>());
export const incomeMoney = createAction('[Money] Income Money', props<{
    money: number
}>());
export const fetchMoney = createAction('[Money] Fetch Money');

export const payAddFactorySuccess = createAction('[Money] Pay Add Factory Success', props<{
    cost: number
}>());
export const payAddFactoryFail = createAction('[Money] Pay Add Factory Fail', props<{
    error: string
}>());
export const payAddFactorySizeSuccess = createAction('[Money] Pay Add Factory Size', props<{
    cost: number
}>());
export const payAddFactorySizeFail = createAction('[Money] Pay Add Factory Size Fail', props<{
    error: string
}>());
export const receiveDeleteFactorySuccess = createAction('[Money] Receive Delete Factory Success', props<{
    gain: number
}>());

export const payAddRetailerSuccess = createAction('[Money] Pay Add Retailer Success', props<{
    cost: number
}>());
export const payAddRetailerFail = createAction('[Money] Pay Add Retailer Fail', props<{
    error: string
}>());
export const payAddRetailterSizeSuccess = createAction('[Money] Pay Add Retailer Size Success', props<{
    cost: number
}>());
export const payAddRetailerSizeFail = createAction('[Money] Pay Add Retailer Size Fail', props<{
    error: string
}>());
export const receiveDeleteRetailerSuccess = createAction('[Money] Receive Delete Retailer Success', props<{
    gain: number
}>());