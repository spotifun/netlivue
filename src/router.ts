import { createWebHistory, createRouter } from 'vue-router';
import Auth from './views/Auth.vue';
import Home from './views/Home.vue';

const history = createWebHistory();

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/auth', component: Auth, name: 'Profile' },
];

const router = createRouter({ history, routes });
export default router;
