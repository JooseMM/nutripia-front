import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService, UserRoles } from '../../authentication';

export const nutritionistOnlyGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.authenticationInfo()?.role !== UserRoles.Client) {
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
