import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import { loggedIn } from './store/auth';
import Auth from './views/Auth.vue';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import Match from './views/Match.vue';

const DEFAULT_TITLE = 'spotifun';
const LOGIN_REQUIRED = () => loggedIn.value;

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
    meta: { showOnNavbar: LOGIN_REQUIRED },
  },
  {
    path: '/match',
    component: Match,
    name: 'Match',
    meta: { showOnNavbar: LOGIN_REQUIRED },
  },
];

const router = createRouter({ history, routes });

router.beforeEach((to) => {
  const name = to.name!.toString();
  const prefix = name === 'Home' ? '' : `${name} | `;
  document.title = `${prefix}${DEFAULT_TITLE}`;
});

export default router;
