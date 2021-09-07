import { ActionReducerMap } from '@ngrx/store';

import * as fromManufacturing from '../manufacturing/store/manufacturing.reducer';
import * as fromMoney from '../header/money/store/money.reducer';
import * as fromStock from '../stock/store/stock.reducer';

export interface AppState {
    manufacturing: fromManufacturing.State;
    money: fromMoney.State;
    stock: fromStock.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    manufacturing: fromManufacturing.manufacturingReducer,
    money: fromMoney.moneyReducer,
    stock: fromStock.stockReducer
};
