import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '@/views/LandingPage';
import ListPage from '@/views/ListPage';
import Test from '../views/Test';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/list',
    name: 'ListPage',
    component: ListPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
