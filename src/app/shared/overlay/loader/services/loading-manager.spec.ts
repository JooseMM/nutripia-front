import { TestBed } from '@angular/core/testing';

import { LoadingManager } from './loading-manager';

describe('LoadingManager', () => {
  let service: LoadingManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
