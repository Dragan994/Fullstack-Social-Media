import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTesterComponent } from './color-tester.component';

describe('ColorTesterComponent', () => {
  let component: ColorTesterComponent;
  let fixture: ComponentFixture<ColorTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
