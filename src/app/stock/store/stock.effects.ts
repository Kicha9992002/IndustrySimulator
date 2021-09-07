import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, withLatestFrom } from "rxjs/operators";

import * as fromApp from '../../store/app.reducer';
import * as AppActions from '../../store/app.actions';
import * as StockActions from './stock.actions';
import { Product } from "src/app/shared/product.model";
import { ManufacturingService } from "src/app/manufacturing/manufactoring.service";

@Injectable()
export class StockEffects {
    $incomeProducts = createEffect(() =>
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

                return products.map(product => {
                    return StockActions.incomeProduct({productId: product.id, amount: product.amount})
                });
            })
        )
    );

    constructor(private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private manufacturingService: ManufacturingService) {}
}