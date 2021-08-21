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

export const updateFactory = createAction(
    '[Manufacturing] Update Factory',
    props<{
        factory: Factory,
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