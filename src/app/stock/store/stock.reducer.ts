import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/shared/product.model';
export interface State {
    products: Product[];
}

const initialState: State = {
    products: Object.keys(Product).map<Product>((propertyName) => Product[propertyName])
};

const _stockReducer = createReducer(
    initialState
);

export function stockReducer(state: State, action: Action) {
    return _stockReducer(state, action);
}