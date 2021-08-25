import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";

import { Factory, Location, PropertyType } from "src/app/shared/factory.model";
import * as ManufacturingActions from './manufacturing.actions';

export interface State {
    factories: Factory[],
    editIndex: number,
    editSize: number,
    newFactory: Factory
}

const initialState: State = {
    factories: [
        new Factory(0, 'Apple orchard', 'https://cdn.pixabay.com/photo/2019/02/24/13/05/apple-icon-4017545_1280.png', 10, Location.Germany, PropertyType.owner)
    ],
    editIndex: -1,
    editSize: 0,
    newFactory: null
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
            newFactory: action.factory
        })
    ),

    on(
        ManufacturingActions.addFactorySuccess,
        (state, action) => ({
            ...state,
            newFactory: null,
            factories: state.factories.concat({...state.newFactory})
        })
    ),

    on(
        ManufacturingActions.addFactoryFail,
        (state, action) => ({
            ...state,
            newFactory: null
        })
    ),

    on(
        ManufacturingActions.addFactorySize,
        (state, action) => ({
            ...state,
            editIndex: action.index,
            editSize: action.size
        })
    ),

    on(
        ManufacturingActions.addFactorySizeSuccess,
        (state, action) => ({
            ...state,
            editIndex: -1,
            editSize: 0,
            factories: state.factories.map(
                (factory, index) => index == state.editIndex ? {...factory, size: factory.size + state.editSize} : factory
            )
        })
    ),

    on(
        ManufacturingActions.addFactorySizeFail,
        (state, action) => ({
            ...state,
            editIndex: -1,
            editSize: 0
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