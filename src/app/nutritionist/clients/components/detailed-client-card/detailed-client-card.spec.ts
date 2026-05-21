import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedClientCard } from './detailed-client-card';

describe('DetailedClientCard', () => {
  let component: DetailedClientCard;
  let fixture: ComponentFixture<DetailedClientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedClientCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedClientCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
