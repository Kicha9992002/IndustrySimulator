import { Component, OnInit } from '@angular/core';

import { Factory } from 'src/app/shared/factory.model';
import { ManufacturingService } from '../manufactoring.service';

@Component({
  selector: 'app-manufacturing-list',
  templateUrl: './manufacturing-list.component.html'
})
export class ManufacturingListComponent implements OnInit {
  factories: Factory[];

  constructor(private manufacturingService: ManufacturingService) { }

  ngOnInit(): void {
    this.manufacturingService.factoriesChanged
      .subscribe(factories => {
        this.factories = factories;
      });
  }

}
