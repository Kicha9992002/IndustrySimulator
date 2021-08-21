import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
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
            tap(factories => {
                localStorage.setItem('factories', JSON.stringify(factories));
            })
        )
        , {dispatch: false}
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>) {}
}