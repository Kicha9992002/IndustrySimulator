import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from './manufacturing.actions';
import * as MoneyActions from '../../header/money/store/money.actions';

@Injectable()
export class ManufacturingEffects {

    addFactorySize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddFactorySize),
            map(props => {
                return ManufacturingActions.addFactorySizeSuccess({size: props.size, index: props.index});
            })
        )
    );

    fetchFactories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.fetchFactories),
            map(() => {
                return JSON.parse(localStorage.getItem('factories'));
            }),
            filter(factories => factories),
            map(factories => {
                return ManufacturingActions.setFactories({factories});
            })
        )
    );

    storeFactories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.storeFactories),
            withLatestFrom(this.store.select('manufacturing')),
            tap(([action, state]) => {
                localStorage.setItem('factories', JSON.stringify(state.factories));
            })
        )
        , {dispatch: false}
    );

    autoSaveFactories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ManufacturingActions.addFactory,
                ManufacturingActions.addFactorySizeSuccess,
                ManufacturingActions.deleteFactory,
            ),
            debounceTime(500),
            map(() => ManufacturingActions.storeFactories())
        )
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>) {}
}