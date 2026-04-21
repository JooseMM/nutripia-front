import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unknownOnlyGuard } from './unknown-only-guard';

describe('unknownGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unknownOnlyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
