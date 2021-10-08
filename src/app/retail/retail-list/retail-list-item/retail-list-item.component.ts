import { Component, Input, OnInit } from '@angular/core';

import { Retailer } from 'src/app/shared/retailer.model';
import { RetailService } from '../../retail.service';

@Component({
  selector: 'app-retail-list-item',
  templateUrl: './retail-list-item.component.html'
})
export class RetailListItemComponent implements OnInit {
  @Input() retailer!: Retailer;

  get input() { return this.retailService.getRetailerInput(this.retailer); }
  get runningIncome() { return this.retailService.getRetailerRunningIncome(this.retailer); }
  get maxEmployees() { return this.retailService.getRetailerMaxEmployees(this.retailer.size); }

  constructor(private retailService: RetailService) { }

  ngOnInit(): void {
  }

}
