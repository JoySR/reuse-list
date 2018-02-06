import types from '../mutation-types';
import axios from '../../utils/api';
import { WP_BASE_URL } from '../../utils/config';

const initialState = {
  lists: [],
};

const actions = {
  fetchLists: ({ commit }) => {
    axios.get(
      `${WP_BASE_URL}/reuselist_list`,
    ).then((response) => {
      commit(types.SET_LISTS, { lists: response.data });
    });
  },
};

const mutations = {
  [types.SET_LISTS](state, { lists }) {
    state.lists = lists;
  },
};

const getters = {
  allLists: state => state.lists,
  allListNames: state => state.lists.map(list => list.name),
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
