import { ActionReducerMap } from "@ngrx/store";

import * as fromManufacturing from '../manufacturing/store/manufacturing.reducer';

export interface AppState {
    manufacturing: fromManufacturing.State
}

export const appReducer: ActionReducerMap<AppState> = {
    manufacturing: fromManufacturing.manufacturingReducer
}