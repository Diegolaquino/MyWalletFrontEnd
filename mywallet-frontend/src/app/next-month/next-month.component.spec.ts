import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMonthComponent } from './next-month.component';

describe('NextMonthComponent', () => {
  let component: NextMonthComponent;
  let fixture: ComponentFixture<NextMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
