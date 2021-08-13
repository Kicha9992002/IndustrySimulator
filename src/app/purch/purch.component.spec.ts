import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchComponent } from './purch.component';

describe('PurchComponent', () => {
  let component: PurchComponent;
  let fixture: ComponentFixture<PurchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
