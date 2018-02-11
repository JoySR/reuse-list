import Vue from 'vue';
import Router from 'vue-router';
import ListView from '../pages/ListView';
import ItemView from '../pages/ItemView';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import tokenConfig from '../utils/token';
import store from '../store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'ListView',
    component: ListView,
  },
  {
    path: '/lists',
    name: 'Lists',
    component: ListView,
  },
  {
    path: '/items',
    name: 'Items',
    component: ItemView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = tokenConfig.get('token');
  if (to.meta.requiresAuth && !token) {
    next({
      name: 'Login',
    });
  } else {
    store.dispatch('saveCookieTokenInStore', { token });
    next();
  }
});

export default router;
