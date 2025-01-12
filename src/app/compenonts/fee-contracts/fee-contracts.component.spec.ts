import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeContractsComponent } from './fee-contracts.component';

describe('FeeContractsComponent', () => {
  let component: FeeContractsComponent;
  let fixture: ComponentFixture<FeeContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
