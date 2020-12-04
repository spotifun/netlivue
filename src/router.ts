import { createWebHistory, createRouter } from 'vue-router';
import Auth from './views/Auth.vue';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';

const history = createWebHistory();

const routes = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/auth',
    component: Auth,
    name: 'Auth',
    meta: { showOnNavbar: false },
  },
  { path: '/profile', component: Profile, name: 'Profile' },
];

const router = createRouter({ history, routes });
export default router;
