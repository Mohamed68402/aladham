import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeeContractComponent } from './create-fee-contract.component';

describe('CreateFeeContractComponent', () => {
  let component: CreateFeeContractComponent;
  let fixture: ComponentFixture<CreateFeeContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFeeContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFeeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
