import { ActionReducerMap } from '@ngrx/store';

import * as fromManufacturing from '../manufacturing/store/manufacturing.reducer';
import * as fromMoney from '../header/money/store/money.reducer';
import * as fromStock from '../stock/store/stock.reducer';
import * as fromRetail from '../retail/store/retail.reducer';

export interface AppState {
    manufacturing: fromManufacturing.State;
    money: fromMoney.State;
    stock: fromStock.State;
    retail: fromRetail.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    manufacturing: fromManufacturing.manufacturingReducer,
    money: fromMoney.moneyReducer,
    stock: fromStock.stockReducer,
    retail: fromRetail.retailReducer
};
