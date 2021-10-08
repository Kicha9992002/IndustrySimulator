import { createAction, props } from '@ngrx/store';

import { Product } from 'src/app/shared/product.model';

export const setProducts = createAction('[Stock] Set Products', props<{
    products: Product[]
}>());
export const incomeProduct = createAction('[Stock] Income Products', props<{
    product: Product
}>());
export const fetchProducts = createAction('[Stock] Fetch Products');