// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from '../views/RegistrationForm.vue'; // Sesuaikan jalur impor
import CheckStatus from '../views/CheckStatus.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RegistrationForm',
      component: RegistrationForm,
    },
    {
      path: '/check-status',
      name: 'CheckStatus',
      component: CheckStatus,
    },
  ],
});

export default router;
