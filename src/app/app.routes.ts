import { Routes } from '@angular/router';
import { AuthenticationLayout } from './security/authentication/pages/authentication-layout/authentication-layout';
import { Register } from './security/authentication/pages/authentication-layout/components/register/register';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/register',
  },
];
