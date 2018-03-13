import axios from 'axios';
import types from '../mutation-types';
import { LIST_BASE_URL } from '../../config/config';
import tokenConfig from '../../utils/token';

const initialState = {
  lists: [],
};

const actions = {
  fetchLists: ({ commit }) => {
    axios.get(
      `${LIST_BASE_URL}/all.php`,
    ).then((response) => {
      const data = response.data;
      if (data.status) {
        commit(types.SET_LISTS, { lists: data.lists });
      }
      // FIXME: add error handling
      // FIXME: temp disable lint
      // eslint-disable-next-line
    }).catch((error) => {
      // TODO: show error message, use a message component.
    });
  },
  // eslint-disable-next-line
  createList: ({ commit }, { name }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/add.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  editList: ({ commit }, { id, name }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/edit.php`,
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
  removeList: ({ commit }, { id }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/delete.php`,
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
