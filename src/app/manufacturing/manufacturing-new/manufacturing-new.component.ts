import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

import { Factory, FactoryType, Location, PropertyType } from 'src/app/shared/factory.model';
import * as fromApp from '../../store/app.reducer';
import * as ManufacturingActions from '../store/manufacturing.actions';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-manufacturing-new',
  templateUrl: './manufacturing-new.component.html'
})
export class ManufacturingNewComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  addFactoryForm: FormGroup;

  get factoryTypes() { return Object.keys(FactoryType); }
  get locations() { return Object.values(Location); }
  get propertyTypes() { return Object.values(PropertyType); }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.addFactoryForm = new FormGroup({
      factoryType: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      propertyType: new FormControl('', [Validators.required])
    });
  }

  onAddFactory() {
    if (!this.addFactoryForm.valid) {
      return;
    }

    this.store.select('manufacturing').pipe(
      take(1),
      map(manufacturingState => manufacturingState.factories),
      tap(factories => {
        const maxId = factories.length > 0 ? factories[factories.length - 1].id : 0;
        this.store.dispatch(ManufacturingActions.addFactory({factory: new Factory(
          maxId + 1,
          FactoryType[this.addFactoryForm.get('factoryType').value],
          appConfig.manufacturing.areaAddSize,
          this.addFactoryForm.get('location').value,
          this.addFactoryForm.get('propertyType').value
        )}));

        this.addFactoryForm.reset();
        this.close.emit();
      })
    ).subscribe();
  }

}
