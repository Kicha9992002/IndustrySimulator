import { createAction, props } from '@ngrx/store';

import { Factory } from 'src/app/shared/factory.model';

export const setFactories = createAction('[Manufacturing] Set Factories', props<{
    factories: Factory[]
}>());
export const addFactory = createAction('[Manufacturing] Add Factory',
props<{
    factory: Factory,
    cost: number
}>());
export const addFactorySuccess = createAction('[Manufacturing] Add Factory Success');
export const addFactoryFail = createAction('[Manufacturing] Add Factory Fail');
export const addFactorySize = createAction('[Manufacturing] Add Factory Size', props<{
    size: number,
    index: number,
    cost: number
}>());
export const addFactorySizeSuccess = createAction('[Manufacturing] Add Factory Size Success');
export const addFactorySizeFail = createAction('[Manufacturing] Add Factory Size Fail',);
export const deleteFactory = createAction('[Manufacturing] Delete Factory', props<{
    index: number
}>());
export const fetchFactories = createAction('[Manufacturing] Fetch Factories');