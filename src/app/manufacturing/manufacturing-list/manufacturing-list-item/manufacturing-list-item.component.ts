import { Component, Input, OnInit } from '@angular/core';
import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../../manufactoring.service';

@Component({
  selector: 'app-manufacturing-list-item',
  templateUrl: './manufacturing-list-item.component.html'
})
export class ManufacturingListItemComponent implements OnInit {
  @Input() factory!: Factory;

  get output() { return this.manufacturingService.getFactoryOutput(this.factory); }
  get runningCost() { return this.manufacturingService.getFactoryRunningCost(this.factory); }
  get maxEmployees() { return this.manufacturingService.getFactoryMaxEmployees(this.factory.size); }

  constructor(private manufacturingService: ManufacturingService) { }

  ngOnInit(): void {
  }

}
