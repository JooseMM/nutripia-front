import { Routes } from '@angular/router';
import { AuthenticationLayout } from './security/authentication/layout/authentication-layout/authentication-layout';
import { Home } from './dashboard/pages/home/home';
import { Login, Register, VerifyEmail } from './security/authentication';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'login',
        component: Login,
      },
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
    path: 'dashboard',
    component: Home,
    children: [],
  },
  {
    path: '**',
    redirectTo: 'authentication/register',
  },
];
