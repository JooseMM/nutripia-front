import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService, UserRoles } from '../../nutritionist';
import { map } from 'rxjs';

export const unknownOnlyGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isAuthenticated()) {
    return router.parseUrl('/dashboard');
  }

  return authenticationService.checkSession().pipe(
    map((role) => {
      switch(role) {
        case UserRoles.Client:
        case UserRoles.Nutritionist:
        case UserRoles.Admin:
          return router.parseUrl('/dashboard');
        default:
          return true
      }
    }),
  );
};
