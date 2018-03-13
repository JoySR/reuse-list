import axios from 'axios';
import types from '../mutation-types';
import { ITEM_BASE_URL } from '../../config/config';
import tokenConfig from '../../utils/token';

const initialState = {
  currentListItems: [],
};

const actions = {
  fetchCurrentListItems: ({ commit }, { listId }) => {
    axios.get(
      `${ITEM_BASE_URL}/all.php?list_id=${listId}`,
    ).then((response) => {
      const data = response.data;
      if (data.status) {
        commit(types.SET_CURRENT_LIST_ITEMS, { items: data.items });
      }
      // FIXME: add error handling
      // FIXME: temp disable lint
      // eslint-disable-next-line
    }).catch((error) => {
      // TODO: show error message, use a message component.
    });
  },
  // eslint-disable-next-line
  createItem: ({ commit }, { name, listId }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${ITEM_BASE_URL}/add.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        list_id: listId,
        name,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  editItem: ({ commit }, { id, name }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${ITEM_BASE_URL}/edit.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
        name,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  removeItem: ({ commit }, { id }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${ITEM_BASE_URL}/delete.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
};

const mutations = {
  [types.SET_CURRENT_LIST_ITEMS](state, { items }) {
    state.currentListItems = items;
  },
};

const getters = {
  currentListItems: state => state.currentListItems,
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
