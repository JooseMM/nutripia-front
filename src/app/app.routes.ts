import { Routes } from '@angular/router';
import { AuthenticationLayout } from './authentication/layout/authentication-layout/authentication-layout';
import { Login, Register, VerifyEmail } from './authentication';
import { Appointments, Clients, DashboardLayout, Home } from './dashboard';
import { authenticatedOnlyGuard } from './authorization';
import { nutritionistOnlyGuard } from './authorization/guards/nutritionist-only-guard';

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
