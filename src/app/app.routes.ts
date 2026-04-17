import { Routes } from '@angular/router';
import { AuthenticationLayout } from './security/authentication/layout/authentication-layout/authentication-layout';
import { Login, Register, VerifyEmail } from './security/authentication';
import { Appointments, Clients, DashboardLayout, Home } from './dashboard';

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
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'clients',
        component: Clients,
      },
      {
        path: 'appointments',
        component: Appointments,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/register',
  },
];
