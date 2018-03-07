import types from '../mutation-types';
import axios from '../../utils/api';
import { WP_BASE_URL } from '../../utils/config';

const initialState = {
  allItems: [],
  currentListItems: [],
};

const actions = {
  fetchAllItems: ({ commit }) => {
    axios.get(
      `${WP_BASE_URL}/reuselist_item`,
    ).then((response) => {
      commit(types.SET_ALL_ITEMS, { items: response.data });
    });
  },
  fetchCurrentListItems: ({ commit }, { listId }) => {
    axios.get(
      `${WP_BASE_URL}/reuselist_item?reuselist_list=${listId}`,
    ).then((response) => {
      commit(types.SET_CURRENT_LIST_ITEMS, { items: response.data });
    });
  },
  // eslint-disable-next-line
  createItem: ({ commit }, { name, listId }) => new Promise((resolve, reject) => {
    axios.post(`${WP_BASE_URL}/reuselist_item`, {
      title: name,
      reuselist_list: listId,
      status: 'publish', // otherwise it will be a 'draft' and not included by fetching
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  editItem: ({ commit }, { id, name }) => new Promise((resolve, reject) => {
    axios.post(`${WP_BASE_URL}/reuselist_item/${id}`, {
      title: name,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  removeItem: ({ commit }, { id }) => new Promise((resolve, reject) => {
    axios.delete(`${WP_BASE_URL}/reuselist_item/${id}`).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
};

const mutations = {
  [types.SET_ALL_ITEMS](state, { items }) {
    state.allItems = items;
  },
  [types.SET_CURRENT_LIST_ITEMS](state, { items }) {
    state.currentListItems = items;
  },
};

const getters = {
  allItems: state => state.allItems,
  allItemNames: state => state.allItems.map(item => item.title.rendered),
  currentListItems: state => state.currentListItems,
  currentListItemNames: state => state.currentListItems.map(item => item.title.rendered),
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
