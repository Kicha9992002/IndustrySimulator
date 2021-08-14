import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { ManufacturingService } from '../manufacturing/manufactoring.service';
import { Factory } from './factory.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private manufacturingService: ManufacturingService
  ) { }

  fetchFactories() {
    return this.http
    .get<Factory[]>('https://industrysimulator-default-rtdb.europe-west1.firebasedatabase.app/factories.json')
    .pipe(
      tap(factories => {
          this.manufacturingService.setFactories(factories);
        })
      ).subscribe();
  }
}
