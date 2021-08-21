import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../manufactoring.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-manufacturing-details',
  templateUrl: './manufacturing-details.component.html'
})
export class ManufacturingDetailsComponent implements OnInit {
  factory: Factory;
  output: number;
  cost: number;
  maxEmployees: number;
  id: number;

  constructor(private manufacturingService: ManufacturingService,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.id = params['id'];
          return this.store.select('manufacturing');
        }),
        map(manufacturingState => {
          return manufacturingState.factories.find((factories, index) => {
            return index === this.id;
          });
        })
      ).subscribe(factory => {
        this.factory = factory;
        this.output = this.manufacturingService.getFactoryOutput(this.factory);
        this.cost = this.manufacturingService.getFactoryCost(this.factory);
        this.maxEmployees = this.manufacturingService.getFactoryMaxEmployees(this.factory.size);
      });
  }

}
