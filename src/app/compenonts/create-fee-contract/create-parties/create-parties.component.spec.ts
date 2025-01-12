import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartiesComponent } from './create-parties.component';

describe('CreatePartiesComponent', () => {
  let component: CreatePartiesComponent;
  let fixture: ComponentFixture<CreatePartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
