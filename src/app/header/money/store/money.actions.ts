import { createAction, props } from '@ngrx/store';

export const setMoney = createAction(
    '[Money] Set Money',
    props<{
        money: number
    }>()
);

export const addMoney = createAction(
    '[Money] Add Money',
    props<{
        money: number
    }>()
);

export const subtractMoney = createAction(
    '[Money] Subtract Money',
    props<{
        money: number
    }>()
);

export const fetchMoney = createAction(
    '[Money] Fetch Money'
);

export const storeMoney = createAction(
    '[Money] Store Money'
);