import { Routes } from '@angular/router';
import { CustomerLayout } from './components/customer-layout/customer-layout';
import { ChangePassword } from './components/change-password/change-password';
import { MyPurchases } from './components/my-purchases/my-purchases';

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
    ],
  },
];
