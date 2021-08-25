import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from './manufacturing.actions';
import * as MoneyActions from '../../header/money/store/money.actions';
import { ManufacturingService } from '../manufactoring.service';

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

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.addEmployee),
            withLatestFrom(this.store.select('manufacturing')),
            map(response => {
                const factory = response[1].factories[response[0].factoryIndex];
                const maxEmployees = this.manufacturingService.getFactoryMaxEmployees(factory.size);
                if (maxEmployees > factory.employees.length) {
                    this.toastr.success('Mitarbeiter eingestellt');
                    return ManufacturingActions.addEmployeeSuccess();
                } else {
                    this.toastr.error('Maximale Anzahl Mitarbeiter bereits erreicht');
                    return ManufacturingActions.addEmployeeFail();
                }
            })
        )
    );

    removeEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ManufacturingActions.removeEmployee),
            withLatestFrom(this.store.select('manufacturing')),
            map(response => {
                const factory = response[1].factories[response[0].factoryIndex];
                if (factory.employees.length > 0) {
                    this.toastr.success('Mitarbeiter entlassen');
                    return ManufacturingActions.removeEmployeeSuccess();
                } else {
                    this.toastr.error('Keine Mitarbeiter zum Entlassen vorhanden');
                    return ManufacturingActions.removeEmployeeFail();
                }
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
                ManufacturingActions.addFactorySuccess,
                ManufacturingActions.addFactorySizeSuccess,
                ManufacturingActions.deleteFactorySuccess,
                ManufacturingActions.addEmployeeSuccess,
                ManufacturingActions.removeEmployeeSuccess
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
                private toastr: ToastrService,
                private manufacturingService: ManufacturingService) {}
}