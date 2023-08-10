import { createRouter, createWebHistory } from 'vue-router';

import Auth from '../views/AuthView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth,
      // children: [{ path: '/', name: 'Auth', component: Auth }],
    },
  ],
});

export default router;
