import { createAction, props } from '@ngrx/store';

export const incomeProduct = createAction('[Stock] Income Products', props<{
    productId: number,
    amount: number
}>());