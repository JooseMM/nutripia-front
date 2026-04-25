import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCard } from './basic-card';

describe('BasicCard', () => {
  let component: BasicCard;
  let fixture: ComponentFixture<BasicCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
