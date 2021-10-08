import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { appConfig } from 'src/app/app.config';
import { Location } from 'src/app/shared/location.model';

import { PropertyType } from 'src/app/shared/property-type.model';
import { Retailer, RetailerType } from 'src/app/shared/retailer.model';
import * as fromApp from '../../store/app.reducer';
import * as RetailActions from '../store/retail.actions';

@Component({
  selector: 'app-retail-new',
  templateUrl: './retail-new.component.html'
})
export class RetailNewComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  addRetailerForm: FormGroup;

  get retailerTypes() { return Object.keys(RetailerType); }
  get locations() { return Object.values(Location); }
  get propertyTypes() { return Object.values(PropertyType); }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.addRetailerForm = new FormGroup({
      retailerType: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      propertyType: new FormControl('', [Validators.required])
    });
  }

  onAddRetailer() {
    if (!this.addRetailerForm.valid) {
      return;
    }

    this.store.select('retail').pipe(
      take(1),
      map(retailState => retailState.retailers),
      tap(retailers => {
        const maxId = retailers.length > 0 ? retailers[retailers.length - 1].id : 0;
        this.store.dispatch(RetailActions.addRetailer({retailer: new Retailer(
          maxId + 1,
          RetailerType[this.addRetailerForm.get('retailerType').value],
          appConfig.retail.areaAddSize,
          this.addRetailerForm.get('location').value,
          this.addRetailerForm.get('propertyType').value
        )}));

        this.addRetailerForm.reset();
        this.close.emit();
      })
    ).subscribe();
  }

}
