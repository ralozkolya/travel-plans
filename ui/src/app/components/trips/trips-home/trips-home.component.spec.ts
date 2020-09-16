import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsHomeComponent } from './trips-home.component';

describe('TripsListComponent', () => {
  let component: TripsHomeComponent;
  let fixture: ComponentFixture<TripsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
