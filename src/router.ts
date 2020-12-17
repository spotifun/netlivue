import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { loggedIn } from './store/auth';
import Auth from './views/Auth.vue';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';

const DEFAULT_TITLE = 'spotifun';

const history = createWebHistory();

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/auth',
    component: Auth,
    name: 'Auth',
    meta: { showOnNavbar: () => false },
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: { showOnNavbar: () => loggedIn.value },
  },
];

const router = createRouter({ history, routes });

router.beforeEach((to) => {
  const name = to.name!.toString();
  const prefix = name === 'Home' ? '' : `${name} | `;
  document.title = `${prefix}${DEFAULT_TITLE}`;
});

export default router;
