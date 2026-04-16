import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendEmailVerificationModal } from './resend-email-verification-modal';

describe('ResendEmailVerificationModal', () => {
  let component: ResendEmailVerificationModal;
  let fixture: ComponentFixture<ResendEmailVerificationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResendEmailVerificationModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ResendEmailVerificationModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
