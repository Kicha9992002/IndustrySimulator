import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { debounceTime, map, switchMap, tap, withLatestFrom } from "rxjs/operators";

import * as fromApp from '../../store/app.reducer';
import * as AppActions from '../../store/app.actions';
import * as StockActions from './stock.actions';
import { Product } from "src/app/shared/product.model";
import { ManufacturingService } from "src/app/manufacturing/manufactoring.service";
import { appConfig } from "src/app/app.config";
import { RetailService } from "src/app/retail/retail.service";

@Injectable()
export class StockEffects {
    incomeProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.gameTick),
            withLatestFrom(this.store),
            switchMap(([action, state]) => {
                let products: Product[] = [];
                for (const factory of state.manufacturing.factories) {
                    for (const product of factory.factoryType.products) {
                        const index = products.findIndex((pr) => pr.id === product.id);
                        const addAmount = this.manufacturingService.getFactoryOutput(factory);
                        if (index === -1) {
                            products.push({...product, amount: addAmount});
                        } else {
                            products[index] = {...product, amount: products[index].amount + addAmount};
                        }
                    }
                }

                for (const retailer of state.retail.retailers) {
                    for (const product of retailer.retailerType.products) {
                        const index = products.findIndex((pr) => pr.id === product.id);
                        const subtractAmount = this.retailService.getRetailerInput(retailer);
                        if (index === -1) {
                            products.push({...product, amount: -subtractAmount});
                        } else {
                            products[index] = {...product, amount: products[index].amount - subtractAmount};
                        }
                    }
                }

                products = products.map(product => {
                    const productStockAmount = state.stock.products.find(pr => pr.id == product.id).amount;
                    return productStockAmount + product.amount >= 0  ? product : {...product, amount: 0};
                });

                return products.map(product => {
                    return StockActions.incomeProduct({productId: product.id, amount: product.amount})
                });
            })
        )
    );

    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StockActions.fetchProducts),
            map(() => JSON.parse(localStorage.getItem('products'))),
            map(products => {
                return StockActions.setProducts({products});
            })
        )
    );

    autosaveProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StockActions.incomeProduct),
            debounceTime(appConfig.autoSaveDebounceTime),
            withLatestFrom(this.store.select('stock')),
            tap(([action, state]) => {
                localStorage.setItem('products', JSON.stringify(state.products));
            })
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private manufacturingService: ManufacturingService,
        private retailService: RetailService) {}
}