import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeClientCard } from './resume-client-card';

describe('ResumeClientCard', () => {
  let component: ResumeClientCard;
  let fixture: ComponentFixture<ResumeClientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeClientCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeClientCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
