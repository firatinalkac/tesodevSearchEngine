import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '@/views/LandingPage';
import ListPage from '@/views/ListPage';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
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
