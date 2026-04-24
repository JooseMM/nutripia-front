import { TestBed } from '@angular/core/testing';

import { NutritionistClients } from './nutritionist-clients';

describe('NutritionistClients', () => {
  let service: NutritionistClients;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistClients);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
