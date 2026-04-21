import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipItem } from './chip-item';

describe('ChipItem', () => {
  let component: ChipItem;
  let fixture: ComponentFixture<ChipItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
