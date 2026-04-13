import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistLogin } from './nutritionist-login';

describe('NutritionistLogin', () => {
  let component: NutritionistLogin;
  let fixture: ComponentFixture<NutritionistLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionistLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionistLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
