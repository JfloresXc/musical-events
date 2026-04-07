import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Home } from './features/home/pages/home/home';
import { EventDetail } from './features/events/pages/event-detail/event-detail';

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
    path: 'events/:id',
    component: EventDetail,
  },
  {
    path: 'customer',
    loadChildren: () => import('./features/customer/customer.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
