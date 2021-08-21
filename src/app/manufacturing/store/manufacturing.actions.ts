import { createAction, props } from '@ngrx/store';

import { Factory } from 'src/app/shared/factory.model';

export const setFactories = createAction(
    '[Manufaturing] Set Factories',
    props<{
        factories: Factory[]
    }>()
);

export const addFactory = createAction(
    '[Manufaturing] Add Factory',
    props<{
        factory: Factory
    }>()
);

export const updateFactory = createAction(
    '[Manufaturing] Update Factory',
    props<{
        factory: Factory,
        index: number
    }>()
);

export const deleteFactory = createAction(
    '[Manufaturing] Delete Factory',
    props<{
        index: number
    }>()
);

export const fetchFactories = createAction(
    '[Manufaturing] Fetch Factories'
);

export const storeFactories = createAction(
    '[Manufaturing] Store Factories'
)