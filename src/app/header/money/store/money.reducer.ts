import { Action, createReducer, on } from "@ngrx/store";

import * as MoneyActions from './money.actions';

export interface State {
    money: number
}

const initialState: State = {
    money: 20000
};

const _moneyReducer = createReducer(
    initialState,

    on(
        MoneyActions.setMoney,
        (state, action) => ({
            ...state,
            money: 0 + action.money
        })
    ),

    on(
        MoneyActions.addMoney,
        (state, action) => ({
            ...state,
            money: state.money + action.money
        })
    ),

    on(
        MoneyActions.subtractMoney,
        (state, action) => ({
            ...state,
            money: state.money - action.money
        })
    )
);

export function moneyReducer(state: State, action: Action) {
    return _moneyReducer(state, action);
}