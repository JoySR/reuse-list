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
  // eslint-disable-next-line
  createList: ({ commit }, { name }) => new Promise((resolve, reject) => {
    axios.post(`${WP_BASE_URL}/reuselist_list`, {
      name,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  editList: ({ commit }, { id, name }) => new Promise((resolve, reject) => {
    axios.post(`${WP_BASE_URL}/reuselist_list/${id}`, {
      name,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  removeList: ({ commit }, { id }) => new Promise((resolve, reject) => {
    axios.delete(`${WP_BASE_URL}/reuselist_list/${id}?force=true`).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
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
