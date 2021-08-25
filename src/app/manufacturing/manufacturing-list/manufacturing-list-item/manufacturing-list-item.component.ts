import { Component, Input, OnInit } from '@angular/core';
import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../../manufactoring.service';

@Component({
  selector: 'app-manufacturing-list-item',
  templateUrl: './manufacturing-list-item.component.html'
})
export class ManufacturingListItemComponent implements OnInit {
  @Input() factory!: Factory;
  output: number;
  cost: number;
  maxEmployees: number;

  constructor(private manufacturingService: ManufacturingService) { }

  ngOnInit(): void {
    this.output = this.manufacturingService.getFactoryOutput(this.factory);
    this.cost = this.manufacturingService.getFactoryCost(this.factory);
    this.maxEmployees = this.manufacturingService.getFactoryMaxEmployees(this.factory.size);
  }

}
