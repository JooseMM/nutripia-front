import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../nutritionist';
import { inject } from '@angular/core';

export const authenticatedOnlyGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authenticationService.isAuthenticated()) {
    router.navigate(['authentication', 'login']);
    return false;
  }

  return true;
};
