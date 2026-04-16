import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnexpectedErrorModal } from './unexpected-error-modal';

describe('UnexpectedErrorModal', () => {
  let component: UnexpectedErrorModal;
  let fixture: ComponentFixture<UnexpectedErrorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnexpectedErrorModal],
    }).compileComponents();

    fixture = TestBed.createComponent(UnexpectedErrorModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
