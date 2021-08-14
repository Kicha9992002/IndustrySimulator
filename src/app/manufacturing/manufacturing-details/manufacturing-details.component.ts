import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../manufactoring.service';

@Component({
  selector: 'app-manufacturing-details',
  templateUrl: './manufacturing-details.component.html'
})
export class ManufacturingDetailsComponent implements OnInit {
  factory: Factory;
  output: number;
  cost: number;
  maxEmployees: number;

  constructor(private manufacturingService: ManufacturingService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          return this.manufacturingService.getFactory(params['id']);
        })
      ).subscribe(factory => {
        this.factory = factory;
        this.output = this.manufacturingService.getFactoryOutput(this.factory);
        this.cost = this.manufacturingService.getFactoryCost(this.factory);
        this.maxEmployees = this.manufacturingService.getFactoryMaxEmployees(this.factory.size);
      });
  }

}
