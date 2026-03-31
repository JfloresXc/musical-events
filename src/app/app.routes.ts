import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
