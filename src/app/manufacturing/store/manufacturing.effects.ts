import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from './manufacturing.actions';
import * as MoneyActions from '../../header/money/store/money.actions';

@Injectable()
export class ManufacturingEffects {
    payAddFactorySuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(MoneyActions.payAddFactorySuccess),
            map(() => {
                this.toastr.success('Fabrik hinzugefügt');
                return ManufacturingActions.addFactorySuccess();
            })
        )
    );

    payAddFactoryFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddFactoryFail),
            map(props => {
                this.toastr.error(props.error);
                return ManufacturingActions.addFactoryFail();
            })
        )
    );

    payAddFactorySizeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddFactorySizeSuccess),
            map(() => {
                this.toastr.success('Fabrikgröße erweitert');
                return ManufacturingActions.addFactorySizeSuccess();
            })
        )
    );

    payAddFactorySizeFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddFactorySizeFail),
            map(props => {
                this.toastr.error(props.error);
                return ManufacturingActions.addFactorySizeFail();
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

    autoSaveFactories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ManufacturingActions.addFactory,
                ManufacturingActions.addFactorySizeSuccess,
                ManufacturingActions.deleteFactory
            ),
            debounceTime(500),
            withLatestFrom(this.store.select('manufacturing')),
            tap(([action, state]) => {
                localStorage.setItem('factories', JSON.stringify(state.factories));
            })
        ), 
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>,
                private toastr: ToastrService) {}
}