import { Component, Input, OnInit } from '@angular/core';
import { Factory } from 'src/app/shared/factory.model';

@Component({
  selector: 'app-manufacturing-list-item',
  templateUrl: './manufacturing-list-item.component.html',
  styles: ['']
})
export class ManufacturingListItemComponent implements OnInit {
  @Input() factory: Factory;

  constructor() { }

  ngOnInit(): void {
  }

}
