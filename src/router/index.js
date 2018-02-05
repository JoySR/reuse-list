import Vue from 'vue';
import Router from 'vue-router';
import ListView from '../pages/ListView';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
  ],
});
