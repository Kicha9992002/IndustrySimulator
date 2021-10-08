import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";

import { RetailService } from "../retail.service";
import * as fromApp from '../../store/app.reducer';
import * as RetailActions from './retail.actions';
import * as MoneyActions from '../../header/money/store/money.actions';
import { debounceTime, filter, map, tap, withLatestFrom } from "rxjs/operators";
import { PropertyType } from "src/app/shared/property-type.model";
import { appConfig } from "src/app/app.config";

@Injectable()
export class RetailEffects {
    payAddRetailerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddRetailerSuccess),
            map(() => {
                this.toastr.success('Einzelhändler hinzugefügt');
                return RetailActions.addRetailerSuccess();
            })
        )
    );

    payAddRetailerFail$ = createEffect(() => 
        this.actions$.pipe(
            ofType(MoneyActions.payAddRetailerFail),
            map(props => {
                this.toastr.error(props.error);
                return RetailActions.addRetailerFail();
            })
        )
    );

    payAddRetailerSizeSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddRetailterSizeSuccess),
            map(() => {
                this.toastr.success('Einzelhändlergröße erweitert');
                return RetailActions.addRetailerSizeSuccess();
            })
        )
    );

    payAddRetailerSizeFail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.payAddRetailerSizeFail),
            map(props => {
                this.toastr.error(props.error);
                return RetailActions.addRetailerSizeFail();
            })
        )
    );

    receiceDeleteRetailerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoneyActions.receiveDeleteRetailerSuccess),
            withLatestFrom(this.store.select('retail')),
            map(([action, state]) => {
                const successText = state.retailers
                    .filter(retailer => retailer.id === state.removeRetailerIndex)
                    .map(retailer => retailer.propertyType === PropertyType.owner ? 'Einzelhändler verkauft' : 'Miete für Einzelhändler beendet')
                    [0];
                this.toastr.success(successText);

                return RetailActions.deleteRetailerSuccess();
            })
        )
    );

    deleteRetailerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetailActions.deleteRetailerSuccess),
            tap(() => this.router.navigate(['/retail']))
        ),
        {dispatch: false}
    );

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetailActions.addEmployee),
            withLatestFrom(this.store.select('manufacturing')),
            map(([action, state]) => {
                const factory = state.factories[action.retailerIndex];
                const maxEmployees = this.retailService.getRetailerMaxEmployees(factory.size);
                if (maxEmployees > factory.employees.length) {
                    this.toastr.success('Mitarbeiter eingestellt');
                    return RetailActions.addEmployeeSuccess();
                } else {
                    this.toastr.error('Maximale Anzahl Mitarbeiter bereits erreicht');
                    return RetailActions.addEmployeeFail();
                }
            })
        )
    );

    removeEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetailActions.removeEmployee),
            withLatestFrom(this.store.select('manufacturing')),
            map(([action, state]) => {
                const factory = state.factories[action.retailerIndex];
                if (factory.employees.length > 0) {
                    this.toastr.success('Mitarbeiter entlassen');
                    return RetailActions.removeEmployeeSuccess();
                } else {
                    this.toastr.error('Keine Mitarbeiter zum Entlassen vorhanden');
                    return RetailActions.removeEmployeeFail();
                }
            })
        )
    );

    fetchRetailers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetailActions.fetchRetailers),
            map(() => JSON.parse(localStorage.getItem('retailers'))),
            filter(retailers => retailers),
            map(retailers => RetailActions.setRetailers({retailers}))
        )
    );

    autoSaveRetailers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                RetailActions.addRetailerSuccess,
                RetailActions.addRetailerSizeSuccess,
                RetailActions.deleteRetailerSuccess,
                RetailActions.addEmployeeSuccess,
                RetailActions.removeEmployeeSuccess
            ),
            debounceTime(appConfig.autoSaveDebounceTime),
            withLatestFrom(this.store.select('retail')),
            tap(([action, state]) => localStorage.setItem('retailers', JSON.stringify(state.retailers)))
        ),
        {dispatch: false}
    );

    constructor(private actions$: Actions,
                private store: Store<fromApp.AppState>,
                private toastr: ToastrService,
                private retailService: RetailService,
                private router: Router) {}
}