import Vue from 'vue';
import Vuex from 'vuex';
import lists from './modules/lists';
import items from './modules/items';
import token from './modules/token';
import search from './modules/search';
import common from './modules/common';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    lists,
    items,
    token,
    search,
    common,
  },
  strict: debug,
});
