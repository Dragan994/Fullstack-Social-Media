import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSnackBarComponent } from './user-snack-bar.component';

describe('UserSnackBarComponent', () => {
  let component: UserSnackBarComponent;
  let fixture: ComponentFixture<UserSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
