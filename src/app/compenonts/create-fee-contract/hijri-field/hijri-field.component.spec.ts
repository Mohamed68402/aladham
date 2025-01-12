import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijriFieldComponent } from './hijri-field.component';

describe('HijriFieldComponent', () => {
  let component: HijriFieldComponent;
  let fixture: ComponentFixture<HijriFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HijriFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijriFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
