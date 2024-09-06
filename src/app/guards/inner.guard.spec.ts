import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { innerGuard } from './inner.guard';

describe('innerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => innerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
