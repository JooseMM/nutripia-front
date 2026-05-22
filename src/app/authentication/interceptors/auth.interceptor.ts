import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const secureReq = req.clone({
    withCredentials: true,
  });

  // Pass the cloned request to the next handler
  return next(secureReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 403) {
        router.navigate(['authentication', 'login']);
      }
      return throwError(() => err);
    }),
  );
};
