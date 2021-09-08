import { Action, createReducer, on } from '@ngrx/store';

import { appConfig } from 'src/app/app.config';
import * as MoneyActions from './money.actions';

export interface State {
    money: number;
    lastIncome: number;
}

const initialState: State = {
    money: appConfig.startMoney,
    lastIncome: 0
};

const _moneyReducer = createReducer(
    initialState,

    on(MoneyActions.setMoney, (state, action) => ({
        ...state,
        money: 0 + action.money
    })),

    on(MoneyActions.incomeMoney, (state, action) => ({
        ...state,
        money: state.money + action.money,
        lastIncome: action.money
    })),

    on(MoneyActions.payAddFactorySuccess, (state, action) => ({
        ...state,
        money: state.money - action.cost
    })),

    on(MoneyActions.payAddFactorySizeSuccess, (state, action) => ({
        ...state,
        money: state.money - action.cost
    })),

    on(MoneyActions.receiveDeleteFactorySuccess, (state, action) => ({
        ...state,
        money: state.money + action.gain
    }))
);

export function moneyReducer(state: State, action: Action) {
    return _moneyReducer(state, action);
}
