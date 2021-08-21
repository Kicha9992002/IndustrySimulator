import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from './manufacturing.actions';

@Injectable()
export class ManufacturingEffects {
    fetchFactories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.fetchFactories),
            map(() => {
                let factories = JSON.parse(localStorage.getItem('factories'));
                if (factories) {
                    return ManufacturingActions.setFactories({factories});
                } else {
                    return {type: 'DUMMY'};
                }
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
                ManufacturingActions.updateFactory,
                ManufacturingActions.deleteFactory,
            ),
            debounceTime(500),
            map(() => ManufacturingActions.storeFactories())
        )
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>) {}
}