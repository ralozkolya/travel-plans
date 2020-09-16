import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripsFormComponent } from './create-trips-form.component';

describe('CreateTripsFormComponent', () => {
  let component: CreateTripsFormComponent;
  let fixture: ComponentFixture<CreateTripsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
