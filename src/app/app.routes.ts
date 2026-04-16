import { Routes } from '@angular/router';
import { AuthenticationLayout } from './security/authentication/pages/authentication-layout/authentication-layout';
import { Register } from './security/authentication/pages/authentication-layout/components/register/register';
import { VerifyEmail } from './security/authentication/pages/authentication-layout/components/verify-email/verify-email';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'verify-email',
        component: VerifyEmail,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/register',
  },
];
