import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTabComponent } from './wallet-tab.component';

describe('WalletTabComponent', () => {
  let component: WalletTabComponent;
  let fixture: ComponentFixture<WalletTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
