import types from '../mutation-types';
import store from '../index';

const initialState = {
  keyword: '',
};

const actions = {
  searchAll: ({ commit }, { keyword }) => new Promise(
    (resolve) => {
      commit(types.SEARCH_ALL, { keyword });
      resolve();
    },
  ),
};

const mutations = {
  [types.SEARCH_ALL](state, { keyword }) {
    state.keyword = keyword;
  },
};

const getters = {
  allSearchedResults: state => (type = 'list') => {
    if (!state.keyword) return [];
    let allResults;
    if (type === 'list') {
      // FIXME: No allListNames yet.
      allResults = store.getters.allListNames || [];
    } else {
      // FIXME: No allItemNames yet.
      allResults = store.getters.allItemNames || [];
    }
    return allResults.filter(item => item.includes(state.keyword));
  },
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
