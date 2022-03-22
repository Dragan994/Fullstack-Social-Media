import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeListDialogComponent } from './like-list-dialog.component';

describe('LikeListDialogComponent', () => {
  let component: LikeListDialogComponent;
  let fixture: ComponentFixture<LikeListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
