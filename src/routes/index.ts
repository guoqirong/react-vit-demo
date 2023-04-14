import { lazy } from 'react';

export const routeConfig = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: lazy(() => import('../pages/demoPage'))
  }
];

export default [...routeConfig];
