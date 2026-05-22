import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService, UserRoles } from '../../nutritionist';
import { map } from 'rxjs';

export const nutritionistOnlyGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const currentRole = authenticationService.authenticationInfo()?.role;

  if (authenticationService.isAuthenticated()) {
    if (currentRole === UserRoles.Nutritionist) {
      return true;
    }
    return router.parseUrl('/authentication/login');
  }

  return authenticationService.checkSession().pipe(
    map((role) => {
      if (role === UserRoles.Nutritionist) {
        return true;
      }
      return router.parseUrl('/authentication/login');
    }),
  );
};
