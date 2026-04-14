import { Routes } from '@angular/router';
import { Login } from './security/authentication';

export const routes: Routes = [
  {
    path: '/authentication/login',
    component: Login,
  },
  {
    path: '/authentication/register',
    component: Login,
  },
];
