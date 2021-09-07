import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

import { appConfig } from 'src/app/app.config';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
    $gameTicks = createEffect(() =>
        interval(appConfig.incomeInterval).pipe(
            map(() => AppActions.gameTick())
        )
    );

    constructor() {}
}