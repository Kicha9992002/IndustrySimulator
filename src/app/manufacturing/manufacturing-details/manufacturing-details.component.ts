import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../manufactoring.service';
import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from '../store/manufacturing.actions';
import { Employee } from 'src/app/shared/employee.model';
import { appConfig } from 'src/app/app.config';

@Component({
  selector: 'app-manufacturing-details',
  templateUrl: './manufacturing-details.component.html'
})
export class ManufacturingDetailsComponent implements OnInit, OnDestroy {
  factory?: Factory;
  output: number;
  cost: number;
  maxEmployees: number;
  id: number;
  private subscription: Subscription;

  constructor(private manufacturingService: ManufacturingService,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        switchMap(params => {
          this.id = params['id'];
          return this.store.select('manufacturing');
        }),
        map(manufacturingState => {
          return manufacturingState.factories.find((factory, index) => {
            return index == this.id;
          });
        })
      ).subscribe(factory => {
        if (factory) {
          this.factory = factory;
          this.output = this.manufacturingService.getFactoryOutput(this.factory);
          this.cost = this.manufacturingService.getFactoryCost(this.factory);
          this.maxEmployees = this.manufacturingService.getFactoryMaxEmployees(this.factory.size);
        }
      });
  }

  addSize(size: number = appConfig.areaAddSize, cost: number = 5000) {
    this.store.dispatch(ManufacturingActions.addFactorySize({size, index: this.id, cost}));    
  }

  addEmployee() {
    this.store.dispatch(ManufacturingActions.addEmployee({employee: new Employee(), factoryIndex: this.id}));
  }

  removeEmployee() {
    this.store.dispatch(ManufacturingActions.removeEmployee({employeeIndex: 0, factoryIndex: this.id}));
  }

  getAreaAddSize() {
    return appConfig.areaAddSize;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
