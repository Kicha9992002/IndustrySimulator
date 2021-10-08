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
            map(([action, state]) => {
                const products =  state.manufacturing.factories
                    .reduce<Product[]>((products, factory) => {
                        return products.concat(factory.factoryType.products.map(product => {
                            return {...product, amount: this.manufacturingService.getFactoryOutput(factory)};
                        }));
                    }, [])
                    .concat(state.retail.retailers
                        .reduce<Product[]>((products, retailer) => {
                            return products.concat(retailer.retailerType.products.map(product => {
                                return {...product, amount: -this.retailService.getRetailerInput(retailer)};
                            }));
                        }, []))
                    .reduce<Product[]>((result, product) => {
                        return result[product.id] = {...product, amount: (result[product.id]?.amount || 0) + product.amount}, result; // group by product.id
                    }, [])
                    .filter(product => product.amount != 0 && state.stock.products.find(pr => pr.id == product.id).amount + product.amount >= 0);
                return StockActions.incomeProducts({products});
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
            ofType(StockActions.incomeProducts),
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