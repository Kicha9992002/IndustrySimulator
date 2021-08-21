import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { interval } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as MoneyActions from './money.actions';

@Injectable()
export class MoneyEffects {
    incomeMoney$ = createEffect(() =>
        interval(5000).pipe(
            map(() => {
                return MoneyActions.addMoney({money: 1});
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

    storeMoney$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.storeMoney),
            withLatestFrom(this.store.select('money')),
            tap(([action, state]) => {
                localStorage.setItem('money', JSON.stringify(state.money));
            })
        ),
        {dispatch: false}
    );

    autosaveMoney$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                MoneyActions.addMoney,
                MoneyActions.subtractMoney
            ),
            debounceTime(500),
            map(() => MoneyActions.storeMoney())
        )
    );

    constructor(private actions$: Actions,
        private store: Store<fromApp.AppState>) {}
}