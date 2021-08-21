import { Action, createReducer, on } from "@ngrx/store";

import { Factory, Location, PropertyType } from "src/app/shared/factory.model";
import * as ManufacturingActions from './manufacturing.actions';

export interface State {
    factories: Factory[]
}

const initialState: State = {
    factories: [
        new Factory(0, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, Location.Germany, PropertyType.owner),
        new Factory(1, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 50, Location.France, PropertyType.tenant),
        new Factory(2, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 90, Location.Germany, PropertyType.tenant)
    ]
};

const _manufacturingReducer = createReducer(
    initialState,

    on(
        ManufacturingActions.setFactories,
        (state, action) => ({
            ...state,
            factories: [...action.factories]
        })
    ),

    on(
        ManufacturingActions.addFactory,
        (state, action) => ({
            ...state,
            factories: state.factories.concat({...action.factory})
        })
    ),

    on(
        ManufacturingActions.updateFactory,
        (state, action) => ({
            ...state,
            factories: state.factories.map(
                (factory, index) => index === action.index ? {...action.factory} : factory
            )
        })
    ),

    on(
        ManufacturingActions.deleteFactory,
        (state, action) => ({
            ...state,
            factories: state.factories.filter(
                (_, index) => index !== action.index
            )
        })
    )
);

export function manufacturingReducer(state: State, action: Action) {
    return _manufacturingReducer(state, action);
}