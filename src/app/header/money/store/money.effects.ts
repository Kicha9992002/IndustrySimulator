import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { interval } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as MoneyActions from './money.actions';
import * as ManufacturingActions from '../../../manufacturing/store/manufacturing.actions';
import { ManufacturingService } from 'src/app/manufacturing/manufactoring.service';
import { appConfig } from 'src/app/app.config';

@Injectable()
export class MoneyEffects {
    payAddFactory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.addFactory),
            withLatestFrom(this.store.select('money')),
            map(([action, state]) => {
                const price = this.manufacturingService.getFactoryPrice(action.factory);

                if (price < state.money) {
                    return MoneyActions.payAddFactorySuccess({cost: price});
                } else {
                    return MoneyActions.payAddFactoryFail({error: 'Not enough money'});
                }
            })
        )
    );

    payAddFactorySize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.addFactorySize),
            withLatestFrom(this.store.select('money')),
            map(([action, state]) => {
                if (action.cost < state.money) {
                    return MoneyActions.payAddFactorySizeSuccess({cost: action.cost});
                } else {
                    return MoneyActions.payAddFactorySizeFail({error: 'Not enough money'});
                }
            })
        )
    );

    incomeMoney$ = createEffect(() =>
        interval(appConfig.incomeInterval).pipe( 
            withLatestFrom(this.store.select('manufacturing')),
            map(([action, state]) => {
                let cost = 0;
                for (let i = 0; i < state.factories.length; i++) {
                    cost += this.manufacturingService.getFactoryCost(state.factories[i]);
                }
                return MoneyActions.subtractMoney({money: cost});
            })
        )
    );

    fetchMoney$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.fetchMoney),
            map(() => {
                return JSON.parse(localStorage.getItem('money'));
            }),
            filter(money => money),
            map(money => {
                return MoneyActions.setMoney({money});
            })
        )
    );

    autosaveMoney$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                MoneyActions.addMoney,
                MoneyActions.subtractMoney,
                MoneyActions.payAddFactorySuccess,
                MoneyActions.payAddFactorySizeSuccess
            ),
            debounceTime(appConfig.autoSaveDebounceTime),
            withLatestFrom(this.store.select('money')),
            tap(([action, state]) => {
                localStorage.setItem('money', JSON.stringify(state.money));
            })
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>,
                private manufacturingService: ManufacturingService) {}
}