import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';

import { RetailService } from '../retail.service';
import * as fromApp from '../../store/app.reducer';
import * as RetailActions from '../store/retail.actions';
import { appConfig } from 'src/app/app.config';
import { Retailer } from 'src/app/shared/retailer.model';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/shared/employee.model';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { PropertyType } from 'src/app/shared/property-type.model';

@Component({
  selector: 'app-retail-details',
  templateUrl: './retail-details.component.html'
})
export class RetailDetailsComponent implements OnInit, OnDestroy {
  retailer?: Retailer;
  input: number;
  runningIncome: number;
  maxEmployees: number;
  id: number;
  private subscription: Subscription;

  get AreaAddSize() { return appConfig.retail.areaAddSize; }
  get AreaAddSizeCost() { return this.retailService.getRetailerAddSizeCost(this.retailer, this.AreaAddSize); }
  get RemoveText() { return this.retailer?.propertyType == PropertyType.tenant ? 'cancel rent': 'sell'; }


  constructor(private retailService: RetailService,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.subscription = this.route.params
    .pipe(
      switchMap(params => {
        this.id = params.id;
        return this.store.select('retail')
      }),
      map(retailState => {
        return retailState.retailers.find((retailer, index) => {
          return index == this.id;
        });
      })
    ).subscribe(retailer => {
      if (retailer) {
        this.retailer = retailer;
        this.input = this.retailService.getRetailerInput(this.retailer);
        this.runningIncome = this.retailService.getRetailerRunningIncome(this.retailer);
        this.maxEmployees = this.retailService.getRetailerMaxEmployees(this.retailer.size);
      }
    });
  }

  addSize() {
    this.store.dispatch(RetailActions.addRetailerSize({
      size: appConfig.retail.areaAddSize,
      index: this.id,
      cost: this.AreaAddSizeCost
    }));
  }

  addEmployee() {
    this.store.dispatch(RetailActions.addEmployee({employee: new Employee(), retailerIndex: this.id}));
  }

  removeEmployee() {
    this.store.dispatch(RetailActions.removeEmployee({employeeIndex: 0, retailerIndex: this.id}));
  }

  deleteRetailer() {
    const confirmed = new EventEmitter<void>();
    confirmed.subscribe(() => {
      confirmed.unsubscribe();
      this.store.dispatch(RetailActions.deleteRetailer({index: this.retailer.id}))
    });

    this.modalService.show(ConfirmComponent, {initialState: {
      message: this.RemoveText + ' retailer?',
      confirmed
    }});
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
