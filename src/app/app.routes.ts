import { Routes } from '@angular/router';
import { Login } from './security/authentication';
import { Register } from './security/authentication/pages/register/register';

export const routes: Routes = [
  {
    path: 'authentication/login',
    component: Login,
  },
  {
    path: 'authentication/register',
    component: Register,
  },
  {
    path: '**',
    redirectTo: 'authentication/register',
  },
];
