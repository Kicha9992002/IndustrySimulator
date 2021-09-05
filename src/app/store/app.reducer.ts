import { ActionReducerMap } from '@ngrx/store';

import * as fromManufacturing from '../manufacturing/store/manufacturing.reducer';
import * as fromMoney from '../header/money/store/money.reducer';

export interface AppState {
    manufacturing: fromManufacturing.State;
    money: fromMoney.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    manufacturing: fromManufacturing.manufacturingReducer,
    money: fromMoney.moneyReducer
};
