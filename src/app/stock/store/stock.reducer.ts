import { Action, createReducer, on } from '@ngrx/store';
import { map } from 'rxjs/operators';
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

    on(StockActions.setProducts, (state, action) => ({
        ...state,
        products: [...action.products]
    })),

    on(StockActions.incomeProduct, (state, action) => ({
        ...state,
        products: state.products.map(product => {
            if (product.id === action.product.id) {
                return {
                    ...product,
                    amount: product.amount + action.product.amount,
                    lastIncome: action.product.amount
                };
            } else {
                return product;
            }
        })
    }))
);

export function stockReducer(state: State, action: Action) {
    return _stockReducer(state, action);
}