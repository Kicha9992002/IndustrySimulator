import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/shared/product.model';

import * as StockActions from './stock.actions';
export interface State {
    products: Product[];
}

const initialState: State = {
    products: Object.keys(Product).map<Product>((propertyName) => Product[propertyName])
};

const _stockReducer = createReducer(
    initialState,

    on(StockActions.incomeProduct, (state, action) => ({
        ...state,
        products: state.products.map(product =>
            product.id === action.productId ? {...product, amount: product.amount + action.amount} : product
        )
    }))
);

export function stockReducer(state: State, action: Action) {
    return _stockReducer(state, action);
}