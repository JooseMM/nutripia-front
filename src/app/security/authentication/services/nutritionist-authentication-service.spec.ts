import { TestBed } from '@angular/core/testing';

import { NutritionistAuthenticationService } from './nutritionist-authentication-service';

describe('NutritionistAuthenticationService', () => {
  let service: NutritionistAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
