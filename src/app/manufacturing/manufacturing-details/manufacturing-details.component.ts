import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../manufactoring.service';
import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from '../store/manufacturing.actions';
import { Employee } from 'src/app/shared/employee.model';
import { appConfig } from 'src/app/app.config';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { PropertyType } from 'src/app/shared/property-type.model';

@Component({
  selector: 'app-manufacturing-details',
  templateUrl: './manufacturing-details.component.html'
})
export class ManufacturingDetailsComponent implements OnInit, OnDestroy {
  factory?: Factory;
  output: number;
  runningCost: number;
  maxEmployees: number;
  id: number;
  private subscription: Subscription;

  get AreaAddSize() { return appConfig.manufacturing.areaAddSize; }
  get AreaAddSizeCost() { return this.manufacturingService.getFactoryAddSizeCost(this.factory, this.AreaAddSize); }
  get RemoveText() { return this.factory?.propertyType == PropertyType.tenant ? 'cancel rent': 'sell'; }

  constructor(private manufacturingService: ManufacturingService,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        switchMap(params => {
          this.id = params.id;
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
          this.runningCost = this.manufacturingService.getFactoryRunningCost(this.factory);
          this.maxEmployees = this.manufacturingService.getFactoryMaxEmployees(this.factory.size);
        }
      });
  }

  addSize() {
    this.store.dispatch(ManufacturingActions.addFactorySize({
      size: appConfig.manufacturing.areaAddSize,
      index: this.id,
      cost: this.AreaAddSizeCost
    }));
  }

  addEmployee() {
    this.store.dispatch(ManufacturingActions.addEmployee({employee: new Employee(), factoryIndex: this.id}));
  }

  removeEmployee() {
    this.store.dispatch(ManufacturingActions.removeEmployee({employeeIndex: 0, factoryIndex: this.id}));
  }

  deleteFactory() {
    const confirmed = new EventEmitter<void>();
    confirmed.subscribe(() => {
      confirmed.unsubscribe();
      this.store.dispatch(ManufacturingActions.deleteFactory({index: this.factory.id}));
    });

    this.modalService.show(ConfirmComponent, {initialState: {
      message: this.RemoveText + ' factory?',
      confirmed
    }});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
