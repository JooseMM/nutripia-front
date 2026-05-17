import { Routes } from '@angular/router';
import { Login, Register, VerifyEmail, AuthenticationLayout } from './authentication';
import { Appointments, Clients, DashboardLayout, Home } from './dashboard';
import { authenticatedOnlyGuard, nutritionistOnlyGuard, unknownOnlyGuard } from './authorization';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationLayout,
    children: [
      {
        path: 'login',
        canActivate: [unknownOnlyGuard],
        component: Login,
      },
      {
        path: 'register',
        canActivate: [unknownOnlyGuard],
        component: Register,
      },
      {
        path: 'verify-email/:verificationToken',
        component: VerifyEmail,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authenticatedOnlyGuard],
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'clients',
        component: Clients,
        canActivate: [nutritionistOnlyGuard],
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
