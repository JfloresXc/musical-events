import { Routes } from '@angular/router';
import { CustomerLayout } from './components/customer-layout/customer-layout';
import { ChangePassword } from './components/change-password/change-password';
import { MyPurchases } from './components/my-purchases/my-purchases';
import { TableOfGenres } from '../events/components/table-of-genres/table-of-genres';
import { TableOfEvents } from '../events/components/table-of-events/table-of-events';
import { EventForm } from '../events/components/event-form/event-form';
import { TableOfSales } from '../events/components/table-of-sales/table-of-sales';

export const routes: Routes = [
  {
    path: '',
    component: CustomerLayout,
    children: [
      {
        path: 'change-password',
        component: ChangePassword,
      },
      {
        path: 'my-purchases',
        component: MyPurchases,
      },
      {
        path: 'genres',
        component: TableOfGenres,
      },
      {
        path: 'events',
        component: TableOfEvents,
      },
      {
        path: 'events/form/:id',
        component: EventForm,
      },
      {
        path: 'sales',
        component: TableOfSales,
      },
    ],
  },
];
