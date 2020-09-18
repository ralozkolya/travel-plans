import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameRoleComponent } from './edit-name-role.component';

describe('EditNameRoleComponent', () => {
  let component: EditNameRoleComponent;
  let fixture: ComponentFixture<EditNameRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNameRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNameRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
