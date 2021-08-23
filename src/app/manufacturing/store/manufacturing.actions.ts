import { createAction, props } from '@ngrx/store';

import { Factory } from 'src/app/shared/factory.model';

export const setFactories = createAction(
    '[Manufacturing] Set Factories',
    props<{
        factories: Factory[]
    }>()
);

export const addFactory = createAction(
    '[Manufacturing] Add Factory',
    props<{
        factory: Factory
    }>()
);

export const addFactorySizeStart = createAction(
    '[Manufacturing] Add Factory Size Start',
    props<{
        size: number,
        index: number,
        cost: number
    }>()
);

export const addFactorySizeSuccess = createAction(
    '[Manufacturing] Add Factory Size Success',
    props<{
        size: number,
        index: number
    }>()
);

export const deleteFactory = createAction(
    '[Manufacturing] Delete Factory',
    props<{
        index: number
    }>()
);

export const fetchFactories = createAction(
    '[Manufacturing] Fetch Factories'
);

export const storeFactories = createAction(
    '[Manufacturing] Store Factories'
)